'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from './auth-provider';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { setMockSession } = useAuth();

  // Reset and synchronize mode when modal is opened
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError(null);
      setSuccess(null);
      setEmail('');
      setPassword('');
      setName('');
      setPhone('');
    }
  }, [isOpen, initialMode]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (mode === 'forgot') {
      if (!email) {
        setError('Please enter your email.');
        setLoading(false);
        return;
      }
    } else {
      if (!email || !password || (mode === 'signup' && (!name || !phone))) {
        setError('Please fill in all fields.');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        setLoading(false);
        return;
      }
    }

    try {
      if (!isSupabaseConfigured()) {
        // Mock fallback auth
        setTimeout(() => {
          if (mode === 'forgot') {
            setSuccess('Password reset link sent! (Mock)');
          } else if (mode === 'login') {
            setMockSession({ name: email.split('@')[0], email });
          } else {
            setSuccess('Registration successful! Logging you in...');
            setTimeout(() => {
              setMockSession({ name, email, phone });
            }, 1000);
          }
          setLoading(false);
        }, 800);
        return;
      }

      if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/dashboard?reset=true`,
        });
        if (error) throw error;
        setSuccess('Password reset link sent! Please check your email.');
      } else if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setSuccess('Logged in successfully!');
        setTimeout(() => {
          onClose();
          window.location.href = '/dashboard';
        }, 1000);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              phone: phone,
              avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
            },
          },
        });
        if (error) throw error;

        // Check if user session was immediately established (e.g., if Confirm Email is disabled on Supabase)
        if (data.session) {
          setSuccess('Account created successfully! Redirecting...');
          setTimeout(() => {
            onClose();
            window.location.href = '/dashboard';
          }, 1000);
        } else {
          // Attempt immediate sign in (using the password)
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
          
          if (signInError) {
            // If sign-in fails (e.g., because email is not confirmed), show the error so the user knows what to do
            throw new Error(`Signup succeeded, but automatic login failed: ${signInError.message}. Please ensure email confirmation is disabled in your Supabase Auth settings.`);
          }
          
          if (signInData.session) {
            setSuccess('Account created successfully! Redirecting...');
            setTimeout(() => {
              onClose();
              window.location.href = '/dashboard';
            }, 1000);
          }
        }
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 p-8 shadow-2xl"
          >
            {/* Background decorative glows */}
            <div className="absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
            <div className="absolute -left-10 -bottom-10 -z-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

            {/* Header */}
            <div className="flex items-center justify-between pb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
              </h2>
              <button
                onClick={onClose}
                className="rounded-full border border-white/5 bg-white/5 p-2 text-neutral-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Notifications */}
            {error && (
              <div className="mb-4 flex items-start gap-2.5 rounded-2xl border border-red-500/10 bg-red-500/[0.03] p-4 text-sm text-red-400">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-4 flex items-start gap-2.5 rounded-2xl border border-green-500/10 bg-green-500/[0.03] p-4 text-sm text-green-400">
                <CheckCircle size={16} className="mt-0.5 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* Forms */}
            <form onSubmit={handleAuth} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-400">Full Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="text"
                        placeholder="Jane Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-3.5 pl-11 pr-4 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-purple-500/30 focus:bg-white/[0.04]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-400">Phone Number</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="tel"
                        placeholder="+880 1XXXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-3.5 pl-11 pr-4 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-purple-500/30 focus:bg-white/[0.04]"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-400">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-3.5 pl-11 pr-4 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-purple-500/30 focus:bg-white/[0.04]"
                    required
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-neutral-400">Password</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => {
                          setMode('forgot');
                          setError(null);
                          setSuccess(null);
                        }}
                        className="text-xs font-medium text-purple-400 hover:underline"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
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
              )}

              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 py-4 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <span>
                      {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                    </span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            {/* Footer switcher */}
            <div className="mt-6 text-center text-xs text-neutral-500">
              {mode === 'forgot' ? (
                <p>
                  Remember your password?{' '}
                  <button
                    onClick={() => {
                      setMode('login');
                      setError(null);
                      setSuccess(null);
                    }}
                    className="font-bold text-white hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              ) : mode === 'login' ? (
                <p>
                  Don't have an account?{' '}
                  <button
                    onClick={() => {
                      setMode('signup');
                      setError(null);
                      setSuccess(null);
                    }}
                    className="font-bold text-white hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => {
                      setMode('login');
                      setError(null);
                      setSuccess(null);
                    }}
                    className="font-bold text-white hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


