ALTER TABLE public.news
  ADD COLUMN IF NOT EXISTS original_source TEXT,
  ADD COLUMN IF NOT EXISTS source_author TEXT,
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;

UPDATE public.news
SET original_source = source_url
WHERE original_source IS NULL
  AND source_url IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_news_original_source_unique
  ON public.news (original_source)
  WHERE original_source IS NOT NULL;
