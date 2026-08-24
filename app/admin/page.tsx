'use client';
import { useState, useEffect } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { ShieldCheck, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

// Default Developer credentials
const DEV_EMAIL = 'khanjariff09@gmail.com';
const DEV_PASS = 'khanacobadminking99';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  // Clear any existing admin session on mount and check for warning params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const isAuthorizedPasscode = params.get('pass') === process.env.NEXT_PUBLIC_ADMIN_PASSCODE;
      
      if (!isAuthorizedPasscode) {
        setAuthorized(false);
      } else {
        setAuthorized(true);
      }
      sessionStorage.removeItem('acob_admin_session');
    }
  }, []);

  if (authorized === false) {
    notFound();
    return null;
  }

  if (authorized === null) {
    return null; // Return empty space or spinner during authorization check to prevent flash of login screen
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const cleanEmail = email.trim().toLowerCase();

    // 1. Check Developer Admin Bypass
    if (cleanEmail === DEV_EMAIL && password === DEV_PASS) {
      const devSession = {
        email: DEV_EMAIL,
        role: 'developer',
        permissions: ['all']
      };
      sessionStorage.setItem('acob_admin_session', JSON.stringify(devSession));
      router.push('/admin/dashboard');
      return;
    }

    try {
      // 2. Fetch admin accounts database list
      let adminAccounts: any[] = [];
      if (isSupabaseConfigured()) {
        const { data, error: fetchError } = await supabase
          .from('site_content')
          .select('*')
          .eq('key', 'admin_accounts')
          .single();
        
        if (!fetchError && data && data.content && Array.isArray(data.content.accounts)) {
          adminAccounts = data.content.accounts;
        }
      } else {
        const localAdmins = localStorage.getItem('acob_admin_accounts');
        if (localAdmins) {
          adminAccounts = JSON.parse(localAdmins);
        }
      }

      // 3. Find matching account
      const matchedAdmin = adminAccounts.find(
        (acc) => acc.email.toLowerCase().trim() === cleanEmail && acc.password === password
      );

      if (matchedAdmin) {
        const adminSession = {
          email: matchedAdmin.email,
          role: matchedAdmin.role || 'admin',
          permissions: matchedAdmin.permissions || ['cms', 'certificates', 'resources', 'events', 'participants', 'exams']
        };
        sessionStorage.setItem('acob_admin_session', JSON.stringify(adminSession));
        router.push('/admin/dashboard');
      } else {
        setError('SECURITY WARNING: Invalid admin credentials. We have reported this unusual behaviour to the dev team. Your IP address and attempt details have been logged.');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background decorative glows */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="w-full max-w-md bg-neutral-950 border border-white/10 rounded-3xl p-8 shadow-2xl relative">
        {/* Header */}
        <div className="flex flex-col items-center text-center pb-6">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
            <ShieldCheck size={28} />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Admin Portal Access
          </h2>
          <p className="text-xs text-neutral-500 mt-1">Authenticate using admin credentials</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 flex items-start gap-2.5 rounded-2xl border border-red-500/10 bg-red-500/[0.03] p-4 text-xs text-red-400">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-400">Admin Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="email"
                placeholder="admin@acobd.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-3.5 pl-11 pr-4 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-purple-500/30 focus:bg-white/[0.04]"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-400">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-3.5 pl-11 pr-4 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-purple-500/30 focus:bg-white/[0.04]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 py-4 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <span>Sign In as Admin</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
