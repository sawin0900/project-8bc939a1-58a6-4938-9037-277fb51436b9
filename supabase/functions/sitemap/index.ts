import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/xml; charset=utf-8",
};

const BASE_URL = "https://centr-prityazheniya.ru";

// Static pages with their priorities and changefreq
const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/services", priority: "0.8", changefreq: "weekly" },
  { path: "/services/dismantling-cutting", priority: "0.8", changefreq: "monthly" },
  { path: "/stages", priority: "0.8", changefreq: "monthly" },
  { path: "/documentation", priority: "0.8", changefreq: "monthly" },
  { path: "/projects", priority: "0.8", changefreq: "weekly" },
  { path: "/emergency", priority: "0.7", changefreq: "monthly" },
  { path: "/articles", priority: "0.7", changefreq: "weekly" },
  { path: "/news", priority: "0.8", changefreq: "daily" },
  { path: "/faq", priority: "0.6", changefreq: "monthly" },
  { path: "/contacts", priority: "0.9", changefreq: "monthly" },
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
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all published news
    const { data: newsItems } = await supabase
      .from("news")
      .select("slug, updated_at, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false });

    const today = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages
    for (const page of staticPages) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${page.path}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    // Static article pages
    for (const path of articlePages) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${path}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    }

    // Dynamic news pages
    if (newsItems) {
      for (const news of newsItems) {
        const lastmod = (news.updated_at || news.created_at).split("T")[0];
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}/news/${news.slug}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>daily</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      }
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
