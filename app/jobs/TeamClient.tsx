'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/page-transition';
import { Briefcase, Layers, Sparkles, CheckCircle2, ArrowRight, ArrowUpRight } from 'lucide-react';

const jobsData = [
  {
    id: 'project-manager',
    title: 'Project Manager',
    department: 'Operations',
    type: 'Full-time',
    description: 'Oversee execution tracks of upcoming ACOB Olympiad cycles, manage cross-functional team milestones, and streamline ecosystem communication.',
    tags: ['Sprint & timeline ownership', 'Stakeholder coordination'],
    quote: '“We value execution speed + clarity of thought over formal experience.”'
  }
  // Future vacancies can be appended directly here and will auto-populate cleanly into the grid matrix
];

export default function TeamClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz6UYvfW7DUd2AetGmLlVVV8o-IOsM8wIy9LRpA_vCSLnRkzVjPO71KxFSQJ9f-HV0HoQ/exec';

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        position: formData.position,
        message: formData.message,
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload),
      });

      setStatus('success');
      setFormData({ name: '', email: '', position: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  const handleApplyClick = (jobTitle: string) => {
    setFormData((prev) => ({ ...prev, position: jobTitle }));
    const targetElement = document.getElementById('application-console-card');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => {
      document.getElementById('full-name-input')?.focus();
    }, 400);
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col selection:bg-purple-500/30">

        {/* Premium Ambient Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 opacity-70 pointer-events-none" />

        {/* Ambient Lights */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-purple-600/10 via-cyan-500/5 to-transparent blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />
        </div>

        {/* Cinematic Header Block */}
        <section className="relative w-full pt-36 pb-12 text-center z-10 px-4 select-none">
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/60 border border-neutral-800/80 text-xs text-cyan-400 font-medium cursor-default">
              <Sparkles size={11} className="text-purple-400 animate-pulse" />
              <span>Careers & Placements</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight cursor-default">
              Join Our <span className="bg-gradient-to-r from-purple-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent brightness-110">Team</span>
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed cursor-default">
              Help us shape the future of academic excellence in Bangladesh. Submit your credentials below or review our current openings.
            </p>
          </div>
        </section>

        {/* Vertical Stack Wrapper Layout */}
        <section className="relative pb-32 px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-5xl mx-auto space-y-16">
            
            {/* STAGE 1: PREMIUM COMPACT APPLICATION CONSOLE (ON TOP) */}
            <div id="application-console-card" className="bg-neutral-950/40 border border-neutral-900 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden max-w-4xl mx-auto w-full">
              <div className="px-8 py-6 border-b border-neutral-900 bg-neutral-950/60 select-none">
                <h3 className="text-xl font-bold text-white tracking-tight cursor-default">Application Console</h3>
                <p className="text-xs text-neutral-500 font-light mt-1 cursor-default">
                  Submit your custom candidate profile or choose to align with a designated opening listed below.
                </p>
              </div>

              <div className="p-8 md:p-10">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 max-w-md mx-auto space-y-4 select-none"
                    >
                      <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-2 cursor-default">
                        <CheckCircle2 size={24} className="text-cyan-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight cursor-default">Application Received!</h3>
                      <p className="text-neutral-400 text-sm font-light leading-relaxed cursor-default">
                        Thank you for applying. Your profile has been safely uploaded straight to our core review committee. We will look over your details soon!
                      </p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-xs font-medium transition-all text-neutral-300 hover:text-white cursor-pointer"
                      >
                        Submit Another Profile
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      
                      {/* Tightened Input Matrix */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold tracking-wider uppercase text-neutral-500 select-none cursor-default">Full Name</label>
                          <input 
                            id="full-name-input"
                            type="text"
                            required
                            placeholder="e.g., Saimon Khan"
                            className="w-full px-4 py-2.5 rounded-xl bg-neutral-900/40 border border-neutral-800 text-white placeholder-neutral-700 focus:outline-none focus:border-purple-500/40 focus:bg-black/60 transition-all text-sm font-light cursor-text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold tracking-wider uppercase text-neutral-500 select-none cursor-default">Email Address</label>
                          <input 
                            type="email"
                            required
                            placeholder="name@example.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-neutral-900/40 border border-neutral-800 text-white placeholder-neutral-700 focus:outline-none focus:border-purple-500/40 focus:bg-black/60 transition-all text-sm font-light cursor-text"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold tracking-wider uppercase text-neutral-500 select-none cursor-default">Applying For Position</label>
                          <input 
                            type="text"
                            required
                            placeholder="e.g., Project Manager / Designer"
                            className="w-full px-4 py-2.5 rounded-xl bg-neutral-900/40 border border-neutral-800 text-white placeholder-neutral-700 focus:outline-none focus:border-purple-500/40 focus:bg-black/60 transition-all text-sm font-light cursor-text"
                            value={formData.position}
                            onChange={(e) => setFormData({...formData, position: e.target.value})}
                          />
                        </div>
                      </div>

                      {/* Cover Note Area */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold tracking-wider uppercase text-neutral-500 select-none cursor-default">Cover Note / Qualifications Overview</label>
                        <textarea 
                          rows={4}
                          placeholder="Tell us briefly what makes you a great fit for ACOB..."
                          className="w-full px-4 py-3 rounded-xl bg-neutral-900/40 border border-neutral-800 text-white placeholder-neutral-700 focus:outline-none focus:border-purple-500/40 focus:bg-black/60 transition-all text-sm font-light resize-none leading-relaxed cursor-text"
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                      </div>

                      {/* Actions Footer Segment */}
                      <div className="pt-4 border-t border-neutral-900/60 flex flex-col sm:flex-row items-center justify-between gap-5 select-none">
                        <span className="text-xs text-neutral-500 font-light italic text-center sm:text-left cursor-default">
                          “We evaluate applications on a rolling basis over multiple evaluation cycles.”
                        </span>
                        
                        <button 
                          type="submit"
                          disabled={status === 'loading'}
                          className="w-full sm:w-auto min-w-[200px] py-3 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-white font-medium text-xs tracking-wider uppercase rounded-xl transition-all duration-300 shadow-lg active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 group cursor-pointer"
                        >
                          <span>{status === 'loading' ? 'Processing...' : 'Submit Application'}</span>
                          {status !== 'loading' && <ArrowRight size={13} className="transform transition-transform duration-300 group-hover:translate-x-0.5" />}
                        </button>
                      </div>

                      {status === 'error' && (
                        <p className="text-xs text-rose-400 text-center font-light select-none cursor-default">
                          ✕ Submission failed. Please review input fields and try again.
                        </p>
                      )}
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* STAGE 2: CURRENT VACANCIES (BELOW THE FORM + HIGHLY SCALABLE GRID MATRIX) */}
            <div className="space-y-6 w-full">
              <div className="select-none px-1 border-b border-neutral-900 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white cursor-default">Current Vacancies</h3>
                  <p className="text-xs text-neutral-500 font-light mt-0.5 cursor-default">Open spaces we are looking to fulfill immediately.</p>
                </div>
                <div className="w-12 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-400 sm:hidden" />
              </div>

              {/* Responsive Grid System: Seamlessly fits 1 to 12+ items without breaking layout constraints */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobsData.map((job) => (
                  <div 
                    key={job.id}
                    className="bg-neutral-950/40 border border-neutral-900 rounded-2xl p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between gap-6 transition-all duration-300 relative group overflow-hidden select-none"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 cursor-default">{job.department}</span>
                          <span className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 cursor-default">{job.type}</span>
                        </div>
                        
                        <button 
                          onClick={() => handleApplyClick(job.title)}
                          className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-0.5 transition-colors cursor-pointer group/btn"
                        >
                          <span>Apply</span>
                          <ArrowUpRight size={12} className="transform transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </button>
                      </div>
                      
                      <h4 className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-200 cursor-default">{job.title}</h4>
                      
                      <p className="text-xs text-neutral-400 font-light leading-relaxed cursor-default">
                        {job.description}
                      </p>

                      <div className="space-y-1.5 pt-1">
                        <h5 className="text-[10px] font-bold tracking-wider uppercase text-neutral-500 cursor-default">Key Priorities:</h5>
                        <ul className="space-y-1 text-[11px] font-light text-neutral-400">
                          <li className="flex items-center gap-2 cursor-default">
                            <span className="text-purple-400">✦</span> {job.tags[0]}
                          </li>
                          <li className="flex items-center gap-2 cursor-default">
                            <span className="text-purple-400">✦</span> {job.tags[1]}
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-3.5 bg-neutral-900/30 border border-neutral-900/60 rounded-xl text-[11px] font-light text-neutral-400 italic cursor-default">
                      {job.quote}
                    </div>
                  </div>
                ))}

                {/* Scalable Placeholder Card (Encourages General Vector Applications) */}
                <div className="bg-neutral-950/10 border border-dashed border-neutral-800/80 rounded-2xl p-6 flex flex-col justify-between gap-6 select-none opacity-80 hover:opacity-100 transition-opacity">
                  <div className="space-y-3">
                    <span className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 cursor-default">Custom Track</span>
                    <h4 className="text-lg font-bold tracking-tight text-neutral-300 cursor-default">Other Vectors?</h4>
                    <p className="text-xs text-neutral-500 font-light leading-relaxed cursor-default">
                      We are always looking for premium researchers, backend developers, visual content curators, and community architects.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleApplyClick('General Track')}
                    className="w-full py-2 text-center rounded-xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 text-xs font-light text-neutral-400 hover:text-white transition-all cursor-pointer"
                  >
                    Propose Custom Profile
                  </button>
                </div>

              </div>
            </div>

          </div>
        </section>

      </main>
    </PageTransition>
  );
}

{/*
'use client';

import React, { useState } from 'react';
import PageTransition from '@/components/page-transition';

export default function TeamClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const GOOGLE_SCRIPT_URL =
      'https://script.google.com/macros/s/AKfycbz6UYvfW7DUd2AetGmLlVVV8o-IOsM8wIy9LRpA_vCSLnRkzVjPO71KxFSQJ9f-HV0HoQ/exec';

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        position: formData.position,
        message: formData.message,
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload),
      });

      setStatus('success');
      setFormData({ name: '', email: '', position: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-black text-white">
        <section className="relative min-h-[45vh] w-full overflow-hidden bg-black flex flex-col items-center justify-center pt-32 pb-12 text-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-black to-cyan-950/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
          </div>

          <div className="relative z-10 px-4 max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Join Our <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Team</span>
            </h1>
            <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto font-light">
              Help us shape the future of academic excellence in Bangladesh. Explore active openings or drop your credentials for future slots.
            </p>
          </div>
        </section>

        <section className="relative pb-24 px-4 sm:px-6 lg:px-8 bg-black z-10">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold tracking-wide text-white/90">Active Openings</h2>
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    Operations
                  </span>
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    Full-time
                  </span>
                </div>

                <h3 className="text-2xl font-semibold mb-2 text-white">Project Manager</h3>
                <p className="text-sm text-white/70 mb-6 leading-relaxed">
                  Oversee execution tracks of upcoming ACOB Olympiad cycles, manage cross-functional team milestones, and streamline ecosystem communication.
                </p>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  <p className="text-xs font-semibold tracking-wider text-white/40 uppercase">Key Priorities:</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-purple-400">✦</span> Timeline & sprint management
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-400">✦</span> Stakeholder coordination
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.01] border border-white/5 text-xs text-white/50 space-y-2">
                <p className="font-medium text-white/70">Looking for other vectors?</p>
                <p>
                  We are constantly on the lookout for talented researchers, developers, visual designers, and community builders. Use the portal to place your talent profile on file.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 shadow-xl backdrop-blur-sm min-h-[400px] flex flex-col justify-center">
                {status === 'success' ? (
                  <div className="text-center space-y-4 py-8">
                    <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-white">Application Received!</h3>
                    <p className="text-sm text-white/70 max-w-sm mx-auto leading-relaxed">
                      Thank you for applying. Your profile has been safely uploaded straight to our core review committee. We will look over your details soon!
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-4 px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-medium tracking-wide transition-all text-white/80 hover:text-white"
                    >
                      Submit Another Profile
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-white">Application Portal</h3>
                      <p className="text-xs text-white/60 mt-1">
                        Submit your profile directly to our core evaluation committee.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider text-white/60 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Saimon Khan"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/80 transition-all text-sm"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider text-white/60 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/80 transition-all text-sm"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider text-white/60 mb-2">
                          Applying For
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Project Manager, Graphic Designer"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/80 transition-all text-sm"
                          value={formData.position}
                          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider text-white/60 mb-2">
                          Cover Note / Message
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Tell us briefly what makes you a great fit for ACOB..."
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/80 transition-all text-sm resize-none"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-medium text-sm rounded-xl transition-all duration-300 shadow-md shadow-purple-900/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {status === 'loading' ? 'Processing Submission...' : 'Submit Application'}
                      </button>

                      {status === 'error' && (
                        <p className="text-xs text-rose-400 text-center mt-2 font-medium">
                          ✕ Submission failed. Please try again or email us directly.
                        </p>
                      )}
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
*/}