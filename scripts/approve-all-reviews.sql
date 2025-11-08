-- Update all existing reviews to approved: true
UPDATE public.reviews
SET approved = true
WHERE approved = false OR approved IS NULL;

-- Verify the update
SELECT id, name, country, tour, approved, created_at
FROM public.reviews
ORDER BY created_at DESC;

