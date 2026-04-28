import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { resolveMenuSeo, type MenuPageKey } from '@/lib/menuSeo';
import { SEOHead } from './SEOHead';

interface MenuSeoRow {
  page_key: string;
  seo_title: string | null;
  seo_description: string | null;
  source_text: string | null;
}

interface MenuSEOHeadProps {
  pageKey: MenuPageKey;
  pageName: string;
  fallbackDescription?: string;
  description?: string;
  title?: string;
  fallbackText?: string;
  canonical: string;
  keywords?: string;
  ogImage?: string;
}

export function MenuSEOHead(props: MenuSEOHeadProps) {
  const [row, setRow] = useState<MenuSeoRow | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadSeo = async () => {
      const { data } = await supabase
        .from('menu_page_seo')
        .select('page_key, seo_title, seo_description, source_text')
        .eq('page_key', props.pageKey)
        .maybeSingle();

      if (mounted) {
        setRow((data as MenuSeoRow | null) || null);
      }
    };

    loadSeo();

    return () => {
      mounted = false;
    };
  }, [props.pageKey]);

  const resolved = resolveMenuSeo({
    pageName: props.pageName,
    manualTitle: row?.seo_title,
    manualDescription: row?.seo_description,
    fallbackDescription: props.fallbackDescription || props.description || props.title || props.pageName,
    fallbackText: row?.source_text || props.fallbackText,
  });

  return (
    <SEOHead
      title={resolved.title}
      description={resolved.description}
      canonical={props.canonical}
      keywords={props.keywords}
      ogImage={props.ogImage}
      ogType="website"
    />
  );
}
