CREATE TABLE IF NOT EXISTS public.news_related_links (
  news_id UUID NOT NULL REFERENCES public.news(id) ON DELETE CASCADE,
  related_news_id UUID NOT NULL REFERENCES public.news(id) ON DELETE CASCADE,
  source_type TEXT NOT NULL DEFAULT 'auto' CHECK (source_type IN ('auto', 'manual')),
  score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (news_id, related_news_id)
);

CREATE INDEX IF NOT EXISTS idx_news_related_links_news_id ON public.news_related_links (news_id);
CREATE INDEX IF NOT EXISTS idx_news_related_links_related_news_id ON public.news_related_links (related_news_id);
CREATE INDEX IF NOT EXISTS idx_news_related_links_source_type ON public.news_related_links (source_type);

ALTER TABLE public.news_related_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read related links" ON public.news_related_links;
CREATE POLICY "Anyone can read related links"
ON public.news_related_links
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Admins can manage related links" ON public.news_related_links;
CREATE POLICY "Admins can manage related links"
ON public.news_related_links
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.extract_keywords(input_text TEXT)
RETURNS TEXT[]
LANGUAGE SQL
IMMUTABLE
AS $$
  SELECT COALESCE(
    ARRAY(
      SELECT DISTINCT token
      FROM unnest(
        regexp_split_to_array(
          lower(COALESCE(input_text, '')),
          '[^[:alnum:]а-яё]+'
        )
      ) AS token
      WHERE char_length(token) >= 4
        AND token NOT IN (
          'это','этого','этой','этот','этим','этом','как','или','для','что','года','год','были','если','при','после','между','также',
          'about','from','with','that','this','have','will','your','their','news'
        )
      LIMIT 60
    ),
    ARRAY[]::TEXT[]
  );
$$;

