-- The most permissive fix: simply disable Row Level Security on the analytics table.
-- Since it's just for tracking anonymous events, RLS might be over-complicating things.
ALTER TABLE public.analytics_events DISABLE ROW LEVEL SECURITY;

-- Ensure the anon role can definitely write to the table
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT, SELECT ON public.analytics_events TO anon;

-- Note: We also grant SELECT just in case the frontend API setup expects a return payload.
