'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth-provider';
import { motion } from 'framer-motion';
import { 
  User, BookOpen, Award, Settings, Bell, ChevronRight, LogOut, 
  Search, ShieldCheck, Trophy, Target, Sparkles, Plus, CheckCircle, Edit3, Camera, Phone
} from 'lucide-react';
import Link from 'next/link';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { supabase } from '@/lib/supabase';

// Mock dashboard statistics data
const COGNITIVE_DATA = [
  { name: 'Jan', score: 620 },
  { name: 'Feb', score: 680 },
  { name: 'Mar', score: 710 },
  { name: 'Apr', score: 780 },
  { name: 'May', score: 820 },
  { name: 'Jun', score: 890 },
];

export default function DashboardPage() {
  const { user, signOut, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'certificates' | 'settings'>('overview');
  const [displayName, setDisplayName] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

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
    }
  }, [user]);

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

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setMessage(null);

    const localSession = localStorage.getItem('acob_mock_session');
    if (localSession) {
      // Mock upload using FileReader to base64
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

      // Upload file to Supabase Storage bucket 'avatars'
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);

      // Update auth user metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });
      if (authError) throw authError;

      // Update profiles database table directly
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

    // Save to user metadata
    const localSession = localStorage.getItem('acob_mock_session');
    if (localSession) {
      // Mock session saving
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

      // Update public.profiles table directly as well to guarantee persistence
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
      setMessage('Password updated locally (Mock)!');
      setIsChangingPassword(false);
      setNewPassword('');
      setConfirmPassword('');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;
      setMessage('Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setMessage(err.message || 'Error updating password.');
    } finally {
      setIsChangingPassword(false);
    }
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
                <span className="font-semibold text-white">{school}</span>
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
              <BookOpen size={18} />
              Olympiads & Events
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
                    Welcome back, {displayName || 'Cognitive Challenger'}. Track your learning milestone metrics.
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-2.5 text-xs text-neutral-400">
                  <ShieldCheck size={16} className="text-cyan-400" />
                  <span>Account Verified</span>
                </div>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="rounded-3xl border border-white/5 bg-white/[0.01] p-6">
                  <span className="text-xs text-neutral-500 font-semibold">Active Enrolled Olympiads</span>
                  <p className="text-3xl font-bold mt-2 text-purple-400">2</p>
                  <span className="text-[10px] text-neutral-400 block mt-1.5">Next exam: Aug 28, 2026</span>
                </div>
                <div className="rounded-3xl border border-white/5 bg-white/[0.01] p-6">
                  <span className="text-xs text-neutral-500 font-semibold">Verified Certificates</span>
                  <p className="text-3xl font-bold mt-2 text-cyan-400">1</p>
                  <span className="text-[10px] text-neutral-400 block mt-1.5">National Olympiad 2026</span>
                </div>
                <div className="rounded-3xl border border-white/5 bg-white/[0.01] p-6">
                  <span className="text-xs text-neutral-500 font-semibold">National Rank Percentile</span>
                  <p className="text-3xl font-bold mt-2 text-emerald-400">Top 1.2%</p>
                  <span className="text-[10px] text-neutral-400 block mt-1.5">Out of 12,500+ participants</span>
                </div>
              </div>

              {/* Recharts Analytics Chart */}
              <div className="rounded-3xl border border-white/5 bg-white/[0.01] p-6">
                <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                  <Target size={18} className="text-purple-400" />
                  Cognitive Development Score
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={COGNITIVE_DATA}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                      <XAxis dataKey="name" stroke="#666" fontSize={11} />
                      <YAxis stroke="#666" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: '#0c0c0c', borderColor: '#333', color: '#fff' }} />
                      <Area type="monotone" dataKey="score" stroke="#a855f7" fillOpacity={1} fill="url(#colorScore)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'events' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">Registered Olympiads</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-3xl border border-white/5 bg-neutral-950 p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-purple-500/5 rounded-full blur-xl" />
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    Olympiad Round 1
                  </span>
                  <h3 className="font-bold text-lg mt-3">Applied Cognitio Olympiad</h3>
                  <p className="text-neutral-400 text-xs mt-1">National preliminary test testing problem solving and cognitive skills.</p>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-neutral-500">Scheduled:</span>
                    <span className="font-semibold text-white">August 28, 2026</span>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/5 bg-neutral-950 p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-cyan-500/5 rounded-full blur-xl" />
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    Challenge Event
                  </span>
                  <h3 className="font-bold text-lg mt-3">Cognitive Science Challenge</h3>
                  <p className="text-neutral-400 text-xs mt-1">Special logic, sequence, and analytical reasoning challenge.</p>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-neutral-500">Scheduled:</span>
                    <span className="font-semibold text-white">September 15, 2026</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'certificates' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">My Awards & Certificates</h2>
              <div className="rounded-3xl border border-white/5 bg-neutral-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-amber-500/10 p-3 border border-amber-500/20 text-amber-500">
                    <Trophy size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">National Olympiad 2026 Certificate</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">ID: ACOB-2026-98A1B • Senior category gold medal</p>
                  </div>
                </div>
                <Link
                  href="/verify?id=ACOB-2026-98A1B"
                  className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold hover:bg-white/[0.08] transition-all"
                >
                  Verify Certificate
                  <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          )}

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

              <h2 className="text-2xl font-bold pt-6 border-t border-white/5">Security Settings</h2>
              <form onSubmit={handleChangePassword} className="rounded-3xl border border-white/5 bg-neutral-950 p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-400">New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-3 px-4 text-sm text-white placeholder-neutral-600 outline-none focus:border-purple-500/30"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-400">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-3 px-4 text-sm text-white placeholder-neutral-600 outline-none focus:border-purple-500/30"
                      required
                    />
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

        </div>
      </div>
    </div>
  );
}
