import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  hreflang?: { lang: string; url: string }[];
}

export function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/og-image.jpg',
  noindex = false,
  hreflang,
}: SEOHeadProps) {
  const baseUrl = 'https://centr-prityazheniya.store';
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  
  // Default hreflang for Russian site
  const defaultHreflang = [
    { lang: 'ru', url: fullCanonical },
    { lang: 'x-default', url: fullCanonical },
  ];
  
  const hreflangTags = hreflang || defaultHreflang;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Hreflang Tags */}
      {hreflangTags.map((tag) => (
        <link key={tag.lang} rel="alternate" hrefLang={tag.lang} href={tag.url} />
      ))}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
