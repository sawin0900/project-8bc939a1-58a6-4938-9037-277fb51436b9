import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom/server';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const { default: App } = await import(path.join(rootDir, 'src', 'App.tsx'));

const appSource = await readFile(path.join(rootDir, 'src', 'App.tsx'), 'utf8');
const routes = [...appSource.matchAll(/<Route\s+path=["']([^"']+)["']/g)]
  .map((m) => m[1])
  .filter((p) => p !== '*' && !p.includes(':') && !['/auth','/admin','/admin/analytics'].includes(p));

const template = await readFile(path.join(distDir, 'index.html'), 'utf8');
for (const route of Array.from(new Set(routes))) {
  const helmetContext = {};
  const appHtml = renderToString(
    React.createElement(HelmetProvider, { context: helmetContext },
      React.createElement(StaticRouter, { location: route }, React.createElement(App)),
    ),
  );
  const out = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  const file = route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.slice(1), 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, out, 'utf8');
}
