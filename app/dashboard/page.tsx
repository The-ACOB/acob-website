'use client';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/components/auth-provider';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, BookOpen, Award, Settings, Bell, ChevronRight, LogOut, 
  ShieldCheck, Trophy, CheckCircle, Camera, Calendar, ArrowRight,
  ExternalLink, Download, Sparkles, Lock, Key
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// Static resources definitions
const STUDENT_RESOURCES = [
  {
    category: 'Study Guides',
    items: [
      { title: 'ACOB Problem-Solving Framework', desc: 'Master the systematic approach to tackling complex problems.', type: 'PDF' },
      { title: 'Critical Thinking Workbook', desc: 'Develop analytical skills with curated exercises.', type: 'PDF' },
      { title: 'Past Papers Analysis 2023-2024', desc: 'Understand problem patterns and solution strategies.', type: 'PDF' },
    ]
  },
  {
    category: 'Video Tutorials',
    items: [
      { title: 'Getting Started with ACOB', desc: 'Introduction to the competition format and expectations.', type: 'Video' },
      { title: 'Time Management Strategies', desc: 'Excel in competitive exams with smart planning.', type: 'Video' },
      { title: 'Expert Tips & Tricks', desc: 'Learn secrets from ACOB winners.', type: 'Video' },
    ]
  },
  {
    category: 'Competition Resources',
    items: [
      { title: 'Sample Problems & Solutions', desc: 'Practice with actual ACOB-level problems.', type: 'Download' },
      { title: 'Competition Rules Handbook', desc: 'Complete guide to ACOB rules and regulations.', type: 'Download' },
      { title: 'Registration Checklist', desc: 'Everything you need before competition day.', type: 'Download' },
    ]
  }
];

// Mock Olympiads data
const UPCOMING_EVENTS = [
  {
    id: 'acob-2026',
    title: 'Applied Cognitio Olympiad 2026',
    date: 'August 28, 2026',
    category: 'National Olympiad',
    desc: 'The premier national competition testing logic, problem-solving, and cognitive capability.',
    syllabus: 'Logical deduction, pattern recognition, analytical word problems.'
  },
  {
    id: 'cog-sci-2026',
    title: 'Cognitive Science Challenge',
    date: 'September 15, 2026',
    category: 'Special Logic Event',
    desc: 'Focuses on neuroscience foundations, cognitive linguistics, and computational psychology puzzles.',
    syllabus: 'Intro to neuroanatomy, logical reasoning, AI & mental models.'
  }
];

// Sample questions for practice test
const PRACTICE_QUESTIONS = [
  {
    q: "If all A are B, and some B are C, which of the following MUST be true?",
    options: ["All A are C", "Some A are C", "Some B are A", "No A are C"],
    ans: 2
  },
  {
    q: "Select the missing number in the sequence: 2, 6, 12, 20, 30, ?",
    options: ["36", "40", "42", "48"],
    ans: 2
  },
  {
    q: "Five runners (P, Q, R, S, T) finish a race. P finishes before Q but after R. S finishes before T but after Q. Who finished last?",
    options: ["Q", "R", "S", "T"],
    ans: 3
  }
];

const parseEventsList = (regEvents: any): string[] => {
  if (!regEvents) return [];
  if (Array.isArray(regEvents)) return regEvents;
  if (typeof regEvents === 'string') {
    try {
      const parsed = JSON.parse(regEvents);
      if (Array.isArray(parsed)) return parsed;
      if (parsed && Array.isArray(parsed.events)) return parsed.events;
    } catch (e) {
      return [regEvents];
    }
  }
  if (typeof regEvents === 'object') {
    if (Array.isArray(regEvents.events)) return regEvents.events;
    return Object.values(regEvents).filter(v => typeof v === 'string') as string[];
  }
  return [];
};

