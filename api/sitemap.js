const BASE_URL = 'https://centr-prityazheniya.ru';

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/sudopodem-zatonuvshih-sudov', priority: '0.8', changefreq: 'monthly' },
  { path: '/vodolaznye-raboty', priority: '0.8', changefreq: 'monthly' },
  { path: '/proektnaya-dokumentaciya', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/dismantling-cutting', priority: '0.7', changefreq: 'monthly' },
  { path: '/stages', priority: '0.7', changefreq: 'monthly' },
  { path: '/documentation', priority: '0.7', changefreq: 'monthly' },
  { path: '/projects', priority: '0.8', changefreq: 'weekly' },
  { path: '/emergency', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles', priority: '0.7', changefreq: 'weekly' },
  { path: '/articles/chto-delat-esli-zatonulo-sudno', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles/otvetstvennost-za-zatonuvshee-imuschestvo', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles/kak-prohodyat-soglasovaniya', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles/kto-imeet-pravo-vypolnyat-raboty', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles/metody-podema-zatonuvshih-sudov', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles/ekologicheskie-riski-zatonuvshih-sudov', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles/stoimost-sudopodemnyx-rabot', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles/vodolaznoye-obsledovanie-sudov', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles/sudopodem-v-primorye', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles/utilizaciya-zatonuvshih-sudov', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles/strahovanie-sudopodemnyx-rabot', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles/podgotovka-proekta-sudopodema', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles/bezopasnost-vodolaznyh-rabot', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles/chto-delayut-s-sudnom-posle-podema', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles/pravovoe-regulirovanie-zatonuvshih-sudov', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles/oborudovanie-dlya-sudopodema', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles/ochistka-akvatoriy-ot-zatonuvshih-sudov', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles/zimnie-sudopodemnye-raboty', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles/obsledovanie-prichalov', priority: '0.7', changefreq: 'monthly' },
  { path: '/articles/likvidaciya-razlivov-nefteproduktov', priority: '0.7', changefreq: 'monthly' },
  { path: '/news', priority: '0.8', changefreq: 'daily' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/contacts', priority: '0.9', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderUrl({ loc, lastmod, changefreq, priority }) {
  return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

export default async function handler(req, res) {
  const today = new Date().toISOString().slice(0, 10);
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const newsUrls = [];

  if (supabaseUrl && supabaseKey) {
    try {
      const PAGE = 1000;
      let offset = 0;
      while (true) {
        const url = new URL('/rest/v1/news', supabaseUrl);
        url.searchParams.set('select', 'slug,updated_at,created_at');
        url.searchParams.set('published', 'eq.true');
        url.searchParams.set('slug', 'not.is.null');
        url.searchParams.set('order', 'created_at.desc');
        url.searchParams.set('offset', String(offset));
        url.searchParams.set('limit', String(PAGE));

        const r = await fetch(url.toString(), {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
        });

        if (!r.ok) break;
        const items = await r.json();
        if (!Array.isArray(items) || items.length === 0) break;

        for (const item of items) {
          const slug = String(item.slug || '').trim().replace(/^\/+|\/+$/g, '');
          if (!slug) continue;
          const date = item.updated_at || item.created_at;
          const lastmod = date ? new Date(date).toISOString().slice(0, 10) : today;
          newsUrls.push({ loc: `${BASE_URL}/news/${slug}`, lastmod, changefreq: 'daily', priority: '0.7' });
        }

        if (items.length < PAGE) break;
        offset += PAGE;
      }
    } catch (_) {
      // fall through to static pages only
    }
  }

  const allUrls = [
    ...STATIC_PAGES.map(p => ({
      loc: `${BASE_URL}${p.path}`,
      lastmod: today,
      changefreq: p.changefreq,
      priority: p.priority,
    })),
    ...newsUrls,
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...allUrls.map(renderUrl),
    '</urlset>',
    '',
  ].join('\n');

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(xml);
}