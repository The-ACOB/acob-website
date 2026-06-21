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

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz6UYvfW7DUd2AetGmLlVVV8o-IOsM8wIy9LRpA_vCSLnRkzVjPO71KxFSQJ9f-HV0HoQ/exec';

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        position: formData.position,
        message: formData.message,
      };

      // Sending as plain text guarantees browsers don't trigger restrictive CORS blockades
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload),
      });

      setStatus('success');
      // State clearing sequence loop
      setFormData({ name: '', email: '', position: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-black text-white">
        
        {/* Hero Banner Section */}
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

        {/* Core Layout Structure */}
        <section className="relative pb-24 px-4 sm:px-6 lg:px-8 bg-black z-10">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Frame: Vacant Job Profiles Display */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold tracking-wide text-white/90">Active Openings</h2>
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
              </div>

              {/* Single Open Profile Layout Block */}
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

              {/* General Applications Subtext Box */}
              <div className="p-5 rounded-xl bg-white/[0.01] border border-white/5 text-xs text-white/50 space-y-2">
                <p className="font-medium text-white/70">Looking for other vectors?</p>
                <p>We are constantly on the lookout for talented researchers, developers, visual designers, and community builders. Use the portal to place your talent profile on file.</p>
              </div>
            </div>

            {/* Right Frame: App Intake Engine Container Card */}
            <div className="lg:col-span-7">
              <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 shadow-xl backdrop-blur-sm min-h-[400px] flex flex-col justify-center">
                
                {status === 'success' ? (
                  /* Form Replaced by Custom Success State Block */
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
                  /* Standard Operational Form Fields Display */
                  <>
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-white">Application Portal</h3>
                      <p className="text-xs text-white/60 mt-1">Submit your profile directly to our core evaluation committee.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider text-white/60 mb-2">Full Name</label>
                        <input 
                          type="text"
                          required
                          placeholder="e.g., Saimon Khan"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/80 transition-all text-sm"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider text-white/60 mb-2">Email Address</label>
                        <input 
                          type="email"
                          required
                          placeholder="name@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/80 transition-all text-sm"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider text-white/60 mb-2">Applying For</label>
                        <input 
                          type="text"
                          required
                          placeholder="e.g., Project Manager, Graphic Designer"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/80 transition-all text-sm"
                          value={formData.position}
                          onChange={(e) => setFormData({...formData, position: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider text-white/60 mb-2">Cover Note / Message</label>
                        <textarea 
                          rows={4}
                          placeholder="Tell us briefly what makes you a great fit for ACOB..."
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/80 transition-all text-sm resize-none"
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                      </div>

                      {/* Execution Button Tracker */}
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