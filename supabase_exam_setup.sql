-- SQL Setup for Exam and Anti-Cheat System
-- Run this in the Supabase SQL Editor.

-- 1. Create exams table
CREATE TABLE IF NOT EXISTS public.exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id TEXT NOT NULL,
    title TEXT NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    is_live_for_admin_only BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for exams
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow select access to exams" ON public.exams;
CREATE POLICY "Allow select access to exams" ON public.exams
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow write access to exams" ON public.exams;
CREATE POLICY "Allow write access to exams" ON public.exams
    FOR ALL USING (true) WITH CHECK (true);


-- 2. Create exam_questions table
CREATE TABLE IF NOT EXISTS public.exam_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID REFERENCES public.exams(id) ON DELETE CASCADE NOT NULL,
    instruction TEXT,
    question_text TEXT NOT NULL,
    image_url TEXT, -- URL or Base64 of question picture / diagram
    type TEXT NOT NULL, -- 'mcq' or 'broad'
    options JSONB, -- list of strings e.g. ["Option 1", "Option 2"] or null
    correct_option_index INTEGER, -- index of correct option for MCQs or null
    points INTEGER DEFAULT 1 NOT NULL,
    version TEXT DEFAULT 'both', -- deprecated / optional
    requires_explanation BOOLEAN DEFAULT false NOT NULL,
    explanation_prompt TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Migration snippets to run if public.exam_questions already exists:
ALTER TABLE public.exam_questions 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS requires_explanation BOOLEAN DEFAULT false NOT NULL,
ADD COLUMN IF NOT EXISTS explanation_prompt TEXT;

-- Remove NOT NULL constraint from version column (language system removed)
ALTER TABLE public.exam_questions 
ALTER COLUMN version DROP NOT NULL;

-- Enable RLS for exam_questions
ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow select access to exam_questions" ON public.exam_questions;
CREATE POLICY "Allow select access to exam_questions" ON public.exam_questions
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow write access to exam_questions" ON public.exam_questions;
CREATE POLICY "Allow write access to exam_questions" ON public.exam_questions
    FOR ALL USING (true) WITH CHECK (true);

-- 2.1 Storage Bucket Setup for Exam Question Images
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'storage' AND tablename = 'buckets') THEN
        INSERT INTO storage.buckets (id, name, public) 
        VALUES ('exam-questions', 'exam-questions', true)
        ON CONFLICT (id) DO NOTHING;

        -- RLS Policies on storage.objects for the exam-questions bucket
        DROP POLICY IF EXISTS "Allow public read access on exam-questions" ON storage.objects;
        CREATE POLICY "Allow public read access on exam-questions" ON storage.objects 
            FOR SELECT USING (bucket_id = 'exam-questions');

        DROP POLICY IF EXISTS "Allow write access to exam-questions" ON storage.objects;
        CREATE POLICY "Allow write access to exam-questions" ON storage.objects 
            FOR ALL USING (bucket_id = 'exam-questions') WITH CHECK (bucket_id = 'exam-questions');
    END IF;
END $$;


-- 3. Create exam_submissions table
CREATE TABLE IF NOT EXISTS public.exam_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID REFERENCES public.exams(id) ON DELETE CASCADE NOT NULL,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    answers JSONB DEFAULT '{}'::jsonb NOT NULL, -- maps question_id to answer string/index
    started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE,
    time_taken INTEGER, -- duration in seconds
    status TEXT DEFAULT 'started' NOT NULL, -- 'started', 'submitted', 'disqualified'
    warnings_count INTEGER DEFAULT 0 NOT NULL,
    version_selected TEXT, -- optional / legacy
    custom_rank TEXT, -- custom assigned rank from admin panel (e.g. '1st', 'Champion')
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for exam_submissions
ALTER TABLE public.exam_submissions ENABLE ROW LEVEL SECURITY;

-- Migration snippets for exam_submissions
ALTER TABLE public.exam_submissions ALTER COLUMN version_selected DROP NOT NULL;
ALTER TABLE public.exam_submissions ADD COLUMN IF NOT EXISTS custom_rank TEXT;

DROP POLICY IF EXISTS "Allow select access to exam_submissions" ON public.exam_submissions;
CREATE POLICY "Allow select access to exam_submissions" ON public.exam_submissions
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow write access to exam_submissions" ON public.exam_submissions;
CREATE POLICY "Allow write access to exam_submissions" ON public.exam_submissions
    FOR ALL USING (true) WITH CHECK (true);

