CREATE TABLE IF NOT EXISTS public.menu_page_seo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key TEXT NOT NULL UNIQUE,
  page_name TEXT NOT NULL,
  seo_title TEXT,
  seo_description TEXT,
  source_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.touch_menu_page_seo_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_touch_menu_page_seo_updated_at ON public.menu_page_seo;
CREATE TRIGGER trg_touch_menu_page_seo_updated_at
BEFORE UPDATE ON public.menu_page_seo
FOR EACH ROW
EXECUTE FUNCTION public.touch_menu_page_seo_updated_at();

ALTER TABLE public.menu_page_seo ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read menu SEO" ON public.menu_page_seo;
CREATE POLICY "Anyone can read menu SEO"
ON public.menu_page_seo
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Admins can manage menu SEO" ON public.menu_page_seo;
CREATE POLICY "Admins can manage menu SEO"
ON public.menu_page_seo
FOR ALL
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
