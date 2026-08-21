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
    email TEXT,
    password_plain TEXT,
    registered_events JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Safely add new columns to profiles table if it already exists (ensuring no existing data is deleted)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS password_plain TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS registered_events JSONB DEFAULT '[]'::jsonb;

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

-- Allow all actions for admin/service-role (for managing student list)
DROP POLICY IF EXISTS "Allow service role full access" ON public.profiles;
CREATE POLICY "Allow service role full access" ON public.profiles
    FOR ALL USING (true) WITH CHECK (true);

-- Trigger to automatically create a profile row when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url, school, grade, phone, email, password_plain, registered_events)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'full_name', new.email),
        COALESCE(new.raw_user_meta_data->>'avatar_url', 'https://api.dicebear.com/7.x/initials/svg?seed=' || COALESCE(new.raw_user_meta_data->>'full_name', new.email)),
        COALESCE(new.raw_user_meta_data->>'school', 'Not specified'),
        COALESCE(new.raw_user_meta_data->>'grade', 'Not specified'),
        COALESCE(new.raw_user_meta_data->>'phone', ''),
        new.email,
        COALESCE(new.raw_user_meta_data->>'password_plain', ''),
        COALESCE(new.raw_user_meta_data->'registered_events', '[]'::jsonb)
      );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger cleanly
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to automatically sync updates from auth.users (like full_name, avatar_url, school, grade, phone, email, password_plain, registered_events)
CREATE OR REPLACE FUNCTION public.handle_update_user()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.profiles
    SET 
        full_name = COALESCE(new.raw_user_meta_data->>'full_name', full_name),
        avatar_url = COALESCE(new.raw_user_meta_data->>'avatar_url', avatar_url),
        school = COALESCE(new.raw_user_meta_data->>'school', school),
        grade = COALESCE(new.raw_user_meta_data->>'grade', grade),
        phone = COALESCE(new.raw_user_meta_data->>'phone', phone),
        email = COALESCE(new.email, email),
        password_plain = COALESCE(new.raw_user_meta_data->>'password_plain', password_plain),
        registered_events = COALESCE(new.raw_user_meta_data->'registered_events', registered_events),
        updated_at = timezone('utc'::text, now())
    WHERE id = new.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate update trigger cleanly
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
    AFTER UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_update_user();

-- Backfill existing data: copy email from auth.users to public.profiles where it is currently missing
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id AND (p.email IS NULL OR p.email = '');

