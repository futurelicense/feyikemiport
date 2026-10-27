-- Feyikemi Akinyelure portfolio activity counters.
-- Run once in the Supabase SQL editor. Safe to re-run.
--
-- Visits:    register_visit(is_new_visitor)   → total / monthly / unique visitors
-- Pages:     register_page_view(p_page)       → section views
-- Downloads: register_download(p_resource_id) → per-file download counts
-- Views:     register_view(p_content_id)      → handbook preview opens & publication link clicks
--
-- Tables are read-only to the public. All writes go through SECURITY DEFINER
-- functions that only accept known ids and only ever add 1.

CREATE TABLE IF NOT EXISTS public.site_stats (
  id TEXT PRIMARY KEY,
  total_visits BIGINT NOT NULL DEFAULT 0,
  monthly_visits BIGINT NOT NULL DEFAULT 0,
  unique_visitors BIGINT NOT NULL DEFAULT 0,
  page_views BIGINT NOT NULL DEFAULT 0,
  month_key TEXT NOT NULL DEFAULT to_char(now(), 'YYYY-MM'),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_stats TO anon, authenticated;
GRANT ALL ON public.site_stats TO service_role;
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view site stats" ON public.site_stats;
CREATE POLICY "Public can view site stats" ON public.site_stats
  FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS public.resource_downloads (
  resource_id TEXT PRIMARY KEY,
  download_count BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.resource_downloads TO anon, authenticated;
GRANT ALL ON public.resource_downloads TO service_role;
ALTER TABLE public.resource_downloads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view download counts" ON public.resource_downloads;
CREATE POLICY "Public can view download counts" ON public.resource_downloads
  FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS public.content_views (
  content_id TEXT PRIMARY KEY,
  view_count BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.content_views TO anon, authenticated;
GRANT ALL ON public.content_views TO service_role;
ALTER TABLE public.content_views ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view content views" ON public.content_views;
CREATE POLICY "Public can view content views" ON public.content_views
  FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.site_stats (id) VALUES ('global')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.resource_downloads (resource_id) VALUES
  ('handbook-sample')
ON CONFLICT (resource_id) DO NOTHING;

INSERT INTO public.content_views (content_id) VALUES
  ('handbook-preview'), ('handbook-amazon'), ('google-scholar'), ('press-references')
ON CONFLICT (content_id) DO NOTHING;

CREATE OR REPLACE FUNCTION public.register_visit(is_new_visitor BOOLEAN DEFAULT false)
RETURNS TABLE (total_visits BIGINT, monthly_visits BIGINT, unique_visitors BIGINT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_month TEXT := to_char(now(), 'YYYY-MM');
BEGIN
  UPDATE public.site_stats s
     SET total_visits = s.total_visits + 1,
         monthly_visits = CASE WHEN s.month_key = current_month THEN s.monthly_visits + 1 ELSE 1 END,
         month_key = current_month,
         unique_visitors = s.unique_visitors + CASE WHEN is_new_visitor THEN 1 ELSE 0 END,
         updated_at = now()
   WHERE s.id = 'global';

  RETURN QUERY
    SELECT s.total_visits, s.monthly_visits, s.unique_visitors
      FROM public.site_stats s WHERE s.id = 'global';
END;
$$;
GRANT EXECUTE ON FUNCTION public.register_visit(BOOLEAN) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.register_page_view(p_page TEXT)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count BIGINT;
BEGIN
  IF p_page IS NULL OR p_page <> ALL (ARRAY['home', 'experience', 'publications', 'free-template']) THEN
    RETURN 0;
  END IF;

  UPDATE public.site_stats s
     SET page_views = s.page_views + 1, updated_at = now()
   WHERE s.id = 'global'
   RETURNING s.page_views INTO new_count;

  RETURN COALESCE(new_count, 0);
END;
$$;
GRANT EXECUTE ON FUNCTION public.register_page_view(TEXT) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.register_download(p_resource_id TEXT)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count BIGINT;
BEGIN
  IF p_resource_id IS NULL OR p_resource_id <> ALL (ARRAY['handbook-sample']) THEN
    RETURN 0;
  END IF;

  INSERT INTO public.resource_downloads (resource_id, download_count, updated_at)
  VALUES (p_resource_id, 1, now())
  ON CONFLICT (resource_id)
  DO UPDATE SET
    download_count = public.resource_downloads.download_count + 1,
    updated_at = now()
  RETURNING download_count INTO new_count;

  RETURN COALESCE(new_count, 0);
END;
$$;
GRANT EXECUTE ON FUNCTION public.register_download(TEXT) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.register_view(p_content_id TEXT)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count BIGINT;
BEGIN
  IF p_content_id IS NULL OR p_content_id !~ '^(handbook-preview|handbook-amazon|google-scholar|press-references)$' THEN
    RETURN 0;
  END IF;

  INSERT INTO public.content_views (content_id, view_count, updated_at)
  VALUES (p_content_id, 1, now())
  ON CONFLICT (content_id)
  DO UPDATE SET
    view_count = public.content_views.view_count + 1,
    updated_at = now()
  RETURNING view_count INTO new_count;

  RETURN COALESCE(new_count, 0);
END;
$$;
GRANT EXECUTE ON FUNCTION public.register_view(TEXT) TO anon, authenticated;

-- Scheduled bump: adds downloads and views spread at random across the tracked items.
-- Called hourly by .github/workflows/increment-activity.yml (scripts/increment-activity.mjs).
-- Only the service role can call it; the public site never needs it.

CREATE OR REPLACE FUNCTION public.bump_activity_counts(
  p_downloads INTEGER DEFAULT 2,
  p_views INTEGER DEFAULT 2
)
RETURNS TABLE (downloads_added BIGINT, views_added BIGINT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  download_ids TEXT[] := ARRAY['handbook-sample'];
  view_ids TEXT[] := ARRAY[
    'handbook-preview', 'handbook-amazon', 'google-scholar', 'press-references'
  ];
  i INTEGER;
BEGIN
  p_downloads := LEAST(GREATEST(COALESCE(p_downloads, 2), 0), 10);
  p_views := LEAST(GREATEST(COALESCE(p_views, 2), 0), 10);

  FOR i IN 1..p_downloads LOOP
    PERFORM public.register_download(
      download_ids[1 + floor(random() * array_length(download_ids, 1))::int]
    );
  END LOOP;

  FOR i IN 1..p_views LOOP
    PERFORM public.register_view(
      view_ids[1 + floor(random() * array_length(view_ids, 1))::int]
    );
  END LOOP;

  RETURN QUERY SELECT p_downloads::BIGINT, p_views::BIGINT;
END;
$$;
REVOKE ALL ON FUNCTION public.bump_activity_counts(INTEGER, INTEGER) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.bump_activity_counts(INTEGER, INTEGER) TO service_role;
