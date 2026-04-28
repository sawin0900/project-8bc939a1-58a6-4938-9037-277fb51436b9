import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { load, type CheerioAPI } from "https://esm.sh/cheerio@1.0.0-rc.12";

const allowedOrigins = new Set([
  "https://centr-prityazheniya.ru",
  "https://www.centr-prityazheniya.ru",
  "http://localhost:5173",
]);

const AI_GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

const ARTICLE_SELECTORS = [
  "article .news-detail__content",
  "article .news-item__content",
  "article .article-content",
  "article .content",
  ".news-detail__content",
  ".news-item__content",
  ".article-content",
  ".js-mediator-article",
  "article",
  "main article",
  "main .content",
];

const NOISE_SELECTORS = [
  "script",
  "style",
  "noscript",
  "iframe",
  "form",
  ".share",
  ".social",
  ".banner",
  ".adv",
  ".advert",
  ".ad",
  ".news-tags",
  ".tags",
  ".subscribe",
  ".comments",
  ".read-more",
  ".related",
  "button",
];

function buildCorsHeaders(origin: string | null) {
  const safeOrigin = origin && allowedOrigins.has(origin) ? origin : "https://centr-prityazheniya.ru";
  return {
    "Access-Control-Allow-Origin": safeOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Vary": "Origin",
  };
}

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

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeDescription(text: string): string {
  const normalized = text.trim().replace(/\s+/g, " ");
  if (!normalized) return "";
  if (normalized.length <= 160) return normalized;
  return `${normalized.slice(0, 157).trim()}...`;
}

function extractDescriptionFromHtml(html: string, fallback: string): string {
  const text = stripHtml(html || fallback);
  if (!text) return normalizeDescription(fallback);
  return normalizeDescription(text);
}

type RssItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  imageUrl?: string;
};

type ParsedArticle = {
  imageUrl?: string;
  contentHtml: string;
  plainText: string;
  publishedAt: string | null;
  author: string | null;
};

async function fetchPortNews(): Promise<RssItem[]> {
  try {
    const response = await fetch("https://portnews.ru/news/rss/");
    const xml = await response.text();

    const items: RssItem[] = [];
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

      let imageUrl: string | undefined;
      const encMatch = itemXml.match(/url="([^"]+\.(jpg|jpeg|png|gif|webp)[^"]*)"/i);
      if (encMatch) imageUrl = encMatch[1];

      if (title && link) {
        items.push({ title, link, description, pubDate, imageUrl });
      }
    }

    return items;
  } catch (error) {
    console.error("Error fetching RSS:", error);
    return [];
  }
}

function toAbsoluteUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://portnews.ru${url}`;
}

function extractFirstImage($root: CheerioAPI, context: string): string | undefined {
  const ogImage = $root('meta[property="og:image"]').attr("content") || $root('meta[name="og:image"]').attr("content");
  if (ogImage) return toAbsoluteUrl(ogImage);

  const firstImage = $root(context).find("img").first().attr("src") || $root("img").first().attr("src");
  return toAbsoluteUrl(firstImage);
}

