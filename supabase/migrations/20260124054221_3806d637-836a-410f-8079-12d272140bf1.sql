-- Fix storage bucket security: make private and update policies
UPDATE storage.buckets 
SET public = false 
WHERE id = 'contact-attachments';

-- Remove public policies on storage.objects
DROP POLICY IF EXISTS "Anyone can view contact attachments" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload contact attachments" ON storage.objects;

-- Allow anonymous uploads (for contact form without auth)
CREATE POLICY "Anonymous can upload attachments"
ON storage.objects FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'contact-attachments'
);

-- Only admins can view attachments
CREATE POLICY "Admins can view attachments"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'contact-attachments' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Admins can delete attachments
CREATE POLICY "Admins can delete attachments"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'contact-attachments' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Fix overly permissive RLS policy on contact_submissions
-- Add basic data validation at RLS level (in addition to trigger rate limiting)
DROP POLICY IF EXISTS "Anyone can insert submissions" ON public.contact_submissions;

CREATE POLICY "Public can insert valid submissions"
ON public.contact_submissions
FOR INSERT
TO public
WITH CHECK (
  -- Basic data validation at RLS level
  length(name) >= 2 AND length(name) <= 100
  AND length(email) <= 255
  AND (phone IS NULL OR (length(phone) >= 6 AND length(phone) <= 30))
  AND (message IS NULL OR length(message) <= 2000)
  AND (latitude IS NULL OR (latitude >= -90 AND latitude <= 90))
  AND (longitude IS NULL OR (longitude >= -180 AND longitude <= 180))
);