-- Refined SQL Schema script for ACOB Admin CMS and Certificate Management System in Supabase
-- This script updates policy definitions to explicitly include WITH CHECK constraints, fixing upsert issues.

-- 1. Create site_content table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.site_content (
    key TEXT PRIMARY KEY,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Allow public read access to site_content
DROP POLICY IF EXISTS "Allow public read access to site_content" ON public.site_content;
CREATE POLICY "Allow public read access to site_content" ON public.site_content
    FOR SELECT USING (true);

-- Allow write access (INSERT, UPDATE, DELETE) with both USING and WITH CHECK constraints to allow upserts
DROP POLICY IF EXISTS "Allow write access to site_content" ON public.site_content;
CREATE POLICY "Allow write access to site_content" ON public.site_content
    FOR ALL USING (true) WITH CHECK (true);


-- 2. Create certificates table if it doesn't exist
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

-- Enable Row Level Security (RLS)
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Allow public read access for verification
DROP POLICY IF EXISTS "Allow public read access to certificates" ON public.certificates;
CREATE POLICY "Allow public read access to certificates" ON public.certificates
    FOR SELECT USING (true);

-- Allow write access for admin issuing with both USING and WITH CHECK constraints
DROP POLICY IF EXISTS "Allow write access to certificates" ON public.certificates;
CREATE POLICY "Allow write access to certificates" ON public.certificates
    FOR ALL USING (true) WITH CHECK (true);


-- 3. Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    school TEXT,
    grade TEXT,
    avatar_url TEXT,
    phone TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow public read access to profiles
DROP POLICY IF EXISTS "Allow public read access to profiles" ON public.profiles;
CREATE POLICY "Allow public read access to profiles" ON public.profiles
    FOR SELECT USING (true);

-- Allow users to update/insert their own profile
DROP POLICY IF EXISTS "Allow users to update their own profile" ON public.profiles;
CREATE POLICY "Allow users to update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Allow users to insert their own profile" ON public.profiles;
CREATE POLICY "Allow users to insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);
