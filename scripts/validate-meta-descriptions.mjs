import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ROUTE_SEO } from './seo-metadata.mjs';

const DIST_DIR = 'dist';
const MIN_DESCRIPTION_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 160;

function routeFile(route) {
  return route === '/'
    ? path.join(DIST_DIR, 'index.html')
    : path.join(DIST_DIR, route.slice(1), 'index.html');
}

function extractMetaDescriptions(html) {
  return [...html.matchAll(/<meta\s+[^>]*name=["']description["'][^>]*>/gi)].map((match) => match[0]);
}

function decodeHtml(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function extractContent(tag) {
  const match = tag.match(/content=["']([^"']*)["']/i);
  return decodeHtml(match?.[1] || '');
}

const descriptions = new Map();
const failures = [];

for (const [route, expected] of Object.entries(ROUTE_SEO)) {
  const file = routeFile(route);
  let html;

  try {
    html = await readFile(file, 'utf8');
  } catch (error) {
    failures.push(`${route}: cannot read ${file}: ${error.message}`);
    continue;
  }

  const tags = extractMetaDescriptions(html);
  if (tags.length !== 1) {
    failures.push(`${route}: expected exactly 1 meta description, found ${tags.length}`);
    continue;
  }

  const description = extractContent(tags[0]);
  const length = [...description].length;

  if (description !== expected.description) {
    failures.push(`${route}: description does not match SEO metadata registry`);
  }

  if (length < MIN_DESCRIPTION_LENGTH || length > MAX_DESCRIPTION_LENGTH) {
    failures.push(`${route}: description length ${length} is outside ${MIN_DESCRIPTION_LENGTH}-${MAX_DESCRIPTION_LENGTH}`);
  }

  if (descriptions.has(description)) {
    failures.push(`${route}: duplicate description also used by ${descriptions.get(description)}`);
  }

  descriptions.set(description, route);
}

if (failures.length > 0) {
  throw new Error(`Meta description validation failed:\n${failures.join('\n')}`);
}

console.log(`Validated ${descriptions.size} unique meta descriptions (${MIN_DESCRIPTION_LENGTH}-${MAX_DESCRIPTION_LENGTH} chars).`);
