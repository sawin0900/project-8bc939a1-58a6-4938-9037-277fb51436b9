CREATE TABLE IF NOT EXISTS public.ad_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  ad_type TEXT NOT NULL CHECK (ad_type IN ('image', 'html')),
  image_url TEXT,
  link_url TEXT,
  html_code TEXT,
  position TEXT NOT NULL CHECK (position IN ('top', 'sidebar', 'bottom')),
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  priority INTEGER NOT NULL DEFAULT 0,
  impressions BIGINT NOT NULL DEFAULT 0,
  clicks BIGINT NOT NULL DEFAULT 0,
  max_impressions BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT ad_banners_content_check CHECK (
    (ad_type = 'image' AND image_url IS NOT NULL)
    OR (ad_type = 'html' AND html_code IS NOT NULL)
  ),
  CONSTRAINT ad_banners_link_url_valid CHECK (
    link_url IS NULL OR link_url ~* '^https?://'
  ),
  CONSTRAINT ad_banners_dates_check CHECK (
    end_date IS NULL OR start_date IS NULL OR end_date >= start_date
  ),
  CONSTRAINT ad_banners_max_impressions_check CHECK (
    max_impressions IS NULL OR max_impressions > 0
  )
);

CREATE INDEX IF NOT EXISTS idx_ad_banners_position_priority
  ON public.ad_banners(position, is_active, priority DESC, created_at DESC);

CREATE OR REPLACE FUNCTION public.update_ad_banners_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_ad_banners_updated_at ON public.ad_banners;
CREATE TRIGGER trg_ad_banners_updated_at
BEFORE UPDATE ON public.ad_banners
FOR EACH ROW
EXECUTE FUNCTION public.update_ad_banners_updated_at();

ALTER TABLE public.ad_banners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read ad banners" ON public.ad_banners;
CREATE POLICY "Anyone can read ad banners"
ON public.ad_banners
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Admins can manage ad banners" ON public.ad_banners;
CREATE POLICY "Admins can manage ad banners"
ON public.ad_banners
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.increment_ad_impression(p_ad_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.ad_banners
  SET impressions = impressions + 1
  WHERE id = p_ad_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.increment_ad_click(p_ad_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.ad_banners
  SET clicks = clicks + 1
  WHERE id = p_ad_id;
END;
$$;
