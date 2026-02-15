
-- Create news table
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  source_url TEXT UNIQUE,
  source_title TEXT,
  keywords TEXT[],
  meta_title TEXT,
  meta_description TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Public can read published news
CREATE POLICY "Anyone can read published news"
ON public.news
FOR SELECT
USING (published = true);

-- Admins can do everything
CREATE POLICY "Admins can manage news"
ON public.news
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_news_updated_at
BEFORE UPDATE ON public.news
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Index for slug lookups
CREATE INDEX idx_news_slug ON public.news (slug);
CREATE INDEX idx_news_created_at ON public.news (created_at DESC);
CREATE INDEX idx_news_source_url ON public.news (source_url);
