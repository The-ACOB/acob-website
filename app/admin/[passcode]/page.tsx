'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Save, 
  RefreshCw, 
  Award, 
  Edit3, 
  Layers, 
  CheckCircle2, 
  Lock, 
  Globe, 
  ExternalLink,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface Props {
  params: Promise<{ passcode: string }>;
}

export default function AdminVisualCmsPage({ params }: Props) {
  const resolvedParams = use(params);
  const passcode = decodeURIComponent(resolvedParams.passcode || '');

  const expectedPasscode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || '';
  const isValidPasscode = Boolean(
    passcode && 
    (expectedPasscode ? passcode === expectedPasscode : passcode.length > 0)
  );

  // Content state for Wix Studio style visual editing
  const [content, setContent] = useState({
    hero_title: 'Empowering the Next Generation of Cognitive Minds in Bangladesh',
    hero_subtitle: 'Applied Cognitio Olympiad Bangladesh (ACOB) is the national premier academic tournament fostering critical reasoning and innovation.',
    announcement_banner: '🚀 Registration for National Olympiad 2026 is officially open!',
    about_text: 'ACOB is built to challenge standard paradigms of academic excellence. We empower young minds through rigorous cognitive challenges.'
  });

  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  // Load existing CMS content
  useEffect(() => {
    async function loadCmsContent() {
      if (isSupabaseConfigured()) {
        try {
          const { data } = await supabase.from('site_content').select('*').eq('key', 'homepage_cms').single();
          if (data && data.content) {
            setContent(prev => ({ ...prev, ...data.content }));
          }
        } catch (e) {
          console.warn('Error fetching CMS from Supabase:', e);
        }
      } else if (typeof window !== 'undefined') {
        const local = localStorage.getItem('acob_site_cms');
        if (local) setContent(JSON.parse(local));
      }
    }

    if (isValidPasscode) {
      loadCmsContent();
    }
  }, [isValidPasscode]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (isSupabaseConfigured()) {
        await supabase.from('site_content').upsert({
          key: 'homepage_cms',
          content: content,
          updated_at: new Date().toISOString()
        });
      } else if (typeof window !== 'undefined') {
        localStorage.setItem('acob_site_cms', JSON.stringify(content));
      }

      setStatusMsg('Saved & Synced Live!');
      setTimeout(() => setStatusMsg(''), 3000);
    } catch (e) {
      console.error(e);
      setStatusMsg('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (!isValidPasscode) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center">
          <Lock className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-neutral-400">Invalid Admin Passcode.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-purple-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Floating Wix-Studio Style Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-neutral-900/90 border border-purple-500/30 p-5 rounded-2xl backdrop-blur-2xl shadow-2xl sticky top-24 z-30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">ACOB Live Studio Editor</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold rounded-full uppercase">Realtime Active</span>
              </div>
              <p className="text-xs text-neutral-400">Passcode unlocked: <code className="text-purple-300">{passcode}</code></p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/admin/certificates/${encodeURIComponent(passcode)}`}
              className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-white/10 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-purple-400" />
              <span>Certificates Console</span>
            </Link>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save & Publish Live</span>
            </button>
          </div>
        </div>

        {statusMsg && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            {statusMsg}
          </div>
        )}

        {/* Content Editing Canvas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Drag & Drop / Inline Edit Panel */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Banner Section */}
            <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                  <Edit3 className="w-3.5 h-3.5" /> Announcement Banner Text
                </span>
              </div>
              <input
                type="text"
                value={content.announcement_banner}
                onChange={(e) => setContent({ ...content, announcement_banner: e.target.value })}
                className="w-full bg-black/70 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Hero Section */}
            <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Edit3 className="w-3.5 h-3.5" /> Homepage Hero Headline
                </span>
              </div>
              
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Title</label>
                <textarea
                  rows={2}
                  value={content.hero_title}
                  onChange={(e) => setContent({ ...content, hero_title: e.target.value })}
                  className="w-full bg-black/70 border border-white/10 rounded-xl p-4 text-lg font-bold text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">Sub-headline Description</label>
                <textarea
                  rows={3}
                  value={content.hero_subtitle}
                  onChange={(e) => setContent({ ...content, hero_subtitle: e.target.value })}
                  className="w-full bg-black/70 border border-white/10 rounded-xl p-4 text-sm text-neutral-300 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* About Text */}
            <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Edit3 className="w-3.5 h-3.5" /> About Section Overview
                </span>
              </div>
              <textarea
                rows={4}
                value={content.about_text}
                onChange={(e) => setContent({ ...content, about_text: e.target.value })}
                className="w-full bg-black/70 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

          </div>

          {/* Real-time Studio Live Preview Side Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-neutral-900/80 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-xl sticky top-48">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-400" /> Live Preview Mockup
                </span>
              </div>

              {/* Live Preview Canvas Box */}
              <div className="bg-black rounded-xl p-4 border border-white/10 space-y-4 text-left">
                <div className="p-2 bg-purple-500/20 border border-purple-500/40 rounded-lg text-[10px] text-purple-300 font-semibold truncate">
                  {content.announcement_banner}
                </div>

                <div>
                  <h4 className="text-sm font-extrabold text-white leading-tight">
                    {content.hero_title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-2 line-clamp-3">
                    {content.hero_subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] text-neutral-300">
                  <span className="text-[9px] uppercase text-neutral-500 font-bold block">About text preview</span>
                  {content.about_text}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <Link
                  href="/"
                  target="_blank"
                  className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 border border-white/10"
                >
                  <span>Open Live Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
