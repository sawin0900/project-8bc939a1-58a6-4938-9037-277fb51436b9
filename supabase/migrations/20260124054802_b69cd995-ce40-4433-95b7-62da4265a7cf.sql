-- Fix storage upload policy to target the correct Supabase roles
-- Using TO public may not match the anon role used by unauthenticated clients.

DROP POLICY IF EXISTS "Public can upload attachments" ON storage.objects;

CREATE POLICY "Anon can upload contact attachments"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (
  bucket_id = 'contact-attachments'
  AND (storage.foldername(name))[1] = 'submissions'
);

-- Optional: also allow authenticated users to upload (doesn't weaken security)
CREATE POLICY "Authenticated can upload contact attachments"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'contact-attachments'
  AND (storage.foldername(name))[1] = 'submissions'
);