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
    "Content-Type": "application/xml; charset=utf-8",
    "Vary": "Origin",
  };
}

const BASE_URL = "https://centr-prityazheniya.ru";

interface SitemapPage {
  path: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function parseStaticSitemap(xml: string): SitemapPage[] {
  const pages: SitemapPage[] = [];
  const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];

  for (const block of urlBlocks) {
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1];
    if (!loc?.startsWith(BASE_URL)) continue;

    const path = loc.slice(BASE_URL.length) || "/";
    if (path === "/*" || path.includes(":")) continue;
    if (path.startsWith("/news/")) continue;

    pages.push({
      path,
      lastmod: block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
      changefreq: block.match(/<changefreq>(.*?)<\/changefreq>/)?.[1] || "monthly",
      priority: block.match(/<priority>(.*?)<\/priority>/)?.[1] || "0.7",
    });
  }

  return pages;
}

async function getStaticPages(): Promise<SitemapPage[]> {
  try {
    const response = await fetch(`${BASE_URL}/static-sitemap.xml`, {
      headers: { accept: "application/xml,text/xml" },
    });

    if (!response.ok) throw new Error(`Static sitemap returned ${response.status}`);

    const parsedPages = parseStaticSitemap(await response.text());
    if (parsedPages.length > 0) return parsedPages;
  } catch (error) {
    console.warn("Static sitemap fetch failed, using fallback routes:", error);
  }

  return [
    ...staticPages,
    ...articlePages.map((path) => ({ path, priority: "0.7", changefreq: "monthly" })),
  ];
}

// Static pages with their priorities and changefreq
const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/services", priority: "0.8", changefreq: "weekly" },
  { path: "/sudopodem-zatonuvshih-sudov", priority: "0.8", changefreq: "monthly" },
  { path: "/vodolaznye-raboty", priority: "0.8", changefreq: "monthly" },
  { path: "/proektnaya-dokumentaciya", priority: "0.8", changefreq: "monthly" },
  { path: "/services/dismantling-cutting", priority: "0.8", changefreq: "monthly" },
  { path: "/stages", priority: "0.8", changefreq: "monthly" },
  { path: "/documentation", priority: "0.8", changefreq: "monthly" },
  { path: "/projects", priority: "0.8", changefreq: "weekly" },
  { path: "/emergency", priority: "0.7", changefreq: "monthly" },
  { path: "/articles", priority: "0.7", changefreq: "weekly" },
  { path: "/news", priority: "0.8", changefreq: "daily" },
  { path: "/faq", priority: "0.6", changefreq: "monthly" },
  { path: "/contacts", priority: "0.9", changefreq: "monthly" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
];

// Static article pages
const articlePages = [
  "/articles/chto-delat-esli-zatonulo-sudno",
  "/articles/otvetstvennost-za-zatonuvshee-imuschestvo",
  "/articles/kak-prohodyat-soglasovaniya",
  "/articles/kto-imeet-pravo-vypolnyat-raboty",
  "/articles/metody-podema-zatonuvshih-sudov",
  "/articles/ekologicheskie-riski-zatonuvshih-sudov",
  "/articles/stoimost-sudopodemnyx-rabot",
  "/articles/vodolaznoye-obsledovanie-sudov",
  "/articles/sudopodem-v-primorye",
  "/articles/utilizaciya-zatonuvshih-sudov",
  "/articles/strahovanie-sudopodemnyx-rabot",
  "/articles/podgotovka-proekta-sudopodema",
  "/articles/bezopasnost-vodolaznyh-rabot",
  "/articles/chto-delayut-s-sudnom-posle-podema",
  "/articles/pravovoe-regulirovanie-zatonuvshih-sudov",
  "/articles/oborudovanie-dlya-sudopodema",
  "/articles/ochistka-akvatoriy-ot-zatonuvshih-sudov",
  "/articles/zimnie-sudopodemnye-raboty",
  "/articles/obsledovanie-prichalov",
  "/articles/likvidaciya-razlivov-nefteproduktov",
];

Deno.serve(async (req) => {
  const corsHeaders = buildCorsHeaders(req.headers.get("origin"));
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all published news in batches (Supabase returns max 1000 rows per request)
    const newsItems: Array<{ slug: string; updated_at: string | null; created_at: string }> = [];
    const pageSize = 1000;
    let from = 0;

    while (true) {
      const to = from + pageSize - 1;
      const { data, error } = await supabase
        .from("news")
        .select("slug, updated_at, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      if (!data || data.length === 0) break;

      newsItems.push(...data);

      if (data.length < pageSize) break;
      from += pageSize;
    }

    const today = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const pages = await getStaticPages();

    // Static pages from generated static-sitemap.xml. Falls back to the route list above.
    for (const page of pages) {
      xml += `  <url>\n`;
      xml += `    <loc>${escapeXml(`${BASE_URL}${page.path}`)}</loc>\n`;
      xml += `    <lastmod>${page.lastmod || today}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    // Dynamic news pages
    for (const news of newsItems) {
      const lastmod = (news.updated_at || news.created_at).split("T")[0];
      xml += `  <url>\n`;
      xml += `    <loc>${escapeXml(`${BASE_URL}/news/${news.slug}`)}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    return new Response(xml, {
      headers: { ...corsHeaders, "Cache-Control": "public, max-age=3600" },
    });
  } catch (error) {
    console.error("Sitemap error:", error);
    return new Response("Error generating sitemap", { status: 500, headers: corsHeaders });
  }
});
