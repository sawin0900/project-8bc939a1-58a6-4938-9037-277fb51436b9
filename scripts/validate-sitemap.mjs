import { readFile } from 'node:fs/promises';

const DEFAULT_SITEMAP_FILE = 'public/sitemap.xml';
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

function extractUrls(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

function validateSitemap(xml, sourceLabel) {
  const urls = extractUrls(xml);
  const missing = REQUIRED_URLS.filter((url) => !urls.includes(url));
  const invalid = urls.filter((url) => {
    try {
      const pathname = new URL(url).pathname;
      return pathname.includes('*') || pathname.includes(':');
    } catch {
      return true;
    }
  });

  if (missing.length > 0) {
    throw new Error(`${sourceLabel} is missing required URLs: ${missing.join(', ')}`);
  }

  if (invalid.length > 0) {
    throw new Error(`${sourceLabel} contains invalid route placeholders: ${invalid.join(', ')}`);
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
