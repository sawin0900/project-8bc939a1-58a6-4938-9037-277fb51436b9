
-- Create table for tracking page visits
CREATE TABLE public.page_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  visitor_id text NOT NULL,
  page_path text NOT NULL,
  referrer text,
  user_agent text,
  ip_address text,
  country text,
  city text,
  device_type text,
  browser text,
  os text,
  screen_width integer,
  screen_height integer,
  duration_seconds integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.page_visits ENABLE ROW LEVEL SECURITY;

-- Only admins can read analytics
CREATE POLICY "Admins can view page visits"
  ON public.page_visits
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Allow inserts from edge function (service role) - no public insert policy needed
-- Edge function uses service role key to insert

-- Create indexes for performance
CREATE INDEX idx_page_visits_created_at ON public.page_visits (created_at DESC);
CREATE INDEX idx_page_visits_visitor_id ON public.page_visits (visitor_id);
CREATE INDEX idx_page_visits_session_id ON public.page_visits (session_id);
CREATE INDEX idx_page_visits_page_path ON public.page_visits (page_path);
