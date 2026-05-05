import { readFile, writeFile } from 'node:fs/promises';

const BASE_URL = 'https://centr-prityazheniya.ru';
const APP_FILE = 'src/App.tsx';
const OUTPUT_FILES = ['public/static-sitemap.xml', 'public/sitemap.xml'];
const EXCLUDED_PATHS = new Set(['/auth', '/admin', '/admin/analytics']);
const TODAY = new Date().toISOString().slice(0, 10);

function normalizePath(path) {
  if (path === '/') return '/';
  return `/${path.replace(/^\/+|\/+$/g, '')}`;
}

function isPublicStaticRoute(path) {
  if (!path || path === '*') return false;
  if (path.includes(':')) return false;
  return !EXCLUDED_PATHS.has(path);
}

function routeMeta(path) {
  if (path === '/') return { priority: '1.0', changefreq: 'weekly' };
  if (path === '/news') return { priority: '0.8', changefreq: 'daily' };
  if (path === '/contacts') return { priority: '0.9', changefreq: 'monthly' };
  if (path.startsWith('/articles/')) return { priority: '0.7', changefreq: 'monthly' };
  if (path === '/articles') return { priority: '0.7', changefreq: 'weekly' };
  if (path === '/privacy-policy') return { priority: '0.3', changefreq: 'yearly' };
  if (path === '/faq') return { priority: '0.6', changefreq: 'monthly' };
  if (path === '/emergency') return { priority: '0.7', changefreq: 'monthly' };
  if (path === '/projects') return { priority: '0.8', changefreq: 'weekly' };
  return { priority: '0.8', changefreq: 'monthly' };
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function getAppRoutes() {
  const appSource = await readFile(APP_FILE, 'utf8');
  const routePattern = /<Route\s+path=["']([^"']+)["']/g;
  const routes = [];
  const seen = new Set();
  let match;

  while ((match = routePattern.exec(appSource)) !== null) {
    const rawPath = match[1];
    if (rawPath === '*') continue;

    const path = normalizePath(rawPath);
    if (!isPublicStaticRoute(path) || seen.has(path)) continue;
    seen.add(path);
    routes.push(path);
  }

  return routes;
}

async function getPublishedNewsRoutes() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  const newsRoutes = [];
  const pageSize = 1000;
  let from = 0;

  while (true) {
    const to = from + pageSize - 1;
    const url = new URL('/rest/v1/news', supabaseUrl);
    url.searchParams.set('select', 'slug,updated_at,created_at');
    url.searchParams.set('published', 'eq.true');
    url.searchParams.set('order', 'created_at.desc');
    url.searchParams.set('offset', String(from));
    url.searchParams.set('limit', String(pageSize));

    const response = await fetch(url, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch news for sitemap: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) break;

    for (const item of data) {
      if (!item.slug) continue;
      newsRoutes.push({
        path: `/news/${item.slug}`,
        lastmod: String(item.updated_at || item.created_at || TODAY).slice(0, 10),
      });
    }

    if (data.length < pageSize) break;
    from += pageSize;
  }

  return newsRoutes;
}

function renderUrl({ path, lastmod = TODAY }) {
  const { priority, changefreq } = routeMeta(path);
  return [
    '  <url>',
    `    <loc>${escapeXml(`${BASE_URL}${path}`)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

const staticRoutes = await getAppRoutes();
const newsRoutes = await getPublishedNewsRoutes();
const allRoutes = [
  ...staticRoutes.map((path) => ({ path })),
  ...newsRoutes,
];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...allRoutes.map(renderUrl),
  '</urlset>',
  '',
].join('\n');

await Promise.all(OUTPUT_FILES.map((file) => writeFile(file, xml)));
console.log(`Generated ${OUTPUT_FILES.join(', ')} with ${allRoutes.length} URLs (${staticRoutes.length} static, ${newsRoutes.length} news).`);
