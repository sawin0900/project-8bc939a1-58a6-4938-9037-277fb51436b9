import { useEffect, useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

type AdPosition = 'top' | 'sidebar' | 'bottom';
type AdType = 'image' | 'html';

interface AdBanner {
  id: string;
  title: string;
  ad_type: AdType;
  image_url: string | null;
  link_url: string | null;
  html_code: string | null;
  position: AdPosition;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  priority: number;
  impressions: number;
  max_impressions: number | null;
}

interface AdSlotProps {
  position: AdPosition;
  className?: string;
}

const isWithinDateRange = (ad: AdBanner, today: string) => {
  const startsOk = !ad.start_date || ad.start_date <= today;
  const endsOk = !ad.end_date || ad.end_date >= today;
  return startsOk && endsOk;
};

const hasRemainingImpressions = (ad: AdBanner) => {
  if (!ad.max_impressions || ad.max_impressions <= 0) return true;
  return ad.impressions < ad.max_impressions;
};

const isSafeUrl = (value: string | null) => {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

export function AdSlot({ position, className }: AdSlotProps) {
  const trackedImpressionId = useRef<string | null>(null);
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const { data: ad } = useQuery({
    queryKey: ['ad-slot', position],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ad_banners')
        .select('*')
        .eq('position', position)
        .eq('is_active', true)
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      const candidates = ((data || []) as AdBanner[])
        .filter((item) => isWithinDateRange(item, today))
        .filter(hasRemainingImpressions);
      return candidates[0] || null;
    },
  });

  useEffect(() => {
    if (!ad?.id || trackedImpressionId.current === ad.id) return;
    trackedImpressionId.current = ad.id;
    void supabase.rpc('increment_ad_impression', { p_ad_id: ad.id });
  }, [ad?.id]);

  if (!ad) return null;

  const safeLink = isSafeUrl(ad.link_url) ? ad.link_url : null;

  const registerClick = () => {
    void supabase.rpc('increment_ad_click', { p_ad_id: ad.id });
  };

  const content = ad.ad_type === 'html'
    ? <div dangerouslySetInnerHTML={{ __html: ad.html_code || '' }} />
    : <img src={ad.image_url || ''} alt={ad.title} className="w-full h-auto rounded-md" loading="lazy" />;

  return (
    <div className={cn(`ad ad-${position} rounded-lg border border-border bg-card/40 p-2`, className)}>
      {safeLink ? (
        <a
          href={safeLink}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          onClick={registerClick}
          aria-label={ad.title}
        >
          {content}
        </a>
      ) : content}
    </div>
  );
}
