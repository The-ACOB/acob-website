-- SQL Schema script for ACOB Admin CMS and Certificate Management System in Supabase

-- 1. Create site_content table for Realtime CMS live updates
CREATE TABLE IF NOT EXISTS public.site_content (
    key TEXT PRIMARY KEY,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Realtime on site_content table dynamically if not already added
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_rel pr 
        JOIN pg_publication p ON p.oid = pr.prpubid 
        JOIN pg_class c ON c.oid = pr.prrelid 
        WHERE p.pubname = 'supabase_realtime' AND c.relname = 'site_content'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.site_content;
    END IF;
END $$;

-- Enable Row Level Security (RLS)
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Allow public read access to site_content
DROP POLICY IF EXISTS "Allow public read access to site_content" ON public.site_content;
CREATE POLICY "Allow public read access to site_content" ON public.site_content
    FOR SELECT USING (true);

-- Allow public insert/update access for demo/passcode protected app
DROP POLICY IF EXISTS "Allow write access to site_content" ON public.site_content;
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

-- Enable Realtime on certificates table dynamically if not already added
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_rel pr 
        JOIN pg_publication p ON p.oid = pr.prpubid 
        JOIN pg_class c ON c.oid = pr.prrelid 
        WHERE p.pubname = 'supabase_realtime' AND c.relname = 'certificates'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.certificates;
    END IF;
END $$;

-- Enable Row Level Security (RLS)
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Allow public read access for verification
DROP POLICY IF EXISTS "Allow public read access to certificates" ON public.certificates;
CREATE POLICY "Allow public read access to certificates" ON public.certificates
    FOR SELECT USING (true);

-- Allow write access for admin issuing
DROP POLICY IF EXISTS "Allow write access to certificates" ON public.certificates;
CREATE POLICY "Allow write access to certificates" ON public.certificates
    FOR ALL USING (true);

-- Insert Initial Sample Certificate
INSERT INTO public.certificates (certificate_id, student_name, event_name, issue_date, achievement)
VALUES 
('ACOB-2026-98A1B', 'Tanvir Ahmed', 'National Olympiad 2026', '2026-07-20', 'Gold Medalist - Senior Category'),
('ACOB-2026-77F4C', 'Ayesha Rahman', 'Cognitive Science Challenge 2026', '2026-07-15', 'Champion - Junior Division')
ON CONFLICT (certificate_id) DO NOTHING;


-- 3. Create profiles table linked to Supabase Auth
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

-- Allow users to update their own profile
DROP POLICY IF EXISTS "Allow users to update their own profile" ON public.profiles;
CREATE POLICY "Allow users to update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Allow users to insert their own profile
DROP POLICY IF EXISTS "Allow users to insert their own profile" ON public.profiles;
CREATE POLICY "Allow users to insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Trigger to automatically create a profile row when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url, school, grade, phone)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'full_name', new.email),
        COALESCE(new.raw_user_meta_data->>'avatar_url', 'https://api.dicebear.com/7.x/initials/svg?seed=' || COALESCE(new.raw_user_meta_data->>'full_name', new.email)),
        COALESCE(new.raw_user_meta_data->>'school', 'Not specified'),
        COALESCE(new.raw_user_meta_data->>'grade', 'Not specified'),
        COALESCE(new.raw_user_meta_data->>'phone', '')
      );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger cleanly
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to automatically sync updates from auth.users (like full_name, avatar_url, school, grade, phone)
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

-- Create storage bucket for avatars if storage schema exists
-- (Note: In some local testing structures, storage might not be fully configured yet)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'storage' AND tablename = 'buckets') THEN
        INSERT INTO storage.buckets (id, name, public) 
        VALUES ('avatars', 'avatars', true)
        ON CONFLICT (id) DO NOTHING;

        -- RLS Policies on storage.objects for the avatars bucket
        DROP POLICY IF EXISTS "Allow public read access on avatars" ON storage.objects;
        CREATE POLICY "Allow public read access on avatars" ON storage.objects 
            FOR SELECT USING (bucket_id = 'avatars');

        DROP POLICY IF EXISTS "Allow authenticated upload to avatars" ON storage.objects;
        CREATE POLICY "Allow authenticated upload to avatars" ON storage.objects 
            FOR INSERT TO authenticated WITH CHECK (bucket_id = 'avatars');

        DROP POLICY IF EXISTS "Allow users to update their own avatar" ON storage.objects;
        CREATE POLICY "Allow users to update their own avatar" ON storage.objects 
            FOR UPDATE TO authenticated USING (bucket_id = 'avatars');
        DROP POLICY IF EXISTS "Allow users to delete their own avatar" ON storage.objects;
        CREATE POLICY "Allow users to delete their own avatar" ON storage.objects 
            FOR DELETE TO authenticated USING (bucket_id = 'avatars');
    END IF;
END $$;

-- Trigger to automatically confirm email upon signup
CREATE OR REPLACE FUNCTION public.auto_confirm_email()
RETURNS TRIGGER AS $$
BEGIN
    NEW.email_confirmed_at = now();
    NEW.confirmed_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate confirm trigger cleanly
DROP TRIGGER IF EXISTS on_auth_user_created_confirm ON auth.users;
CREATE TRIGGER on_auth_user_created_confirm
    BEFORE INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.auto_confirm_email();


