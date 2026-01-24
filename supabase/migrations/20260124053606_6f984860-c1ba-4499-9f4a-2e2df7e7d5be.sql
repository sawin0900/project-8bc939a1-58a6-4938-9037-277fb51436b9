-- Fix the broken rate limiting policy for contact_submissions
-- The current policy has cs.email = cs.email which is always TRUE (no rate limiting)

DROP POLICY IF EXISTS "Anyone can insert submissions with rate limit" ON public.contact_submissions;

-- Create fixed policy that properly references the NEW row being inserted
-- This uses a trigger-based approach since RLS policies can't directly reference NEW
CREATE OR REPLACE FUNCTION public.check_rate_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.contact_submissions cs
    WHERE cs.email = NEW.email
    AND cs.created_at > now() - interval '1 minute'
  ) THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please wait 1 minute before submitting again.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop existing trigger if exists and create new one
DROP TRIGGER IF EXISTS enforce_rate_limit ON public.contact_submissions;
CREATE TRIGGER enforce_rate_limit
  BEFORE INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.check_rate_limit();

-- Create a simple permissive INSERT policy for public access
CREATE POLICY "Anyone can insert submissions"
ON public.contact_submissions
FOR INSERT
TO public
WITH CHECK (true);