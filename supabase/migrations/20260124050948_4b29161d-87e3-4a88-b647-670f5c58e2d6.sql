-- Create storage bucket for contact form attachments
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'contact-attachments', 
  'contact-attachments', 
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic']
);

-- Allow anyone to upload to contact-attachments bucket
CREATE POLICY "Anyone can upload contact attachments"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'contact-attachments');

-- Allow anyone to view contact attachments
CREATE POLICY "Anyone can view contact attachments"
ON storage.objects FOR SELECT
USING (bucket_id = 'contact-attachments');

-- Add location columns to contact_submissions
ALTER TABLE public.contact_submissions 
ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS photo_url TEXT;