-- Fix CRITICAL: Deny public read access to contact_submissions
-- This prevents anonymous users from querying customer contact data

CREATE POLICY "Deny public read access to contact submissions"
ON public.contact_submissions
FOR SELECT
USING (false);