CREATE OR REPLACE FUNCTION public.refresh_related_news_links(p_news_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  base_keywords TEXT[];
BEGIN
  SELECT ARRAY(
    SELECT DISTINCT keyword
    FROM unnest(
      COALESCE(n.keywords, ARRAY[]::TEXT[])
      || public.extract_keywords(n.title || ' ' || COALESCE(n.description, '') || ' ' || regexp_replace(n.content, '<[^>]+>', ' ', 'g'))
    ) AS keyword
    WHERE keyword IS NOT NULL AND char_length(trim(keyword)) >= 2
  )
  INTO base_keywords
  FROM public.news n
  WHERE n.id = p_news_id;

  DELETE FROM public.news_related_links
  WHERE news_id = p_news_id
    AND source_type = 'auto';

  IF base_keywords IS NULL OR array_length(base_keywords, 1) IS NULL THEN
    RETURN;
  END IF;

  INSERT INTO public.news_related_links (news_id, related_news_id, source_type, score)
  SELECT
    p_news_id,
    candidate.id,
    'auto',
    cardinality(
      ARRAY(
        SELECT DISTINCT kw
        FROM unnest(candidate_keywords) AS kw
        INTERSECT
        SELECT DISTINCT bkw
        FROM unnest(base_keywords) AS bkw
      )
    ) * 10
    + CASE
      WHEN candidate.original_source IS NOT DISTINCT FROM base.original_source AND base.original_source IS NOT NULL THEN 5
      ELSE 0
    END
    + CASE
      WHEN candidate.source_author IS NOT DISTINCT FROM base.source_author AND base.source_author IS NOT NULL THEN 3
      ELSE 0
    END AS score
  FROM public.news base
  JOIN LATERAL (
    SELECT
      n.id,
      n.original_source,
      n.source_author,
      ARRAY(
        SELECT DISTINCT keyword
        FROM unnest(
          COALESCE(n.keywords, ARRAY[]::TEXT[])
          || public.extract_keywords(n.title || ' ' || COALESCE(n.description, '') || ' ' || regexp_replace(n.content, '<[^>]+>', ' ', 'g'))
        ) AS keyword
        WHERE keyword IS NOT NULL
      ) AS candidate_keywords
    FROM public.news n
    WHERE n.id <> p_news_id
      AND n.published = true
  ) candidate ON true
  WHERE base.id = p_news_id
    AND base.published = true
  ORDER BY score DESC, candidate.id
  LIMIT 5
  ON CONFLICT (news_id, related_news_id) DO UPDATE
  SET source_type = EXCLUDED.source_type,
      score = EXCLUDED.score,
      created_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION public.trg_refresh_related_news_links()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM public.refresh_related_news_links(NEW.id);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_refresh_related_news_links ON public.news;
CREATE TRIGGER trg_refresh_related_news_links
AFTER INSERT OR UPDATE OF title, description, content, keywords, original_source, source_author, published
ON public.news
FOR EACH ROW
EXECUTE FUNCTION public.trg_refresh_related_news_links();

CREATE OR REPLACE FUNCTION public.get_related_news(p_news_id UUID, p_limit INTEGER DEFAULT 5)
RETURNS TABLE (
  id UUID,
  slug TEXT,
  title TEXT,
  created_at TIMESTAMPTZ,
  image_url TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH manual_links AS (
    SELECT l.related_news_id, l.score, 0 AS priority
    FROM public.news_related_links l
    WHERE l.news_id = p_news_id AND l.source_type = 'manual'
  ),
  auto_links AS (
    SELECT l.related_news_id, l.score, 1 AS priority
    FROM public.news_related_links l
    WHERE l.news_id = p_news_id AND l.source_type = 'auto'
      AND NOT EXISTS (
        SELECT 1 FROM manual_links m WHERE m.related_news_id = l.related_news_id
      )
  ),
  selected_links AS (
    SELECT * FROM manual_links
    UNION ALL
    SELECT * FROM auto_links
  ),
  selected_news AS (
    SELECT n.id, n.slug, n.title, n.created_at, n.image_url, sl.priority, sl.score
    FROM selected_links sl
    JOIN public.news n ON n.id = sl.related_news_id
    WHERE n.published = true AND n.id <> p_news_id
  ),
  selected_count AS (
    SELECT count(*) AS cnt FROM selected_news
  ),
  fallback_news AS (
    SELECT n.id, n.slug, n.title, n.created_at, n.image_url, 9 AS priority, 0 AS score
    FROM public.news n
    CROSS JOIN selected_count sc
    WHERE n.published = true
      AND n.id <> p_news_id
      AND sc.cnt < p_limit
      AND NOT EXISTS (SELECT 1 FROM selected_news sn WHERE sn.id = n.id)
    ORDER BY n.created_at DESC
    LIMIT GREATEST(p_limit - (SELECT cnt FROM selected_count), 0)
  )
  SELECT id, slug, title, created_at, image_url
  FROM (
    SELECT id, slug, title, created_at, image_url, priority, score FROM selected_news
    UNION ALL
    SELECT id, slug, title, created_at, image_url, priority, score FROM fallback_news
  ) combined
  ORDER BY priority ASC, score DESC, created_at DESC
  LIMIT p_limit;
END;
$$;

CREATE OR REPLACE FUNCTION public.set_manual_related_news(p_news_id UUID, p_related_slugs TEXT[])
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can update manual related news';
  END IF;

  DELETE FROM public.news_related_links
  WHERE news_id = p_news_id
    AND source_type = 'manual';

  INSERT INTO public.news_related_links (news_id, related_news_id, source_type, score)
  SELECT p_news_id, n.id, 'manual', 1000
  FROM public.news n
  WHERE n.slug = ANY(COALESCE(p_related_slugs, ARRAY[]::TEXT[]))
    AND n.id <> p_news_id
    AND n.published = true
  ON CONFLICT (news_id, related_news_id) DO UPDATE
  SET source_type = 'manual', score = 1000, created_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION public.get_manual_related_news_slugs(p_news_id UUID)
RETURNS TEXT[]
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(array_agg(n.slug ORDER BY n.created_at DESC), ARRAY[]::TEXT[])
  FROM public.news_related_links l
  JOIN public.news n ON n.id = l.related_news_id
  WHERE l.news_id = p_news_id
    AND l.source_type = 'manual';
$$;
