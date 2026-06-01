import { readFile } from 'node:fs/promises';

const DEFAULT_SITEMAP_FILE = 'public/sitemap.xml';
const CANONICAL_ORIGIN = 'https://centr-prityazheniya.ru';
const REQUIRED_URLS = [
  'https://centr-prityazheniya.ru/',
  'https://centr-prityazheniya.ru/services',
  'https://centr-prityazheniya.ru/sudopodem-zatonuvshih-sudov',
  'https://centr-prityazheniya.ru/vodolaznye-raboty',
  'https://centr-prityazheniya.ru/proektnaya-dokumentaciya',
  'https://centr-prityazheniya.ru/services/dismantling-cutting',
  'https://centr-prityazheniya.ru/articles',
  'https://centr-prityazheniya.ru/news',
  'https://centr-prityazheniya.ru/privacy-policy',
  'https://centr-prityazheniya.ru/faq',
  'https://centr-prityazheniya.ru/contacts',
];
const FORBIDDEN_PATHS = new Set(['/auth', '/admin', '/admin/analytics']);
const VALID_CHANGEFREQ = new Set(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']);
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function extractBlocks(xml) {
  return [...xml.matchAll(/<url>[\s\S]*?<\/url>/g)].map((match) => match[0]);
}

function getTag(block, tagName) {
  return block.match(new RegExp(`<${tagName}>(.*?)<\\/${tagName}>`))?.[1];
}

function validateSitemap(xml, sourceLabel) {
  if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    throw new Error(`${sourceLabel} must start with a UTF-8 XML declaration`);
  }

  if (!xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    throw new Error(`${sourceLabel} is missing the standard sitemap namespace`);
  }

  const blocks = extractBlocks(xml);
  const urls = blocks.map((block) => getTag(block, 'loc')).filter(Boolean);
  const uniqueUrls = new Set(urls);
  const duplicates = urls.filter((url, index) => urls.indexOf(url) !== index);
  const shouldRequireCoreUrls = sourceLabel.includes('sitemap.xml') && !sourceLabel.includes('news-sitemap.xml');
  const missing = shouldRequireCoreUrls ? REQUIRED_URLS.filter((url) => !uniqueUrls.has(url)) : [];
  const invalid = [];

  if (duplicates.length > 0) {
    throw new Error(`${sourceLabel} contains duplicate URLs: ${[...new Set(duplicates)].join(', ')}`);
  }

  if (missing.length > 0) {
    throw new Error(`${sourceLabel} is missing required URLs: ${missing.join(', ')}`);
  }

  for (const block of blocks) {
    const loc = getTag(block, 'loc');
    const lastmod = getTag(block, 'lastmod');
    const changefreq = getTag(block, 'changefreq');
    const priority = getTag(block, 'priority');

    try {
      const url = new URL(loc);
      if (url.origin !== CANONICAL_ORIGIN) invalid.push(`${loc} (non-canonical host)`);
      if (url.pathname.includes('*') || url.pathname.includes(':')) invalid.push(`${loc} (route placeholder)`);
      if (FORBIDDEN_PATHS.has(url.pathname)) invalid.push(`${loc} (forbidden technical page)`);
    } catch {
      invalid.push(`${loc} (invalid URL)`);
    }

    if (!lastmod || !DATE_PATTERN.test(lastmod) || Number.isNaN(new Date(`${lastmod}T00:00:00Z`).getTime())) {
      invalid.push(`${loc} (invalid lastmod: ${lastmod || 'missing'})`);
    }

    if (!changefreq || !VALID_CHANGEFREQ.has(changefreq)) {
      invalid.push(`${loc} (invalid changefreq: ${changefreq || 'missing'})`);
    }

    const numericPriority = Number(priority);
    if (!priority || !Number.isFinite(numericPriority) || numericPriority < 0 || numericPriority > 1) {
      invalid.push(`${loc} (invalid priority: ${priority || 'missing'})`);
    }
  }

  if (invalid.length > 0) {
    throw new Error(`${sourceLabel} contains invalid entries: ${invalid.join(', ')}`);
  }

  console.log(`Validated ${urls.length} URLs in ${sourceLabel}.`);
}

async function readRemoteSitemap(url) {
  const response = await fetch(url, {
    headers: { accept: 'application/xml,text/xml' },
    signal: AbortSignal.timeout(20_000),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  return response.text();
}

const target = process.argv[2] || DEFAULT_SITEMAP_FILE;

if (target.startsWith('http://') || target.startsWith('https://')) {
  try {
    validateSitemap(await readRemoteSitemap(target), target);
  } catch (error) {
    const fallbackXml = await readFile(DEFAULT_SITEMAP_FILE, 'utf8');
    console.warn(`Remote sitemap check failed for ${target}: ${error.message}`);
    validateSitemap(fallbackXml, `${DEFAULT_SITEMAP_FILE} fallback`);
  }
} else {
  validateSitemap(await readFile(target, 'utf8'), target);
}
