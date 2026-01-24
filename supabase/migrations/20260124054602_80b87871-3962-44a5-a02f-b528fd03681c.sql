-- Fix storage policy to allow anonymous uploads for contact form
-- The current policy doesn't work for unauthenticated users

DROP POLICY IF EXISTS "Anonymous can upload attachments" ON storage.objects;

-- Allow public uploads to the contact-attachments bucket (for contact form without auth)
-- This is safe because:
-- 1. File types are restricted to images only (configured in bucket settings)
-- 2. File size is limited to 5MB (configured in bucket settings)
-- 3. Viewing files requires admin role (separate policy)
CREATE POLICY "Public can upload attachments"
ON storage.objects FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'contact-attachments'
  AND (storage.foldername(name))[1] = 'submissions'
);