import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

const routes = Array.from(new Set([...staticRoutes, ...(await getSitemapRoutes())]));
const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

for (const route of routes) {
  const file = route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.slice(1), 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, template, 'utf8');
}

console.log(`Prerendered static entry files for ${routes.length} public routes.`);