export default function DashboardPage() {
  const { user, signOut, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'certificates' | 'resources' | 'settings' | 'exams'>('overview');
  
  // Profile settings state
  const [displayName, setDisplayName] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Security credentials state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Dynamic user data states
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loadingCerts, setLoadingCerts] = useState(true);
  const [events, setEvents] = useState<any[]>(UPCOMING_EVENTS);

  // Exams states
  const [examsList, setExamsList] = useState<any[]>([]);
  const [userSubmissions, setUserSubmissions] = useState<any[]>([]);
  const [allSubmissions, setAllSubmissions] = useState<any[]>([]);
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [loadingExams, setLoadingExams] = useState(false);
  const [activeExam, setActiveExam] = useState<any | null>(null);
  const [showPreExamModal, setShowPreExamModal] = useState(false);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [examQuestions, setExamQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [warningCount, setWarningCount] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isDisqualified, setIsDisqualified] = useState(false);

  // Anti-cheat refs and states
  const [fullscreenExits, setFullscreenExits] = useState(0);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningType, setWarningType] = useState<'fullscreen' | 'tab' | null>(null);
  const [examStartTime, setExamStartTime] = useState<number>(0);

  const answersRef = useRef(answers);
  const fullscreenExitsRef = useRef(0);
  const tabSwitchesRef = useRef(0);
  const isDisqualifiedRef = useRef(false);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const submitExamResults = async (
    status: 'submitted' | 'disqualified',
    finalAnswers = answersRef.current,
    finalWarnings = (fullscreenExitsRef.current + tabSwitchesRef.current)
  ) => {
    if (!user || !activeExam || isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    
    // Exit full screen if active
    if (document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).mozFullScreenElement || (document as any).msFullscreenElement) {
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          await (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      } catch (err) {
        console.warn('Error exiting fullscreen:', err);
      }
    }
    
    // Calculate time taken
    const timeTaken = Math.max(0, Math.floor((Date.now() - examStartTime) / 1000));
    
    try {
      const { isSupabaseConfigured, supabase } = await import('@/lib/supabase');
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('exam_submissions').insert({
          exam_id: activeExam.id,
          student_id: user.id,
          answers: finalAnswers,
          status,
          warnings_count: finalWarnings,
          time_taken: timeTaken,
          version_selected: null,
          submitted_at: new Date().toISOString()
        });
        if (error) throw error;
      } else {
        const localSubsKey = `acob_local_submissions_${user.id}`;
        const existing = localStorage.getItem(localSubsKey);
        const list = existing ? JSON.parse(existing) : [];
        const newSub = {
          id: crypto.randomUUID?.() || Math.random().toString(),
          exam_id: activeExam.id,
          student_id: user.id,
          answers: finalAnswers,
          status,
          warnings_count: finalWarnings,
          time_taken: timeTaken,
          version_selected: null,
          submitted_at: new Date().toISOString()
        };
        list.push(newSub);
        localStorage.setItem(localSubsKey, JSON.stringify(list));
      }
    } catch (e) {
      console.error('Error submitting exam:', e);
    }
    
    // Refresh student exams lists
    await fetchStudentExams();
    
    // Reset state
    setIsExamStarted(false);
    setActiveExam(null);
    setShowWarningModal(false);
    setWarningType(null);
    isSubmittingRef.current = false;
  };


  // Keep refs updated for warning count and status
  useEffect(() => {
    isDisqualifiedRef.current = isDisqualified;
  }, [isDisqualified]);

  // Anti-cheat detection useEffect
  useEffect(() => {
    if (!isExamStarted || !activeExam) return;

    // Handle full screen state change
    const handleFullscreenChange = () => {
      if (isSubmittingRef.current) return;
      const isFullScreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );

      if (!isFullScreen && !isDisqualifiedRef.current) {
        // User exited fullscreen!
        const next = fullscreenExitsRef.current + 1;
        fullscreenExitsRef.current = next;
        setFullscreenExits(next);
        setWarningCount(next + tabSwitchesRef.current);
        
        if (next >= 2) {
          isDisqualifiedRef.current = true;
          setIsDisqualified(true);
          submitExamResults('disqualified', answersRef.current, next + tabSwitchesRef.current);
        } else {
          setWarningType('fullscreen');
          setShowWarningModal(true);
        }
      }
    };

    // Handle visibility/focus change
    const handleVisibilityChange = () => {
      if (isSubmittingRef.current) return;
      if (document.hidden && !isDisqualifiedRef.current) {
        const next = tabSwitchesRef.current + 1;
        tabSwitchesRef.current = next;
        setTabSwitches(next);
        setWarningCount(fullscreenExitsRef.current + next);
        
        if (next >= 2) {
          isDisqualifiedRef.current = true;
          setIsDisqualified(true);
          submitExamResults('disqualified', answersRef.current, fullscreenExitsRef.current + next);
        } else {
          setWarningType('tab');
          setShowWarningModal(true);
        }
      }
    };

    const handleWindowBlur = () => {
      if (isSubmittingRef.current) return;
      if (!document.hasFocus() && !isDisqualifiedRef.current) {
        const next = tabSwitchesRef.current + 1;
        tabSwitchesRef.current = next;
        setTabSwitches(next);
        setWarningCount(fullscreenExitsRef.current + next);
        
        if (next >= 2) {
          isDisqualifiedRef.current = true;
          setIsDisqualified(true);
          submitExamResults('disqualified', answersRef.current, fullscreenExitsRef.current + next);
        } else {
          setWarningType('tab');
          setShowWarningModal(true);
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [isExamStarted, activeExam]);

  // Countdown Timer ticking
  useEffect(() => {
    if (!isExamStarted || !activeExam) return;

    const durationSeconds = (activeExam.duration || 60) * 60;

    const updateTimer = () => {
      const secondsElapsed = Math.floor((Date.now() - examStartTime) / 1000);
      const endLimitSeconds = Math.max(0, Math.floor((new Date(activeExam.end_date).getTime() - Date.now()) / 1000));
      const totalSeconds = Math.min(Math.max(0, durationSeconds - secondsElapsed), endLimitSeconds);
      setElapsedTime(totalSeconds);

      if (totalSeconds <= 0) {
        // Time expired! Auto submit
        submitExamResults('submitted', answersRef.current, fullscreenExitsRef.current + tabSwitchesRef.current);
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [isExamStarted, activeExam, examStartTime]);


  // Load Dynamic Upcoming Events
  useEffect(() => {
    async function fetchEvents() {
      const { isSupabaseConfigured, supabase } = await import('@/lib/supabase');
      if (isSupabaseConfigured()) {
        try {
          const { data } = await supabase.from('site_content').select('*').eq('key', 'upcoming_events').single();
          if (data && data.content && Array.isArray(data.content.events)) {
            setEvents(data.content.events);
          }
        } catch (e) {
          console.warn('Error fetching events:', e);
        }
      } else if (typeof window !== 'undefined') {
        const local = localStorage.getItem('acob_local_events');
        if (local) setEvents(JSON.parse(local));
      }
    }
    fetchEvents();
  }, []);

  // Quiz Modal state
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  // Admit Card Modal state
  const [admitCardEvent, setAdmitCardEvent] = useState<any | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('reset') === 'true') {
        setActiveTab('settings');
        setMessage('Reset link verified. Please enter a new password below.');
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      setDisplayName(user.user_metadata?.full_name || '');
      setSchool(user.user_metadata?.school || 'Not specified');
      setGrade(user.user_metadata?.grade || 'Not specified');
      setPhone(user.user_metadata?.phone || '');
      setAvatarUrl(user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.user_metadata?.full_name || user.email || '')}`);
      
      const fetchProfileEvents = async () => {
        const { isSupabaseConfigured, supabase } = await import('@/lib/supabase');
        if (isSupabaseConfigured()) {
          try {
            const { data } = await supabase
              .from('profiles')
              .select('registered_events')
              .eq('id', user.id)
              .single();
            if (data && data.registered_events) {
              const list = parseEventsList(data.registered_events);
              setRegisteredEvents(list);
              return;
            }
          } catch (e) {
            console.warn('Error loading registered events from profile:', e);
          }
        }
        setRegisteredEvents(user.user_metadata?.registered_events || []);
      };

      fetchProfileEvents();
    }
  }, [user]);

  const fetchStudentExams = async () => {
    if (!user) return;
    setLoadingExams(true);
    try {
      const { isSupabaseConfigured, supabase } = await import('@/lib/supabase');
      if (isSupabaseConfigured()) {
        const { data: examsData } = await supabase.from('exams').select('*');
        if (examsData) setExamsList(examsData);
        
        const { data: subsData } = await supabase
          .from('exam_submissions')
          .select('*')
          .eq('student_id', user.id);
        if (subsData) setUserSubmissions(subsData);

        const { data: allSubsData } = await supabase.from('exam_submissions').select('*');
        if (allSubsData) setAllSubmissions(allSubsData);

        const { data: allQuestData } = await supabase.from('exam_questions').select('*');
        if (allQuestData) setAllQuestions(allQuestData);
      } else {
        const localExams = localStorage.getItem('acob_local_exams');
        const exams = localExams ? JSON.parse(localExams) : [];
        setExamsList(exams);
        
        const localSubs = localStorage.getItem(`acob_local_submissions_${user.id}`);
        if (localSubs) setUserSubmissions(localSubs ? JSON.parse(localSubs) : []);

        const allLocalSubs: any[] = [];
        const localStudents = localStorage.getItem('acob_student_profiles');
        const studs = localStudents ? JSON.parse(localStudents) : [];
        studs.forEach((s: any) => {
          const local = localStorage.getItem(`acob_local_submissions_${s.id}`);
          if (local) allLocalSubs.push(...JSON.parse(local));
        });
        setAllSubmissions(allLocalSubs);

        const allLocalQuestions: any[] = [];
        exams.forEach((ex: any) => {
          const localQ = localStorage.getItem(`acob_local_questions_${ex.id}`);
          if (localQ) allLocalQuestions.push(...JSON.parse(localQ));
        });
        setAllQuestions(allLocalQuestions);
      }
    } catch (e) {
      console.warn('Error loading exams:', e);
    } finally {
      setLoadingExams(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStudentExams();
    }
  }, [user]);

  const getExamResultStats = (examId: string) => {
    if (!user) return null;
    const submission = userSubmissions.find(s => s.exam_id === examId);
    if (!submission) return null;

    const examQuestions = allQuestions.filter(q => q.exam_id === examId);
    let score = 0;
    let totalPoints = 0;
    
    examQuestions.forEach(q => {
      if (q.type === 'mcq') {
        totalPoints += q.points;
        if (submission.answers && submission.answers[q.id] === q.correct_option_index) {
          score += q.points;
        }
      } else {
        totalPoints += q.points;
      }
    });

    // Calculate position/rank
    const examSubmissions = allSubmissions.filter(s => s.exam_id === examId && s.status === 'submitted');
    
    const scoredSubmissions = examSubmissions.map(s => {
      let subScore = 0;
      examQuestions.forEach(q => {
        if (q.type === 'mcq') {
          if (s.answers && s.answers[q.id] === q.correct_option_index) {
            subScore += q.points;
          }
        }
      });
      return {
        studentId: s.student_id,
        score: subScore,
        timeTaken: s.time_taken || 999999
      };
    });

    // Sort by score desc, timeTaken asc
    scoredSubmissions.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeTaken - b.timeTaken;
    });

    const index = scoredSubmissions.findIndex(s => s.studentId === user.id);
    let rankText = '-';
    if (index !== -1 && submission.status === 'submitted') {
      const rank = index + 1;
      if (rank === 1) rankText = '1st';
      else if (rank === 2) rankText = '2nd';
      else if (rank === 3) rankText = '3rd';
      else rankText = `${rank}th`;
    }

    return {
      score,
      totalPoints,
      rankText
    };
  };

  // Load Certificates and Filter dynamically
  useEffect(() => {
    async function loadCertificates() {
      if (!user) return;
      try {
        const { getAllCertificates } = await import('@/lib/supabase');
        const allCerts = await getAllCertificates();
        
        // Filter certificates dynamically matching displayName or metadata.email
        const userFullName = (displayName || user.user_metadata?.full_name || '').toLowerCase().trim();
        const userEmail = (user.email || '').toLowerCase().trim();

        const filtered = allCerts.filter((cert: any) => {
          const certStudent = (cert.student_name || '').toLowerCase().trim();
          const matchesName = userFullName && certStudent && (certStudent.includes(userFullName) || userFullName.includes(certStudent));
          const matchesEmail = cert.metadata?.email ? (cert.metadata.email.toLowerCase().trim() === userEmail) : false;
          return matchesName || matchesEmail;
        });

        setCertificates(filtered);
      } catch (err) {
        console.error('Error fetching certificates:', err);
      } finally {
        setLoadingCerts(false);
      }
    }
    loadCertificates();
  }, [user, displayName]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white px-4 text-center">
        <Trophy size={64} className="text-purple-500 mb-6 animate-pulse" />
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Access Denied</h1>
        <p className="text-neutral-400 max-w-md mb-6">
          Please log in or sign up to view your academic dashboard and track your certifications.
        </p>
        <Link 
          href="/" 
          className="rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  const handleRegisterEvent = async (eventId: string) => {
    if (registeredEvents.includes(eventId)) return;
    
    const event = events.find(e => e.id === eventId);
    const eventTitle = event ? event.title : 'this event';
    const confirmed = window.confirm(`Are you sure you want to register for "${eventTitle}"?`);
    if (!confirmed) return;

    const updatedEvents = [...registeredEvents, eventId];
    setRegisteredEvents(updatedEvents);
    setMessage(null);

    const localSession = localStorage.getItem('acob_mock_session');
    if (localSession) {
      const parsed = JSON.parse(localSession);
      parsed.user.user_metadata = {
        ...parsed.user.user_metadata,
        registered_events: updatedEvents,
      };
      localStorage.setItem('acob_mock_session', JSON.stringify(parsed));
      setMessage('Successfully registered for the event!');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          registered_events: updatedEvents,
        }
      });
      if (error) throw error;

      // Update profiles table directly for immediate consistency
      const { error: dbError } = await supabase
        .from('profiles')
        .update({
          registered_events: updatedEvents,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      if (dbError) throw dbError;

      setMessage('Successfully registered for the event!');
    } catch (err: any) {
      setMessage(err.message || 'Error registering for event.');
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setMessage(null);

    const localSession = localStorage.getItem('acob_mock_session');
    if (localSession) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setAvatarUrl(base64data);
        
        const parsed = JSON.parse(localSession);
        parsed.user.user_metadata = {
          ...parsed.user.user_metadata,
          avatar_url: base64data,
        };
        localStorage.setItem('acob_mock_session', JSON.stringify(parsed));
        setMessage('Profile photo updated locally!');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);

      const { error: authError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });
      if (authError) throw authError;

      const { error: dbError } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      if (dbError) throw dbError;

      setMessage('Profile photo updated successfully!');
    } catch (err: any) {
      setMessage(err.message || 'Error uploading profile photo.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const localSession = localStorage.getItem('acob_mock_session');
    if (localSession) {
      const parsed = JSON.parse(localSession);
      parsed.user.user_metadata = {
        ...parsed.user.user_metadata,
        full_name: displayName,
        school,
        grade,
        phone,
      };
      localStorage.setItem('acob_mock_session', JSON.stringify(parsed));
      setMessage('Profile updated successfully!');
      setIsSaving(false);
      return;
    }

    try {
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: displayName,
          school,
          grade,
          phone,
        }
      });
      if (authError) throw authError;

      const { error: dbError } = await supabase
        .from('profiles')
        .update({
          full_name: displayName,
          school,
          grade,
          phone,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
      if (dbError) throw dbError;

      setMessage('Profile updated successfully!');
    } catch (err: any) {
      setMessage(err.message || 'Error updating profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters.');
      return;
    }

    setIsChangingPassword(true);
    setMessage(null);

    const localSession = localStorage.getItem('acob_mock_session');
    if (localSession) {
      setMessage('Password updated successfully (Mock)!');
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      return;
    }

    try {
      // 1. Verify current password by trying to re-authenticate
      const { error: reauthError } = await supabase.auth.signInWithPassword({
        email: user.email!,
        password: currentPassword,
      });

      if (reauthError) {
        throw new Error('Current password is incorrect. Verification failed.');
      }

      // 2. Perform actual password update
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
        data: {
          password_plain: newPassword
        }
      });
      if (updateError) throw updateError;

      setMessage('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setMessage(err.message || 'Error updating password.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const calculateQuizScore = () => {
    let score = 0;
    PRACTICE_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.ans) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-6">
          {/* User Bio Card */}
          <div className="rounded-3xl border border-white/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6 backdrop-blur-xl">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4 group cursor-pointer">
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="h-20 w-20 rounded-full border-2 border-purple-500/50 p-1 object-cover bg-neutral-900 transition-all duration-300 group-hover:opacity-75"
                />
                <label className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <Camera size={18} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
                  </div>
                )}
                <span className="absolute bottom-1 right-1 flex h-4 w-4 rounded-full bg-emerald-500 border-2 border-black" />
              </div>
              <h3 className="font-bold text-lg">{displayName || 'User'}</h3>
              <p className="text-xs text-neutral-500 mt-0.5">{user.email}</p>
              <span className="mt-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Cognitio Member
              </span>
            </div>

            <div className="mt-6 space-y-3 pt-6 border-t border-white/5 text-xs text-neutral-400">
              <div className="flex justify-between">
                <span>School:</span>
                <span className="font-semibold text-white truncate max-w-[150px]">{school}</span>
              </div>
              <div className="flex justify-between">
                <span>Grade/Level:</span>
                <span className="font-semibold text-white">{grade}</span>
              </div>
              {phone && (
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <span className="font-semibold text-white">{phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="rounded-3xl border border-white/5 bg-neutral-950 p-3 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === 'overview' 
                  ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Trophy size={18} />
              Overview
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === 'events' 
                  ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar size={18} />
              My Registered Events
            </button>

            <button
              onClick={() => {
                setActiveTab('exams');
                fetchStudentExams();
              }}
              className={`flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === 'exams' 
                  ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck size={18} />
              My Exams
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === 'certificates' 
                  ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Award size={18} />
              My Certificates
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === 'resources' 
                  ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen size={18} />
              Study Resources
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === 'settings' 
                  ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings size={18} />
              Settings
            </button>

            <button
              onClick={signOut}
              className="flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-red-400 hover:bg-red-500/5 transition-all"
            >
              <LogOut size={18} />
              Log Out
            </button>
          </div>
        </div>

        {/* Dashboard Panels */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* OVERVIEW PANEL */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Header Greeting */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                    Academic Center
                  </h1>
                  <p className="text-neutral-400 text-sm mt-1">
                    Welcome back, {displayName || 'Cognitive Challenger'}. Secure your registration and start training.
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-2.5 text-xs text-neutral-400">
                  <ShieldCheck size={16} className="text-cyan-400" />
                  <span>Account Verified</span>
                </div>
              </div>

              {/* Status Message */}
              {message && (
                <div className="flex items-center gap-2.5 rounded-2xl border border-purple-500/10 bg-purple-500/[0.03] p-4 text-sm text-purple-400 animate-fadeIn">
                  <CheckCircle size={16} />
                  <span>{message}</span>
                </div>
              )}

              {/* Upcoming events lists with Interactive functions */}
              <h2 className="text-xl font-bold tracking-tight mt-6">Upcoming Events & Olympiads</h2>
              
              <div className="space-y-6">
                {events.map((event) => {
                  const isRegistered = registeredEvents.includes(event.id);
                  return (
                    <div key={event.id} className="rounded-3xl border border-white/5 bg-neutral-950 p-6 relative overflow-hidden transition-all hover:border-white/10 duration-300">
                      <div className="absolute top-0 right-0 h-32 w-32 bg-purple-500/5 rounded-full blur-2xl" />
                      
                      <div className="flex flex-wrap justify-between items-start gap-4">
                        <div>
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            isRegistered 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                              : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          }`}>
                            {isRegistered ? 'Enrolled & Confirmed' : 'Registration Open'}
                          </span>
                          <h3 className="font-extrabold text-xl mt-3">{event.title}</h3>
                          <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-xl">{event.desc}</p>
                          
                          <div className="mt-3 bg-white/[0.02] border border-white/5 rounded-xl p-3 text-xs max-w-lg">
                            <span className="text-neutral-500 font-semibold uppercase tracking-wider block text-[9px] mb-1">Exam Syllabus</span>
                            <span className="text-neutral-300 font-light">{event.syllabus}</span>
                          </div>
                        </div>

                        <div className="text-right text-xs">
                          <span className="text-neutral-500 block">Scheduled Date</span>
                          <span className="font-bold text-white text-sm block mt-0.5">{event.date}</span>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-3 items-center justify-end">
                        
                        {!isRegistered ? (
                          <button
                            onClick={() => handleRegisterEvent(event.id)}
                            className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-purple-500 active:scale-[0.98]"
                          >
                            Register for Event
                            <ArrowRight size={14} />
                          </button>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => setAdmitCardEvent(event)}
                              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold hover:bg-white/[0.08] transition-all"
                            >
                              <Download size={13} />
                              Admit Card
                            </button>
                            <a
                              href="https://chat.whatsapp.com/FXYZHLCVpL11W0K9dDPa1i"
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/10 transition-all"
                            >
                              <ExternalLink size={13} />
                              WhatsApp Group
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* REGISTERED EVENTS PANEL */}
          {activeTab === 'events' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">My Enrolled Events</h2>
              
              {registeredEvents.length === 0 ? (
                <div className="rounded-3xl border border-white/5 bg-neutral-950 p-12 text-center">
                  <Calendar size={48} className="mx-auto text-neutral-600 mb-4" />
                  <h3 className="font-bold text-lg text-white">No enrolled events</h3>
                  <p className="text-neutral-500 text-sm max-w-sm mx-auto mt-1">
                    You have not registered for any events yet. Head to the Overview tab to view and sign up for upcoming Olympiads.
                  </p>
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className="mt-5 rounded-2xl bg-purple-600 px-6 py-2.5 text-xs font-semibold text-white transition-all hover:bg-purple-500"
                  >
                    View Olympiads
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {events.filter(e => registeredEvents.includes(e.id)).map((event) => (
                    <div key={event.id} className="rounded-3xl border border-white/5 bg-neutral-950 p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 h-24 w-24 bg-cyan-500/5 rounded-full blur-xl" />
                      <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {event.category}
                      </span>
                      <h3 className="font-bold text-lg mt-3">{event.title}</h3>
                      <p className="text-neutral-400 text-xs mt-1">{event.desc}</p>
                      
                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-neutral-500">Date:</span>
                        <span className="font-semibold text-white">{event.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* DYNAMIC CERTIFICATES PANEL */}
          {activeTab === 'certificates' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">My Awards & Certificates</h2>
              
              {loadingCerts ? (
                <div className="py-12 text-center text-sm text-neutral-500 flex justify-center items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
                  <span>Loading certificates database...</span>
                </div>
              ) : certificates.length === 0 ? (
                <div className="rounded-3xl border border-white/5 bg-neutral-950 p-12 text-center">
                  <Award size={48} className="mx-auto text-neutral-600 mb-4" />
                  <h3 className="font-bold text-lg text-white">No certificates issued</h3>
                  <p className="text-neutral-500 text-sm max-w-sm mx-auto mt-1">
                    No certificates issued to name "{displayName || user.user_metadata?.full_name}" yet. Certificates are issued automatically upon exam completion.
                  </p>
                  <p className="text-[10px] text-neutral-600 mt-2">
                    Tip: Make sure your Profile Display Name matches the name registered for your exams to automatically link credentials.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {certificates.map((cert) => (
                    <div key={cert.id || cert.certificate_id} className="rounded-3xl border border-white/5 bg-neutral-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-2xl bg-amber-500/10 p-3 border border-amber-500/20 text-amber-500">
                          <Trophy size={28} />
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-base">{cert.event_name} Certificate</h3>
                          <p className="text-xs text-neutral-400 mt-0.5">ID: {cert.certificate_id} • {cert.achievement}</p>
                          <span className="text-[10px] text-neutral-500 block mt-1">Issued Date: {cert.issue_date}</span>
                        </div>
                      </div>
                      <Link
                        href={`/verify?id=${cert.certificate_id}`}
                        className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold hover:bg-white/[0.08] transition-all"
                      >
                        Verify Certificate
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* DASHBOARD RESOURCES TAB */}
          {activeTab === 'resources' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold">Preparation & Study Resources</h2>
                <p className="text-neutral-400 text-xs mt-1">Exclusive study resources, video sessions and downloadables for registered members.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {STUDENT_RESOURCES.map((category) => (
                  <div key={category.category} className="space-y-4">
                    <h3 className="text-xs font-bold font-mono tracking-wider text-neutral-500 uppercase px-1">
                      {category.category}
                    </h3>
                    <div className="space-y-3">
                      {category.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="group p-4 rounded-2xl bg-neutral-950 border border-white/5 hover:border-purple-500/20 transition-all duration-300"
                        >
                          <div className="flex justify-between items-start gap-3">
                            <div>
                              <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                                {item.type}
                              </span>
                              <h4 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                                {item.title}
                              </h4>
                              <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                            <button className="rounded-lg bg-neutral-900 border border-white/5 p-1 text-neutral-400 group-hover:text-cyan-400 transition-all shrink-0">
                              <Download size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SETTINGS PANEL */}
          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">Profile Settings</h2>
              
              {message && (
                <div className="flex items-center gap-2.5 rounded-2xl border border-purple-500/10 bg-purple-500/[0.03] p-4 text-sm text-purple-400">
                  <CheckCircle size={16} />
                  <span>{message}</span>
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="rounded-3xl border border-white/5 bg-neutral-950 p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-400">Display Name</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-3 px-4 text-sm text-white placeholder-neutral-600 outline-none focus:border-purple-500/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-400">Email Address (Read-only)</label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full rounded-2xl border border-white/5 bg-white/[0.01] py-3 px-4 text-sm text-neutral-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-400">School / Institution</label>
                    <input
                      type="text"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-3 px-4 text-sm text-white placeholder-neutral-600 outline-none focus:border-purple-500/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-400">Grade / Category</label>
                    <input
                      type="text"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-3 px-4 text-sm text-white placeholder-neutral-600 outline-none focus:border-purple-500/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-400">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-3 px-4 text-sm text-white placeholder-neutral-600 outline-none focus:border-purple-500/30"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 rounded-2xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-purple-500 active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSaving ? 'Saving Changes...' : 'Save Settings'}
                  </button>
                </div>
              </form>

              {/* SECURITY / UPDATE PASSWORD (WITH CURRENT PASSWORD CHECK) */}
              <h2 className="text-2xl font-bold pt-6 border-t border-white/5">Security Settings</h2>
              <form onSubmit={handleChangePassword} className="rounded-3xl border border-white/5 bg-neutral-950 p-6 space-y-4">
                
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-400">Current Password</label>
                  <div className="relative">
                    <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="password"
                      placeholder="Enter current password to verify identity"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-600 outline-none focus:border-purple-500/30"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-400">New Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-600 outline-none focus:border-purple-500/30"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-400">Confirm New Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-600 outline-none focus:border-purple-500/30"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="flex items-center gap-2 rounded-2xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-purple-500 active:scale-[0.98] disabled:opacity-50"
                  >
                    {isChangingPassword ? 'Updating Password...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* EXAMS PANEL */}
          {activeTab === 'exams' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                    Olympiad Exams
                  </h1>
                  <p className="text-neutral-400 text-sm mt-1">
                    Access and participate in live Olympiad exams for your registered courses.
                  </p>
                </div>
              </div>

              {loadingExams ? (
                <div className="py-12 flex justify-center">
                  <span className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
                </div>
              ) : (
                <div className="space-y-4">
                  {examsList.filter(exam => {
                    if (exam.is_live_for_admin_only && user?.email !== 'khanjariff09@gmail.com') {
                      return false;
                    }
                    return user?.email === 'khanjariff09@gmail.com' || registeredEvents.includes(exam.event_id);
                  }).length === 0 ? (
                    <div className="rounded-3xl border border-white/5 bg-neutral-950 p-8 text-center text-neutral-400">
                      <p className="text-sm">No live or scheduled exams found for your registered Olympiad events.</p>
                      <p className="text-xs text-neutral-600 mt-1">Please register for upcoming events from the Overview panel to access associated exams.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {examsList
                        .filter(exam => {
                          if (exam.is_live_for_admin_only && user?.email !== 'khanjariff09@gmail.com') {
                            return false;
                          }
                          return user?.email === 'khanjariff09@gmail.com' || registeredEvents.includes(exam.event_id);
                        })
                        .map((exam) => {
                          const submission = userSubmissions.find(sub => sub.exam_id === exam.id);
                          const now = new Date();
                          const start = new Date(exam.start_date);
                          const end = new Date(exam.end_date);
                          
                          let status: 'scheduled' | 'live' | 'ended' = 'live';
                          if (now < start) status = 'scheduled';
                          else if (now > end) status = 'ended';

                          const formatDuration = (secs: number) => {
                            const mins = Math.floor(secs / 60);
                            const rem = secs % 60;
                            return `${mins}m ${rem}s`;
                          };

                          return (
                            <div key={exam.id} className="rounded-3xl border border-white/5 bg-neutral-950 p-6 flex flex-col justify-between space-y-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  {exam.is_live_for_admin_only && (
                                    <span className="text-[10px] font-mono px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-full font-bold">
                                      Admin Testing Mode
                                    </span>
                                  )}
                                  {submission ? (
                                    <span className="text-[10px] font-mono px-2 py-0.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full font-bold">
                                      Submitted
                                    </span>
                                  ) : status === 'live' ? (
                                    <span className="text-[10px] font-mono px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full font-bold animate-pulse">
                                      Live Now
                                    </span>
                                  ) : status === 'scheduled' ? (
                                    <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full font-bold">
                                      Scheduled
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-950 border border-white/10 text-neutral-500 rounded-full font-bold">
                                      Ended
                                    </span>
                                  )}
                                </div>

                                <h3 className="text-base font-bold text-white">{exam.title}</h3>
                                <div className="text-xs text-neutral-400 space-y-1">
                                  <div className="flex justify-between">
                                    <span>Starts:</span>
                                    <span className="text-neutral-300 font-semibold">{start.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Ends:</span>
                                    <span className="text-neutral-300 font-semibold">{end.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>

                              {submission && (
                                <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl text-xs space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-neutral-500">Submission status:</span>
                                    <span className="font-bold capitalize text-green-500">
                                      submitted
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-neutral-500">Time taken:</span>
                                    <span className="text-neutral-300 font-mono font-bold">
                                      {submission.time_taken ? formatDuration(submission.time_taken) : 'N/A'}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-neutral-500">Language:</span>
                                    <span className="text-neutral-300 font-bold capitalize">
                                      {submission.version_selected || 'Common'}
                                    </span>
                                  </div>
                                  {exam.results_published && (
                                    <>
                                      {(() => {
                                        const stats = getExamResultStats(exam.id);
                                        if (!stats) return null;
                                        return (
                                          <>
                                            <div className="flex justify-between border-t border-white/5 pt-1.5 mt-1.5">
                                              <span className="text-purple-400 font-semibold">Marks Obtained:</span>
                                              <span className="text-purple-400 font-mono font-bold">
                                                {stats.score} / {stats.totalPoints}
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-cyan-400 font-semibold">Position/Rank:</span>
                                              <span className="text-cyan-400 font-mono font-bold">
                                                {stats.rankText}
                                              </span>
                                            </div>
                                          </>
                                        );
                                      })()}
                                    </>
                                  )}
                                </div>
                              )}

                              {!submission && (
                                <div className="pt-2">
                                  {status === 'live' || user?.email === 'khanjariff09@gmail.com' ? (
                                    <button
                                      onClick={async () => {
                                        setActiveExam(exam);
                                        try {
                                          const { isSupabaseConfigured, supabase } = await import('@/lib/supabase');
                                          if (isSupabaseConfigured()) {
                                            const { data } = await supabase
                                              .from('exam_questions')
                                              .select('*')
                                              .eq('exam_id', exam.id)
                                              .order('created_at', { ascending: true });
                                            if (data) setExamQuestions(data);
                                          } else {
                                            const local = localStorage.getItem(`acob_local_questions_${exam.id}`);
                                            if (local) setExamQuestions(JSON.parse(local));
                                            else setExamQuestions([]);
                                          }
                                        } catch (e) {
                                          console.error(e);
                                        }
                                        setShowPreExamModal(true);
                                      }}
                                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-yellow-600 hover:from-purple-500 hover:to-yellow-500 text-white rounded-2xl text-xs font-bold transition-all active:scale-[0.98]"
                                    >
                                      {status === 'live' ? 'Start Exam' : 'Start Exam (Admin Bypass)'}
                                    </button>
                                  ) : status === 'scheduled' ? (
                                    <button
                                      disabled
                                      className="w-full py-3 bg-white/[0.02] border border-white/5 text-neutral-500 rounded-2xl text-xs font-bold"
                                    >
                                      Exam Not Yet Started
                                    </button>
                                  ) : (
                                    <button
                                      disabled
                                      className="w-full py-3 bg-white/[0.01] border border-white/5 text-neutral-600 rounded-2xl text-xs font-bold"
                                    >
                                      Exam Closed
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

        </div>
      </div>

      {/* 1. MOCK QUIZ PRACTICE MODAL */}
      <AnimatePresence>
        {isQuizOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsQuizOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-neutral-950 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 font-sans"
            >
              {!quizFinished ? (
                <div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
                      Problem Solving Practice ({currentQuestionIdx + 1} of {PRACTICE_QUESTIONS.length})
                    </span>
                    <button 
                      onClick={() => setIsQuizOpen(false)}
                      className="text-neutral-500 hover:text-white text-xs"
                    >
                      Exit Test
                    </button>
                  </div>
                  
                  <div className="my-6">
                    <h3 className="text-base font-bold text-white leading-relaxed">
                      {PRACTICE_QUESTIONS[currentQuestionIdx].q}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {PRACTICE_QUESTIONS[currentQuestionIdx].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedAnswers({ ...selectedAnswers, [currentQuestionIdx]: idx })}
                        className={`w-full text-left p-4 rounded-2xl border text-sm font-semibold transition-all ${
                          selectedAnswers[currentQuestionIdx] === idx
                            ? 'bg-purple-600/10 border-purple-500 text-purple-300'
                            : 'bg-white/[0.01] border-white/5 text-neutral-400 hover:bg-white/[0.03] hover:text-white'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end">
                    {currentQuestionIdx < PRACTICE_QUESTIONS.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIdx(currentQuestionIdx + 1)}
                        disabled={selectedAnswers[currentQuestionIdx] === undefined}
                        className="rounded-xl bg-purple-600 px-6 py-2.5 text-xs font-bold text-white transition-all disabled:opacity-50"
                      >
                        Next Question
                      </button>
                    ) : (
                      <button
                        onClick={() => setQuizFinished(true)}
                        disabled={selectedAnswers[currentQuestionIdx] === undefined}
                        className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-2.5 text-xs font-bold text-white transition-all disabled:opacity-50"
                      >
                        Finish Quiz
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="h-16 w-16 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy size={32} />
                  </div>
                  <h3 className="text-xl font-bold">Quiz Completed!</h3>
                  <p className="text-neutral-400 text-sm mt-1">
                    You scored <strong className="text-purple-400">{calculateQuizScore()}</strong> out of {PRACTICE_QUESTIONS.length} correct.
                  </p>
                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setCurrentQuestionIdx(0);
                        setSelectedAnswers({});
                        setQuizFinished(false);
                      }}
                      className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-2 text-xs font-semibold hover:bg-white/[0.05]"
                    >
                      Retry Quiz
                    </button>
                    <button
                      onClick={() => setIsQuizOpen(false)}
                      className="rounded-xl bg-purple-600 px-5 py-2 text-xs font-semibold text-white hover:bg-purple-500"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. ADMIT CARD MODAL */}
      <AnimatePresence>
        {admitCardEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setAdmitCardEvent(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-neutral-950 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-left font-sans"
            >
              <div className="border-b border-white/5 pb-4 mb-4 flex justify-between items-center">
                <span className="text-xs font-mono tracking-widest text-cyan-400 font-bold uppercase">Official Admit Card</span>
                <button 
                  onClick={() => setAdmitCardEvent(null)}
                  className="text-neutral-500 hover:text-white text-xs"
                >
                  Close
                </button>
              </div>

              {/* Printable Ticket Area */}
              <div className="rounded-2xl border border-dashed border-neutral-800 bg-[#060608] p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-extrabold text-sm text-white">ACOB 2026 ADMIT TICKET</h4>
                  <span className="text-[10px] text-cyan-400 font-mono uppercase bg-cyan-500/10 px-2 py-0.5 rounded">Verified</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs border-b border-neutral-900 pb-1.5">
                    <span className="text-neutral-500">Student Name:</span>
                    <span className="font-semibold text-neutral-200">{displayName || user.user_metadata?.full_name}</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-neutral-900 pb-1.5">
                    <span className="text-neutral-500">Institution:</span>
                    <span className="font-semibold text-neutral-200">{school}</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-neutral-900 pb-1.5">
                    <span className="text-neutral-500">Tier Level:</span>
                    <span className="font-semibold text-neutral-200">{grade}</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-neutral-900 pb-1.5">
                    <span className="text-neutral-500">Competition:</span>
                    <span className="font-semibold text-neutral-200">{admitCardEvent.title}</span>
                  </div>
                  <div className="flex justify-between text-xs pb-1.5">
                    <span className="text-neutral-500">Event Date:</span>
                    <span className="font-semibold text-neutral-200">{admitCardEvent.date}</span>
                  </div>
                </div>

                <div className="bg-neutral-900/50 rounded-xl p-3 border border-neutral-800 text-[10px] text-neutral-400 font-light leading-relaxed">
                  <strong>Notice:</strong> Please print a copy of this ticket or save it on your device. Present your credentials alongside a photo identity card on competition day.
                </div>
              </div>


            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. PRE-EXAM DIRECTIONS & VERSION SELECTION MODAL */}
      <AnimatePresence>
        {showPreExamModal && activeExam && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-neutral-950 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-left font-sans space-y-5"
            >
              <div className="border-b border-white/5 pb-3 flex justify-between items-center">
                <span className="text-xs font-mono tracking-widest text-purple-400 font-bold uppercase">Exam Rules & Directions</span>
                <button 
                  onClick={() => setShowPreExamModal(false)}
                  className="text-neutral-500 hover:text-white text-xs"
                >
                  Cancel
                </button>
              </div>

              <div className="space-y-3.5">
                <h3 className="text-base font-extrabold text-white">{activeExam.title}</h3>
                
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-3 text-xs text-neutral-300">
                  <h4 className="font-bold text-white uppercase tracking-wider text-[10px] text-purple-400">Important Instructions:</h4>
                  <ul className="list-decimal pl-4 space-y-2">
                    <li>The exam will run in <strong>Full Screen mode</strong>. You must permit your browser to enter full screen.</li>
                    <li>
                      <strong>Anti-Cheat Shield:</strong> If you attempt to exit full screen:
                      <ul className="list-disc pl-4 mt-1 text-neutral-400">
                        <li>1st time: You will receive a warning and will be forced back to full screen.</li>
                        <li>2nd time: You will be <strong>disqualified</strong> immediately, and your current progress will be automatically submitted.</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Tab & Window Tracking:</strong> If you switch tabs, minimize the browser, or lose focus:
                      <ul className="list-disc pl-4 mt-1 text-neutral-400">
                        <li>1st time: You will receive a warning message.</li>
                        <li>2nd time: You will be <strong>disqualified</strong> immediately, and your current progress will be automatically submitted.</li>
                      </ul>
                    </li>
                    <li>You cannot pause or restart the exam once it has begun.</li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-4 space-y-2 text-yellow-500">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
                    IMPORTANT HONESTY NOTICE
                  </div>
                  <p className="text-xs leading-relaxed text-neutral-300">
                    We may record your camera video feed or capture your exam screen at random intervals during the exam to verify your honesty and compliance with the rules. Any suspicious activity will result in immediate disqualification.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPreExamModal(false)}
                  className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 rounded-2xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    const el = document.documentElement;
                    try {
                      if (el.requestFullscreen) {
                        await el.requestFullscreen();
                      } else if ((el as any).webkitRequestFullscreen) {
                        await (el as any).webkitRequestFullscreen();
                      } else if ((el as any).mozRequestFullScreen) {
                        await (el as any).mozRequestFullScreen();
                      } else if ((el as any).msRequestFullscreen) {
                        await (el as any).msRequestFullscreen();
                      }
                    } catch (err) {
                      console.warn('Fullscreen request blocked or failed:', err);
                    }
                    
                    setShowPreExamModal(false);
                    setAnswers({});
                    answersRef.current = {};
                    setFullscreenExits(0);
                    fullscreenExitsRef.current = 0;
                    setTabSwitches(0);
                    tabSwitchesRef.current = 0;
                    setWarningCount(0);
                    setIsDisqualified(false);
                    setElapsedTime(0);
                    setExamStartTime(Date.now());
                    setIsExamStarted(true);
                  }}
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 rounded-2xl text-xs font-bold text-white transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                >
                  I Agree, Start Exam
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. ACTIVE EXAM VIEW OVERLAY */}
      <AnimatePresence>
        {isExamStarted && activeExam && (
          <div className="fixed inset-0 z-[100] bg-neutral-950 text-white flex flex-col font-sans overflow-hidden">
            {/* Exam Header */}
            <div className="bg-neutral-900 border-b border-white/5 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono tracking-widest text-purple-400 font-bold uppercase">Active Examination Hall</span>
                <h2 className="text-lg font-black text-white">{activeExam.title}</h2>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                {/* Live Timer Count-down */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400 font-bold text-sm">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span>Time Left: {(() => {
                    const h = Math.floor(elapsedTime / 3600);
                    const m = Math.floor((elapsedTime % 3600) / 60);
                    const s = elapsedTime % 60;
                    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
                  })()}</span>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="flex-1 overflow-y-auto px-6 py-8 max-w-3xl mx-auto w-full space-y-8 pb-32">
              {examQuestions.length === 0 ? (
                <div className="text-center py-20 text-neutral-500">
                  No questions found for this exam.
                </div>
              ) : (
                <>
                  {examQuestions.map((question, index) => (
                    <div key={question.id} className="space-y-4">
                      {/* Optional Instruction Card */}
                      {question.instruction && (
                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-xs text-neutral-400 italic">
                          <strong>Instruction:</strong> {question.instruction}
                        </div>
                      )}

                      <div className="bg-neutral-900 border border-white/5 rounded-3xl p-6 space-y-4">
                        <div className="flex justify-between items-start gap-4">
                          <span className="text-xs font-mono font-bold text-purple-400">Question {index + 1}</span>
                          <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-neutral-400">{question.points} Points</span>
                        </div>

                        <p className="text-sm font-semibold text-neutral-100">{question.question_text}</p>

                        {/* MCQ Options Selection */}
                        {question.type === 'mcq' && question.options && Array.isArray(question.options) && (
                          <div className="grid grid-cols-1 gap-2.5 pt-2">
                            {question.options.map((opt: string, optIdx: number) => {
                              const isChecked = answers[question.id] === optIdx;
                              return (
                                <button
                                  key={optIdx}
                                  type="button"
                                  onClick={() => setAnswers(prev => ({ ...prev, [question.id]: optIdx }))}
                                  className={`p-4 rounded-2xl border text-left text-xs font-semibold flex items-center gap-3 transition-all ${
                                    isChecked
                                      ? 'bg-purple-600/10 border-purple-500 text-white animate-none'
                                      : 'bg-white/[0.01] border-white/5 text-neutral-400 hover:bg-white/[0.02]'
                                  }`}
                                >
                                  <span className={`h-4 w-4 rounded-full border flex items-center justify-center text-[8px] ${
                                    isChecked ? 'border-purple-500 text-purple-500' : 'border-neutral-700'
                                  }`}>
                                    {isChecked && '●'}
                                  </span>
                                  <span>{opt}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Written Question Block */}
                        {question.type === 'broad' && (
                          <div className="pt-2">
                            <textarea
                              rows={5}
                              value={answers[question.id] || ''}
                              onChange={(e) => setAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
                              placeholder="Write your answer here..."
                              className="w-full bg-neutral-950 border border-white/10 rounded-2xl p-4 text-xs text-neutral-200 focus:outline-none focus:border-purple-500 transition-all font-sans resize-none"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Mobile Submit Button */}
                  <div className="md:hidden block pt-4 pb-8">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Are you sure you want to submit your exam? You cannot edit your answers once submitted.')) {
                          submitExamResults('submitted');
                        }
                      }}
                      className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl text-xs font-extrabold shadow-lg hover:shadow-purple-500/20 active:scale-[0.98] transition-all"
                    >
                      Submit Exam Sheet
                    </button>
                    <p className="text-[10px] text-neutral-500 text-center mt-2 italic">Answers are saved in real-time. Do not close this browser tab.</p>
                  </div>
                </>
              )}
            </div>

            {/* Bottom Submit Bar (Desktop Only) */}
            <div className="bg-neutral-900 border-t border-white/5 p-4 justify-between items-center fixed bottom-0 left-0 right-0 z-50 hidden md:flex">
              <span className="text-xs text-neutral-500 italic">Answers are saved in real-time. Do not close this browser tab.</span>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to submit your exam? You cannot edit your answers once submitted.')) {
                    submitExamResults('submitted');
                  }
                }}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl text-xs font-extrabold shadow-lg hover:shadow-purple-500/20 active:scale-[0.98] transition-all"
              >
                Submit Exam Sheet
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. ANTI-CHEAT WARNING OVERLAY */}
      <AnimatePresence>
        {showWarningModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-md w-full bg-neutral-950 border border-red-500/20 rounded-3xl p-6 text-center space-y-6 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
                <span className="text-red-500 text-2xl">⚠️</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black text-white uppercase tracking-wider">Security Violation Warning</h3>
                <p className="text-xs text-neutral-300">
                  {warningType === 'fullscreen' 
                    ? 'You have exited the mandatory Full Screen mode! To verify integrity, the exam must be taken in full screen only.'
                    : 'You have switched tabs, minimized the window, or lost active focus on the exam!'}
                </p>
                <p className="text-[10px] text-red-400 font-bold bg-red-500/10 border border-red-500/20 p-3 rounded-2xl">
                  WARNING: Security violations will lead to automatic disqualification and submission.
                </p>
              </div>

              <button
                type="button"
                onClick={async () => {
                  const el = document.documentElement;
                  try {
                    if (el.requestFullscreen) {
                      await el.requestFullscreen();
                    } else if ((el as any).webkitRequestFullscreen) {
                      await (el as any).webkitRequestFullscreen();
                    }
                  } catch (err) {
                    console.warn(err);
                  }
                  setShowWarningModal(false);
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-2xl text-xs font-bold transition-all shadow-lg hover:shadow-red-500/20"
              >
                Return to Full Screen
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
