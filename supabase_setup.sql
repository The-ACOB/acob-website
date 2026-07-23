-- SQL Schema script for ACOB Admin CMS and Certificate Management System in Supabase

-- 1. Create site_content table for Realtime CMS live updates
CREATE TABLE IF NOT EXISTS public.site_content (
    key TEXT PRIMARY KEY,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Realtime on site_content table
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_content;

-- Enable Row Level Security (RLS)
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Allow public read access to site_content
CREATE POLICY "Allow public read access to site_content" ON public.site_content
    FOR SELECT USING (true);

-- Allow public insert/update access for demo/passcode protected app
CREATE POLICY "Allow write access to site_content" ON public.site_content
    FOR ALL USING (true);


-- 2. Create certificates table for Certificate Management & Verification
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificate_id TEXT UNIQUE NOT NULL,
    student_name TEXT NOT NULL,
    event_name TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    achievement TEXT NOT NULL,
    issue_by TEXT DEFAULT 'Applied Cognitio Olympiad Bangladesh',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Realtime on certificates table
ALTER PUBLICATION supabase_realtime ADD TABLE public.certificates;

-- Enable Row Level Security (RLS)
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Allow public read access for verification
CREATE POLICY "Allow public read access to certificates" ON public.certificates
    FOR SELECT USING (true);

-- Allow write access for admin issuing
CREATE POLICY "Allow write access to certificates" ON public.certificates
    FOR ALL USING (true);

-- Insert Initial Sample Certificate
INSERT INTO public.certificates (certificate_id, student_name, event_name, issue_date, achievement)
VALUES 
('ACOB-2026-98A1B', 'Tanvir Ahmed', 'National Olympiad 2026', '2026-07-20', 'Gold Medalist - Senior Category'),
('ACOB-2026-77F4C', 'Ayesha Rahman', 'Cognitive Science Challenge 2026', '2026-07-15', 'Champion - Junior Division')
ON CONFLICT (certificate_id) DO NOTHING;