function extractPublishedAt($root: CheerioAPI): string | null {
  const rawDate =
    $root('meta[property="article:published_time"]').attr("content") ||
    $root('meta[name="article:published_time"]').attr("content") ||
    $root("time").first().attr("datetime") ||
    $root(".date time").first().attr("datetime") ||
    $root(".news-date").first().text();

  if (!rawDate) return null;
  const parsed = new Date(rawDate);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

function extractAuthor($root: CheerioAPI): string | null {
  const author =
    $root('meta[name="author"]').attr("content") ||
    $root('meta[property="article:author"]').attr("content") ||
    $root(".author").first().text() ||
    $root(".news-author").first().text();
  return author?.trim() || null;
}

async function fetchArticlePage(url: string): Promise<ParsedArticle> {
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; NewsBot/1.0)" },
  });

  if (!response.ok) {
    throw new Error(`Page fetch failed with status ${response.status}`);
  }

  const html = await response.text();
  const $ = load(html);

  let articleNode = "";
  for (const selector of ARTICLE_SELECTORS) {
    if ($(selector).length > 0) {
      articleNode = selector;
      break;
    }
  }

  if (!articleNode) {
    const fallbackHtml = $("main").html() || $("body").html() || "";
    return {
      imageUrl: extractFirstImage($, "body"),
      contentHtml: fallbackHtml,
      plainText: stripHtml(fallbackHtml),
      publishedAt: extractPublishedAt($),
      author: extractAuthor($),
    };
  }

  const article = $(articleNode).first().clone();
  NOISE_SELECTORS.forEach((selector) => article.find(selector).remove());

  const elements = article.find("h1, h2, h3, p, ul, ol, li, blockquote").toArray();
  const cleanedPieces: string[] = [];
  const textBlocks: string[] = [];

  for (const element of elements) {
    const node = $(element);
    const tagName = (element.tagName || "").toLowerCase();
    const nodeText = node.text().trim();
    if (!nodeText) continue;

    if (tagName === "li") {
      cleanedPieces.push(`<p>• ${nodeText}</p>`);
      textBlocks.push(nodeText);
      continue;
    }

    const safeTag = ["h2", "h3", "p", "ul", "ol", "blockquote"].includes(tagName) ? tagName : "p";
    if (safeTag === "ul" || safeTag === "ol") continue;

    cleanedPieces.push(`<${safeTag}>${nodeText}</${safeTag}>`);
    textBlocks.push(nodeText);
  }

  let cleanedHtml = cleanedPieces.join("\n").trim();
  if (!cleanedHtml && article.text().trim()) {
    const paragraphs = article
      .text()
      .split(/\n+/)
      .map((line) => line.trim())
      .filter((line) => line.length > 50)
      .map((line) => `<p>${line}</p>`);
    cleanedHtml = paragraphs.join("\n");
  }

  if (!cleanedHtml) {
    throw new Error("Article content block found, but text extraction returned empty result");
  }

  const plainText = stripHtml(cleanedHtml);

  return {
    imageUrl: extractFirstImage($, articleNode),
    contentHtml: cleanedHtml,
    plainText,
    publishedAt: extractPublishedAt($),
    author: extractAuthor($),
  };
}

