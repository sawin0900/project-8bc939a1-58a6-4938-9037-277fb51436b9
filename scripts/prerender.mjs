import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const appSource = await readFile(path.join(rootDir, 'src', 'App.tsx'), 'utf8');

const storage = new Map();
globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, String(value)),
  removeItem: (key) => storage.delete(key),
  clear: () => storage.clear(),
};

const routes = [...appSource.matchAll(/<Route\s+path=["']([^"']+)["']/g)]
  .map((m) => m[1])
  .filter((p) => p !== '*' && !p.includes(':') && !['/auth', '/admin', '/admin/analytics'].includes(p));

const { render } = await import(pathToFileURL(path.join(rootDir, 'dist-ssr', 'entry-server.js')).href);
const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

for (const route of Array.from(new Set(routes))) {
  const appHtml = render(route);
  const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  const filePath = route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.slice(1), 'index.html');
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html, 'utf8');
  console.log(`Prerendered ${route}`);
}
