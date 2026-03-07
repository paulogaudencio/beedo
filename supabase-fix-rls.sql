-- Drop the existing policy to avoid conflicts
DROP POLICY IF EXISTS "Allow anonymous inserts for analytics" ON public.analytics_events;

-- Ensure RLS is enabled
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Create the correct policy that explicitly allows the 'anon' role to insert
CREATE POLICY "Allow anonymous inserts for analytics" 
ON public.analytics_events 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Also ensure 'anon' has basic usage privileges on the schema and table
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON public.analytics_events TO anon;
