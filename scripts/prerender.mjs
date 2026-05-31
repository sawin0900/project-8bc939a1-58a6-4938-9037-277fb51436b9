import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE_URL, getRouteSeo } from './seo-metadata.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const EXCLUDED_STATIC_ROUTES = new Set(['/auth', '/admin', '/admin/analytics']);

const appSource = await readFile(path.join(rootDir, 'src', 'App.tsx'), 'utf8');
const staticRoutes = [...appSource.matchAll(/<Route\s+path=["']([^"']+)["']/g)]
  .map((m) => m[1])
  .filter((route) => route !== '*' && !route.includes(':') && !EXCLUDED_STATIC_ROUTES.has(route));

async function getSitemapRoutes() {
  try {
    const sitemap = await readFile(path.join(rootDir, 'public', 'sitemap.xml'), 'utf8');
    return [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
      .map((match) => new URL(match[1]).pathname)
      .filter((route) => route.startsWith('/news/') && !route.includes('*') && !route.includes(':'));
  } catch (error) {
    console.warn(`Skipping dynamic sitemap routes during prerender: ${error.message}`);
    return [];
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function routeCanonical(route) {
  return `${BASE_URL}${route === '/' ? '/' : route}`;
}

function injectSeo(template, route) {
  const seo = getRouteSeo(route);
  const canonical = routeCanonical(route);
  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  const canonicalUrl = escapeHtml(canonical);

  return template
    .replace(/<title(?:\s+data-rh="true")?>.*?<\/title>/, `<title data-rh="true">${title}</title>`)
    .replace(/<meta(?=[^>]*name="description")[^>]*>/, `<meta data-rh="true" name="description" content="${description}" />`)
    .replace(/<meta(?=[^>]*property="og:url")[^>]*>/, `<meta data-rh="true" property="og:url" content="${canonicalUrl}" />`)
    .replace(/<link(?=[^>]*rel="canonical")[^>]*>/, `<link data-rh="true" rel="canonical" href="${canonicalUrl}" />`)
    .replace('</head>', `    <meta data-rh="true" property="og:title" content="${title}" />\n    <meta data-rh="true" property="og:description" content="${description}" />\n    <meta data-rh="true" name="twitter:title" content="${title}" />\n    <meta data-rh="true" name="twitter:description" content="${description}" />\n</head>`);
}

const routes = Array.from(new Set([...staticRoutes, ...(await getSitemapRoutes())]));
const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

for (const route of routes) {
  const file = route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.slice(1), 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, injectSeo(template, route), 'utf8');
}

console.log(`Prerendered static entry files with unique SEO metadata for ${routes.length} public routes.`);
