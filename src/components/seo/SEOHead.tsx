import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  hreflang?: { lang: string; url: string }[];
  ogType?: "website" | "article";
}

function normalizeCanonicalPath(path: string) {
  const withoutQuery = path.split('?')[0].split('#')[0] || '/';
  if (withoutQuery === '/') return '/';
  return withoutQuery.endsWith('/') ? withoutQuery.slice(0, -1) : withoutQuery;
}

export function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/images/heroes/services.webp',
  noindex = false,
  hreflang,
  ogType = "website",
}: SEOHeadProps) {
  const baseUrl = 'https://centr-prityazheniya.ru';
  const normalizedCanonical = canonical ? normalizeCanonicalPath(canonical) : '/';
  const fullCanonical = `${baseUrl}${normalizedCanonical}`;
  const fullOgImage = ogImage.startsWith("http://") || ogImage.startsWith("https://")
    ? ogImage
    : `${baseUrl}${ogImage}`;

  const defaultHreflang = [
    { lang: 'en', url: `${fullCanonical}?lang=en` },
    { lang: 'zh', url: `${fullCanonical}?lang=zh` },
    { lang: 'x-default', url: `${fullCanonical}?lang=en` },
  ];

  const hreflangTags = hreflang || defaultHreflang;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={fullCanonical} />

      {hreflangTags.map((tag) => (
        <link key={tag.lang} rel="alternate" hrefLang={tag.lang} href={tag.url} />
      ))}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={fullOgImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
