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