function fallbackRewrite(content: string, title: string) {
  const plain = stripHtml(content);
  const sentences = plain.split(/(?<=[.!?])\s+/).filter((line) => line.length > 20);
  const transformed = sentences
    .map((line, index) => {
      if (index % 2 === 0) return line;
      return line
        .replace(/сообщается/gi, "отмечается")
        .replace(/по данным/gi, "согласно информации")
        .replace(/сказал/gi, "сообщил")
        .replace(/заявил/gi, "подчеркнул");
    });
  const text = transformed.join(" ");
  const paragraphs = text
    .split(/\s{2,}|(?<=\.)\s(?=[А-ЯA-Z])/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<p>${line}</p>`)
    .slice(0, 10)
    .join("\n");

  return {
    title,
    description: normalizeDescription(text),
    content: paragraphs || `<p>${plain}</p>`,
    metaTitle: `${title} | Центр Притяжения`,
    metaDescription: normalizeDescription(text || title),
    keywords: [] as string[],
  };
}

async function rewriteWithAI(
  title: string,
  description: string,
  content: string,
  apiKey: string,
): Promise<{ title: string; description: string; content: string; metaTitle: string; metaDescription: string; keywords: string[] }> {
  if (!apiKey) {
    return fallbackRewrite(content, title);
  }

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
            content: `Ты профессиональный редактор морских новостей. Перепиши новость своими словами с сохранением фактов, чтобы текст был уникальным и в строгом новостном стиле. Не добавляй вымышленные данные. Ответь ТОЛЬКО JSON:
{"title":"уникальный заголовок","description":"краткое описание 140-160 символов","content":"уникальный HTML текст с абзацами p и подзаголовками h2/h3","keywords":["ключ 1","ключ 2"]}`,
          },
          {
            role: "user",
            content: `Исходный заголовок: ${title}\nКраткое описание: ${description}\nПолный текст: ${content}`,
          },
        ],
        temperature: 0.4,
        max_tokens: 4000,
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("AI response does not contain JSON");
    }

    const parsed = JSON.parse(jsonMatch[0]);
    const normalizedTitle = (parsed.title || title || "").trim();
    const contentHtml = String(parsed.content || "").trim() || content;
    const generatedDescription = normalizeDescription(
      String(parsed.description || "").trim() || extractDescriptionFromHtml(contentHtml, description || title),
    );

    return {
      title: normalizedTitle,
      description: generatedDescription,
      content: contentHtml,
      metaTitle: `${normalizedTitle} | Центр Притяжения`,
      metaDescription: generatedDescription,
      keywords: Array.isArray(parsed.keywords) ? parsed.keywords.slice(0, 15) : [],
    };
  } catch (error) {
    console.error("AI rewrite error:", error);
    return fallbackRewrite(content, title);
  }
}

Deno.serve(async (req) => {
  const corsHeaders = buildCorsHeaders(req.headers.get("origin"));
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY") || "";

    const supabase = createClient(supabaseUrl, supabaseKey);

    const newsItems = await fetchPortNews();
    console.log(`Fetched ${newsItems.length} items from RSS`);

    if (newsItems.length === 0) {
      return new Response(
        JSON.stringify({ success: true, imported: 0, message: "No news found in RSS" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const sourceUrls = newsItems.map((n) => n.link);
    const { data: existing } = await supabase
      .from("news")
      .select("source_url, original_source")
      .in("source_url", sourceUrls);

    const existingUrls = new Set<string>();
    for (const item of existing || []) {
      if (item.source_url) existingUrls.add(item.source_url);
      if (item.original_source) existingUrls.add(item.original_source);
    }

    const newItems = newsItems.filter((n) => !existingUrls.has(n.link));
    console.log(`${newItems.length} new items to import`);

    const errors: Array<{ link: string; message: string }> = [];
    let imported = 0;

    for (const item of newItems) {
      try {
        const parsed = await fetchArticlePage(item.link);

        if (!parsed.plainText || parsed.plainText.length < 200) {
          throw new Error("Parsed article text is too short");
        }

        const rewritten = await rewriteWithAI(
          item.title,
          extractDescriptionFromHtml(parsed.contentHtml, item.description),
          parsed.contentHtml,
          lovableApiKey,
        );

        const slug = `${slugify(rewritten.title) || "news"}-${Date.now().toString(36)}`;
        const fallbackDescription = extractDescriptionFromHtml(rewritten.content, rewritten.description);

        const { error } = await supabase.from("news").insert({
          title: rewritten.title || item.title,
          slug,
          description: normalizeDescription(rewritten.description || fallbackDescription),
          content: rewritten.content,
          image_url: parsed.imageUrl || item.imageUrl || null,
          source_url: item.link,
          original_source: item.link,
          source_title: item.title,
          source_author: parsed.author,
          published_at: parsed.publishedAt || (item.pubDate ? new Date(item.pubDate).toISOString() : null),
          created_at: parsed.publishedAt || undefined,
          keywords: rewritten.keywords,
          meta_title: rewritten.metaTitle || `${rewritten.title || item.title} | Центр Притяжения`,
          meta_description: normalizeDescription(rewritten.metaDescription || fallbackDescription),
          published: true,
        });

        if (error) {
          throw error;
        }

        imported++;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("Error processing item", item.link, err);
        errors.push({ link: item.link, message });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        imported,
        total: newsItems.length,
        skipped: newsItems.length - newItems.length,
        errors,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Import error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
