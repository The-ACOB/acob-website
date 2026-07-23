import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initialize Supabase Client
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export interface Certificate {
  id?: string;
  certificate_id: string;
  student_name: string;
  event_name: string;
  issue_date: string;
  achievement: string;
  issue_by?: string;
  created_at?: string;
}

export interface SiteContent {
  key: string;
  content: Record<string, any>;
  updated_at?: string;
}

// In-Memory Local Fallback Storage for smooth demo experience when Supabase credentials are pending
const LOCAL_STORAGE_CERT_KEY = 'acob_local_certificates';
const LOCAL_STORAGE_CMS_KEY = 'acob_local_cms';

const DEFAULT_CERTIFICATES: Certificate[] = [
  {
    certificate_id: 'ACOB-2026-98A1B',
    student_name: 'Tanvir Ahmed',
    event_name: 'National Olympiad 2026',
    issue_date: '2026-07-20',
    achievement: 'Gold Medalist - Senior Category',
    issue_by: 'Applied Cognitio Olympiad Bangladesh'
  },
  {
    certificate_id: 'ACOB-2026-77F4C',
    student_name: 'Ayesha Rahman',
    event_name: 'Cognitive Science Challenge 2026',
    issue_date: '2026-07-15',
    achievement: 'Champion - Junior Division',
    issue_by: 'Applied Cognitio Olympiad Bangladesh'
  }
];

export const isSupabaseConfigured = () => {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')
  );
};

// Helper to fetch certificate by ID with local fallback
export async function getCertificateById(certificateId: string): Promise<Certificate | null> {
  const cleanId = certificateId.trim().toUpperCase();

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('certificate_id', cleanId)
        .single();
      
      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to local storage:', e);
    }
  }

  // Fallback to localStorage
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(LOCAL_STORAGE_CERT_KEY);
    const certs: Certificate[] = raw ? JSON.parse(raw) : DEFAULT_CERTIFICATES;
    const match = certs.find(c => c.certificate_id.toUpperCase() === cleanId);
    if (match) return match;
  }

  return DEFAULT_CERTIFICATES.find(c => c.certificate_id.toUpperCase() === cleanId) || null;
}

// Helper to list all certificates
export async function getAllCertificates(): Promise<Certificate[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase error:', e);
    }
  }

  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(LOCAL_STORAGE_CERT_KEY);
    if (raw) return JSON.parse(raw);
    localStorage.setItem(LOCAL_STORAGE_CERT_KEY, JSON.stringify(DEFAULT_CERTIFICATES));
  }

  return DEFAULT_CERTIFICATES;
}

// Helper to create certificate
export async function createCertificate(cert: Omit<Certificate, 'id' | 'created_at'>): Promise<Certificate> {
  const newCert: Certificate = {
    ...cert,
    id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .insert([newCert])
        .select()
        .single();

      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase insert failed:', e);
    }
  }

  // Fallback to local storage
  if (typeof window !== 'undefined') {
    const existing = await getAllCertificates();
    const updated = [newCert, ...existing];
    localStorage.setItem(LOCAL_STORAGE_CERT_KEY, JSON.stringify(updated));
  }

  return newCert;
}
