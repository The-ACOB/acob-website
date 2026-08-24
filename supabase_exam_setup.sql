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
    type TEXT NOT NULL, -- 'mcq' or 'broad'
    options JSONB, -- list of strings e.g. ["Option 1", "Option 2"] or null
    correct_option_index INTEGER, -- index of correct option for MCQs or null
    points INTEGER DEFAULT 1 NOT NULL,
    version TEXT DEFAULT 'both' NOT NULL, -- 'english', 'bangla', or 'both'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for exam_questions
ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow select access to exam_questions" ON public.exam_questions;
CREATE POLICY "Allow select access to exam_questions" ON public.exam_questions
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow write access to exam_questions" ON public.exam_questions;
CREATE POLICY "Allow write access to exam_questions" ON public.exam_questions
    FOR ALL USING (true) WITH CHECK (true);


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
    version_selected TEXT, -- 'english' or 'bangla'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for exam_submissions
ALTER TABLE public.exam_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow select access to exam_submissions" ON public.exam_submissions;
CREATE POLICY "Allow select access to exam_submissions" ON public.exam_submissions
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow write access to exam_submissions" ON public.exam_submissions;
CREATE POLICY "Allow write access to exam_submissions" ON public.exam_submissions
    FOR ALL USING (true) WITH CHECK (true);
