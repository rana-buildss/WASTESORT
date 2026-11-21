-- Add read access required by the app's scan history view.
-- The existing scan table remains the only scan table; no duplicate is created.
-- This app has no user authentication, so scan metadata is shared with anon users.
ALTER TABLE public.waste_scans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read waste scans" ON public.waste_scans;
CREATE POLICY "Public read waste scans"
  ON public.waste_scans
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Reassert only the intended public capabilities. There are no public update/delete policies.
DROP POLICY IF EXISTS "Public read waste rules" ON public.waste_rules;
CREATE POLICY "Public read waste rules"
  ON public.waste_rules
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public read collection points" ON public.collection_points;
CREATE POLICY "Public read collection points"
  ON public.collection_points
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public anonymous insert scans" ON public.waste_scans;
CREATE POLICY "Public anonymous insert scans"
  ON public.waste_scans
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public anonymous insert feedback" ON public.user_feedback;
CREATE POLICY "Public anonymous insert feedback"
  ON public.user_feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
