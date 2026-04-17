import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const allowedOrigins = new Set([
  "https://centr-prityazheniya.ru",
  "https://www.centr-prityazheniya.ru",
  "http://localhost:5173",
]);

function buildCorsHeaders(origin: string | null) {
  const safeOrigin = origin && allowedOrigins.has(origin) ? origin : "https://centr-prityazheniya.ru";
  return {
    "Access-Control-Allow-Origin": safeOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Content-Type": "application/rss+xml; charset=utf-8",
    "Vary": "Origin",
  };
}

const BASE_URL = "https://centr-prityazheniya.ru";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toUTCString();
}

// Convert HTML content to Turbo-compatible format
function toTurboContent(html: string, imageUrl: string | null, title: string): string {
  let turbo = `<article>\n<header>\n  <h1>${escapeXml(title)}</h1>\n</header>\n`;

  if (imageUrl) {
    turbo += `<figure>\n  <img src="${escapeXml(imageUrl)}" />\n</figure>\n`;
  }

  // Clean and wrap content
  turbo += html;

  turbo += `\n</article>`;

  return turbo;
}

Deno.serve(async (req) => {
  const corsHeaders = buildCorsHeaders(req.headers.get("origin"));
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch published news
    const { data: newsItems } = await supabase
      .from("news")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(50);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<rss xmlns:yandex="http://news.yandex.ru"\n`;
    xml += `     xmlns:media="http://search.yahoo.com/mrss/"\n`;
    xml += `     xmlns:turbo="http://turbo.yandex.ru"\n`;
    xml += `     version="2.0">\n`;
    xml += `  <channel>\n`;
    xml += `    <title>Центр Притяжения — Судоподъем и морские работы</title>\n`;
    xml += `    <link>${BASE_URL}</link>\n`;
    xml += `    <description>Новости и статьи о судоподъёме, водолазных работах и утилизации судов во Владивостоке</description>\n`;
    xml += `    <language>ru</language>\n`;
    const metrikaId = Deno.env.get("YANDEX_METRIKA_ID")?.trim();
    if (metrikaId) {
      xml += `    <turbo:analytics type="Yandex" id="${escapeXml(metrikaId)}"></turbo:analytics>\n`;
    }

    if (newsItems) {
      for (const news of newsItems) {
        const turboContent = toTurboContent(news.content, news.image_url, news.title);
        const pubDate = formatDate(news.created_at);
        const link = `${BASE_URL}/news/${news.slug}`;

        xml += `    <item turbo="true">\n`;
        xml += `      <title>${escapeXml(news.title)}</title>\n`;
        xml += `      <link>${link}</link>\n`;
        xml += `      <guid>${link}</guid>\n`;
        xml += `      <pubDate>${pubDate}</pubDate>\n`;
        if (news.description) {
          xml += `      <description>${escapeXml(news.description)}</description>\n`;
        }
        if (news.content) {
          xml += `      <yandex:full-text>${escapeXml(stripHtml(news.content).slice(0, 10000))}</yandex:full-text>\n`;
        }
        xml += `      <turbo:content><![CDATA[\n${turboContent}\n      ]]></turbo:content>\n`;
        xml += `    </item>\n`;
      }
    }

    xml += `  </channel>\n`;
    xml += `</rss>`;

    return new Response(xml, {
      headers: { ...corsHeaders, "Cache-Control": "public, max-age=1800" },
    });
  } catch (error) {
    console.error("Turbo RSS error:", error);
    return new Response("Error generating turbo RSS", { status: 500, headers: corsHeaders });
  }
});
