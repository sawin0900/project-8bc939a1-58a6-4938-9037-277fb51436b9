import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const AI_GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

function slugify(text: string): string {
  const translitMap: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh",
    з: "z", и: "i", й: "j", к: "k", л: "l", м: "m", н: "n", о: "o",
    п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c",
    ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };
  return text
    .toLowerCase()
    .split("")
    .map((c) => translitMap[c] || c)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}

async function fetchPortNews(): Promise<Array<{ title: string; link: string; description: string; pubDate: string; imageUrl?: string }>> {
  try {
    const response = await fetch("https://portnews.ru/news/rss/");
    const xml = await response.text();

    const items: Array<{ title: string; link: string; description: string; pubDate: string; imageUrl?: string }> = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
      const itemXml = match[1];
      const getTag = (tag: string) => {
        const m = itemXml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
        return m ? (m[1] || m[2] || "").trim() : "";
      };

      const title = getTag("title");
      const link = getTag("link");
      const description = getTag("description");
      const pubDate = getTag("pubDate");

      // Try to extract image from enclosure or media:content
      let imageUrl: string | undefined;
      const encMatch = itemXml.match(/url="([^"]+\.(jpg|jpeg|png|gif|webp)[^"]*)"/i);
      if (encMatch) imageUrl = encMatch[1];

      if (title && link) {
        items.push({ title, link, description, pubDate, imageUrl });
      }
    }

    return items.slice(0, 10); // Process max 10 at a time
  } catch (error) {
    console.error("Error fetching RSS:", error);
    return [];
  }
}

async function rewriteWithAI(
  title: string,
  description: string,
  content: string,
  apiKey: string
): Promise<{ title: string; description: string; content: string; metaTitle: string; metaDescription: string; keywords: string[] }> {
  try {
    const response = await fetch(AI_GATEWAY_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Ты профессиональный редактор морских новостей. Перепиши новость полностью уникальным текстом (90-100% уникальности), сохраняя смысл. Используй профессиональный новостной стиль. Ответь ТОЛЬКО в формате JSON без markdown:
{"title":"уникальный заголовок","description":"уникальное описание 150-200 символов","content":"полный уникальный текст новости в формате HTML с тегами p, h3, ul, li","metaTitle":"SEO title до 60 символов","metaDescription":"SEO description до 160 символов","keywords":["ключевое слово 1","ключевое слово 2","...до 15 слов"]}`,
          },
          {
            role: "user",
            content: `Заголовок: ${title}\nОписание: ${description}\nТекст: ${content}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "";
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        title: parsed.title || title,
        description: parsed.description || description,
        content: parsed.content || content,
        metaTitle: parsed.metaTitle || parsed.title || title,
        metaDescription: parsed.metaDescription || parsed.description || description,
        keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [],
      };
    }
  } catch (error) {
    console.error("AI rewrite error:", error);
  }

  // Fallback if AI fails
  return {
    title,
    description,
    content: `<p>${content || description}</p>`,
    metaTitle: title.slice(0, 60),
    metaDescription: (description || title).slice(0, 160),
    keywords: [],
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch RSS
    const newsItems = await fetchPortNews();
    console.log(`Fetched ${newsItems.length} items from RSS`);

    if (newsItems.length === 0) {
      return new Response(
        JSON.stringify({ success: true, imported: 0, message: "No news found in RSS" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check existing
    const sourceUrls = newsItems.map((n) => n.link);
    const { data: existing } = await supabase
      .from("news")
      .select("source_url")
      .in("source_url", sourceUrls);

    const existingUrls = new Set((existing || []).map((e: any) => e.source_url));
    const newItems = newsItems.filter((n) => !existingUrls.has(n.link));

    console.log(`${newItems.length} new items to import`);

    let imported = 0;
    for (const item of newItems) {
      try {
        const rewritten = await rewriteWithAI(
          item.title,
          item.description,
          item.description, // RSS usually has description only
          lovableApiKey
        );

        const slug = slugify(rewritten.title) + "-" + Date.now().toString(36);

        const { error } = await supabase.from("news").insert({
          title: rewritten.title,
          slug,
          description: rewritten.description,
          content: rewritten.content,
          image_url: item.imageUrl || null,
          source_url: item.link,
          source_title: item.title,
          keywords: rewritten.keywords,
          meta_title: rewritten.metaTitle,
          meta_description: rewritten.metaDescription,
          published: true,
        });

        if (error) {
          console.error("Insert error:", error);
        } else {
          imported++;
        }
      } catch (err) {
        console.error("Error processing item:", err);
      }
    }

    return new Response(
      JSON.stringify({ success: true, imported, total: newsItems.length, skipped: newsItems.length - newItems.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Import error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
