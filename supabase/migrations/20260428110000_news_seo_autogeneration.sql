-- Auto-generate SEO fields for news on insert/update when they are not provided.
CREATE OR REPLACE FUNCTION public.generate_news_seo_fields()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  normalized_title TEXT;
  prepared_text TEXT;
  candidate_slug TEXT;
  slug_suffix INTEGER := 0;
BEGIN
  normalized_title := btrim(COALESCE(NEW.title, ''));

  IF normalized_title = '' THEN
    RAISE EXCEPTION 'News title cannot be empty';
  END IF;

  IF NEW.meta_title IS NULL OR btrim(NEW.meta_title) = '' THEN
    NEW.meta_title := normalized_title || ' | Центр Притяжения';
  END IF;

  IF NEW.meta_description IS NULL OR btrim(NEW.meta_description) = '' THEN
    prepared_text := COALESCE(NULLIF(btrim(NEW.description), ''), NEW.content, normalized_title);
    prepared_text := regexp_replace(prepared_text, '<[^>]+>', ' ', 'g');
    prepared_text := regexp_replace(prepared_text, '\s+', ' ', 'g');
    prepared_text := btrim(prepared_text);

    IF char_length(prepared_text) > 160 THEN
      NEW.meta_description := left(prepared_text, 157) || '...';
    ELSE
      NEW.meta_description := prepared_text;
    END IF;
  END IF;

  IF NEW.slug IS NULL OR btrim(NEW.slug) = '' THEN
    candidate_slug := lower(regexp_replace(normalized_title, '[^a-zA-Z0-9]+', '-', 'g'));
    candidate_slug := trim(both '-' FROM candidate_slug);
    IF candidate_slug = '' THEN
      candidate_slug := 'news';
    END IF;
    NEW.slug := left(candidate_slug, 80);
  END IF;

  candidate_slug := btrim(NEW.slug);
  IF candidate_slug = '' THEN
    candidate_slug := 'news';
  END IF;

  LOOP
    EXIT WHEN NOT EXISTS (
      SELECT 1
      FROM public.news n
      WHERE n.slug = candidate_slug
        AND (TG_OP = 'INSERT' OR n.id <> NEW.id)
    );

    slug_suffix := slug_suffix + 1;
    candidate_slug := left(NEW.slug, 75) || '-' || slug_suffix::TEXT;
  END LOOP;

  NEW.slug := candidate_slug;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_generate_news_seo_fields ON public.news;
CREATE TRIGGER trg_generate_news_seo_fields
BEFORE INSERT OR UPDATE ON public.news
FOR EACH ROW
EXECUTE FUNCTION public.generate_news_seo_fields();
