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
const VALID_CHANGEFREQ = new Set(["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"]);

interface SitemapImage {
  loc: string;
  title?: string;
}

interface SitemapPage {
  path: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
  image?: SitemapImage;
}

interface NewsItem {
  slug: string;
  title: string | null;
  image_url: string | null;
  updated_at: string | null;
  created_at: string;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normalizePath(path: string): string {
  if (path === "/") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

function normalizeAbsoluteUrl(value?: string | null): string | undefined {
  if (!value) return undefined;

  try {
    return new URL(value, BASE_URL).toString();
  } catch {
    return undefined;
  }
}

function asDate(value?: string | null): string {
  if (!value) return new Date().toISOString().split("T")[0];

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString().split("T")[0] : date.toISOString().split("T")[0];
}

function normalizePriority(priority: string): string {
  const numeric = Number(priority);
  if (!Number.isFinite(numeric)) return "0.7";
  return Math.min(1, Math.max(0, numeric)).toFixed(1);
}

function normalizeChangefreq(changefreq: string): string {
  return VALID_CHANGEFREQ.has(changefreq) ? changefreq : "monthly";
}

function routeMeta(path: string): Pick<SitemapPage, "priority" | "changefreq"> {
  if (path === "/") return { priority: "1.0", changefreq: "weekly" };
  if (path === "/news") return { priority: "0.8", changefreq: "daily" };
  if (path.startsWith("/news/")) return { priority: "0.7", changefreq: "daily" };
  if (path === "/contacts") return { priority: "0.9", changefreq: "monthly" };
  if (path.startsWith("/articles/")) return { priority: "0.7", changefreq: "monthly" };
  if (path === "/articles") return { priority: "0.7", changefreq: "weekly" };
  if (path === "/privacy-policy") return { priority: "0.3", changefreq: "yearly" };
  if (path === "/faq") return { priority: "0.6", changefreq: "monthly" };
  if (path === "/emergency") return { priority: "0.7", changefreq: "monthly" };
  if (path === "/projects") return { priority: "0.8", changefreq: "weekly" };
  return { priority: "0.8", changefreq: "monthly" };
}

function isIndexablePath(path: string): boolean {
  if (!path || path.includes(":")) return false;
  if (path.includes("*")) return false;
  return !["/auth", "/admin", "/admin/analytics"].includes(path);
}

function parseStaticSitemap(xml: string): SitemapPage[] {
  const pages: SitemapPage[] = [];
  const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];

  for (const block of urlBlocks) {
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1];
    if (!loc?.startsWith(BASE_URL)) continue;

    const path = normalizePath(loc.slice(BASE_URL.length) || "/");
    if (!isIndexablePath(path)) continue;
    if (path.startsWith("/news/")) continue;

    pages.push({
      path,
      lastmod: block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
      changefreq: normalizeChangefreq(block.match(/<changefreq>(.*?)<\/changefreq>/)?.[1] || "monthly"),
      priority: normalizePriority(block.match(/<priority>(.*?)<\/priority>/)?.[1] || "0.7"),
    });
  }

  return dedupePages(pages);
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
    ...articlePages.map((path) => ({ path, ...routeMeta(path) })),
  ];
}

async function getPublishedNews(supabase: ReturnType<typeof createClient>): Promise<SitemapPage[]> {
  const newsItems: NewsItem[] = [];
  const pageSize = 1000;
  let from = 0;

  while (true) {
    const to = from + pageSize - 1;
    const { data, error } = await supabase
      .from("news")
      .select("slug, title, image_url, updated_at, created_at")
      .eq("published", true)
      .not("slug", "is", null)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;
    if (!data || data.length === 0) break;

    newsItems.push(...(data as NewsItem[]));

    if (data.length < pageSize) break;
    from += pageSize;
  }

  return dedupePages(newsItems.map((news) => {
    const slug = String(news.slug || "").trim().replace(/^\/+|\/+$/g, "");
    const imageLoc = normalizeAbsoluteUrl(news.image_url);

    return {
      path: `/news/${slug}`,
      lastmod: asDate(news.updated_at || news.created_at),
      ...routeMeta(`/news/${slug}`),
      image: imageLoc ? { loc: imageLoc, title: news.title || undefined } : undefined,
    };
  }).filter((page) => page.path !== "/news/" && isIndexablePath(page.path)));
}

function dedupePages(pages: SitemapPage[]): SitemapPage[] {
  const seen = new Set<string>();
  const deduped: SitemapPage[] = [];

  for (const page of pages) {
    const path = normalizePath(page.path);
    if (!isIndexablePath(path) || seen.has(path)) continue;
    seen.add(path);
    deduped.push({ ...page, path });
  }

  return deduped;
}

function renderUrl(page: SitemapPage): string {
  const meta = routeMeta(page.path);
  const image = page.image?.loc ? [
    "    <image:image>",
    `      <image:loc>${escapeXml(page.image.loc)}</image:loc>`,
    page.image.title ? `      <image:title>${escapeXml(page.image.title)}</image:title>` : undefined,
    "    </image:image>",
  ].filter(Boolean) : [];

  return [
    "  <url>",
    `    <loc>${escapeXml(`${BASE_URL}${page.path}`)}</loc>`,
    `    <lastmod>${escapeXml(page.lastmod || asDate())}</lastmod>`,
    `    <changefreq>${normalizeChangefreq(page.changefreq || meta.changefreq)}</changefreq>`,
    `    <priority>${normalizePriority(page.priority || meta.priority)}</priority>`,
    ...image,
    "  </url>",
  ].join("\n");
}

function renderUrlset(pages: SitemapPage[]): string {
  const hasImages = pages.some((page) => page.image?.loc);
  const namespace = hasImages
    ? `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`
    : `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    namespace,
    ...pages.map(renderUrl),
    `</urlset>`,
    "",
  ].join("\n");
}

// Static pages with their priorities and changefreq
const staticPages: SitemapPage[] = [
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
    const requestUrl = new URL(req.url);
    const type = requestUrl.searchParams.get("type");

    const newsPages = await getPublishedNews(supabase);
    const pages = type === "news"
      ? dedupePages([{ path: "/news", lastmod: newsPages[0]?.lastmod || asDate(), ...routeMeta("/news") }, ...newsPages])
      : dedupePages([...(await getStaticPages()), ...newsPages]);

    return new Response(renderUrlset(pages), {
      headers: { ...corsHeaders, "Cache-Control": "public, max-age=900" },
    });
  } catch (error) {
    console.error("Sitemap error:", error);
    return new Response("Error generating sitemap", { status: 500, headers: corsHeaders });
  }
});
