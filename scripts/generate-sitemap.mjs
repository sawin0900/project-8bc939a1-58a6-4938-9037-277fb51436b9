import { readFile, writeFile } from 'node:fs/promises';

const BASE_URL = (process.env.SITEMAP_BASE_URL || 'https://centr-prityazheniya.ru').replace(/\/+$/, '');
const APP_FILE = 'src/App.tsx';
const STATIC_OUTPUT_FILES = ['public/static-sitemap.xml', 'public/sitemap.xml'];
const NEWS_OUTPUT_FILE = 'public/news-sitemap.xml';
const EXCLUDED_PATHS = new Set(['/auth', '/admin', '/admin/analytics']);
const VALID_CHANGEFREQ = new Set(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']);
const TODAY = new Date().toISOString().slice(0, 10);

function normalizePath(path) {
  if (path === '/') return '/';
  return `/${path.replace(/^\/+|\/+$/g, '')}`;
}

function isPublicStaticRoute(path) {
  if (!path || path === '*') return false;
  if (path.includes(':') || path.includes('*')) return false;
  return !EXCLUDED_PATHS.has(path);
}

function routeMeta(path) {
  if (path === '/') return { priority: '1.0', changefreq: 'weekly' };
  if (path === '/news') return { priority: '0.8', changefreq: 'daily' };
  if (path.startsWith('/news/')) return { priority: '0.7', changefreq: 'daily' };
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
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function asDate(value) {
  if (!value) return TODAY;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return TODAY;
  return date.toISOString().slice(0, 10);
}

function normalizeAbsoluteUrl(value) {
  if (!value) return null;
  try {
    return new URL(value, BASE_URL).toString();
  } catch {
    return null;
  }
}

function normalizePriority(priority) {
  const numeric = Number(priority);
  if (!Number.isFinite(numeric)) return '0.7';
  return Math.min(1, Math.max(0, numeric)).toFixed(1);
}

function normalizeChangefreq(changefreq) {
  return VALID_CHANGEFREQ.has(changefreq) ? changefreq : 'monthly';
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
    routes.push({ path, lastmod: TODAY });
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
    const url = new URL('/rest/v1/news', supabaseUrl);
    url.searchParams.set('select', 'slug,title,image_url,updated_at,created_at');
    url.searchParams.set('published', 'eq.true');
    url.searchParams.set('slug', 'not.is.null');
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
      const slug = String(item.slug || '').trim().replace(/^\/+|\/+$/g, '');
      if (!slug || slug.includes(':') || slug.includes('*')) continue;

      const imageUrl = normalizeAbsoluteUrl(item.image_url);
      newsRoutes.push({
        path: `/news/${slug}`,
        lastmod: asDate(item.updated_at || item.created_at),
        image: imageUrl ? { loc: imageUrl, title: item.title || undefined } : undefined,
      });
    }

    if (data.length < pageSize) break;
    from += pageSize;
  }

  return newsRoutes;
}

function dedupeRoutes(routes) {
  const seen = new Set();
  const deduped = [];

  for (const route of routes) {
    const path = normalizePath(route.path);
    if (!isPublicStaticRoute(path) && !path.startsWith('/news/')) continue;
    if (seen.has(path)) continue;
    seen.add(path);
    deduped.push({ ...route, path });
  }

  return deduped;
}

function renderUrl(route) {
  const { priority, changefreq } = routeMeta(route.path);
  const image = route.image?.loc ? [
    '    <image:image>',
    `      <image:loc>${escapeXml(route.image.loc)}</image:loc>`,
    route.image.title ? `      <image:title>${escapeXml(route.image.title)}</image:title>` : null,
    '    </image:image>',
  ].filter(Boolean) : [];

  return [
    '  <url>',
    `    <loc>${escapeXml(`${BASE_URL}${route.path}`)}</loc>`,
    `    <lastmod>${escapeXml(route.lastmod || TODAY)}</lastmod>`,
    `    <changefreq>${normalizeChangefreq(changefreq)}</changefreq>`,
    `    <priority>${normalizePriority(priority)}</priority>`,
    ...image,
    '  </url>',
  ].join('\n');
}

function renderUrlset(routes) {
  const hasImages = routes.some((route) => route.image?.loc);
  const namespace = hasImages
    ? '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">'
    : '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    namespace,
    ...routes.map(renderUrl),
    '</urlset>',
    '',
  ].join('\n');
}

const staticRoutes = dedupeRoutes(await getAppRoutes());
const newsRoutes = dedupeRoutes(await getPublishedNewsRoutes());
const allRoutes = dedupeRoutes([...staticRoutes, ...newsRoutes]);
const newsSitemapRoutes = dedupeRoutes([
  { path: '/news', lastmod: newsRoutes[0]?.lastmod || TODAY },
  ...newsRoutes,
]);

await Promise.all([
  ...STATIC_OUTPUT_FILES.map((file) => writeFile(file, renderUrlset(allRoutes))),
  writeFile(NEWS_OUTPUT_FILE, renderUrlset(newsSitemapRoutes)),
]);

console.log(`Generated ${STATIC_OUTPUT_FILES.join(', ')} with ${allRoutes.length} URLs (${staticRoutes.length} static, ${newsRoutes.length} news).`);
console.log(`Generated ${NEWS_OUTPUT_FILE} with ${newsSitemapRoutes.length} news URLs.`);
