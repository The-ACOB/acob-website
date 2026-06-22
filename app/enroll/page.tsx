'use client';

import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  classLevel: string;
  heardAboutUs: string;
}

const CLASS_OPTIONS = [
  { value: "Class 8-9", label: "Class 8 - 9 (Junior Category)" },
  { value: "Class 10 / SSC", label: "Class 10 / SSC Candidates" },
  { value: "Class 11-12 / HSC", label: "Class 11 - 12 / HSC Candidates" },
  { value: "Undergraduate", label: "University Undergraduate" }
];

export default function EnrollPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    classLevel: '',
    heardAboutUs: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Custom Dropdown UI State
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectTier = (value: string) => {
    setFormData({ ...formData, classLevel: value });
    setDropdownOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.classLevel) {
      alert("Please select your current academic level.");
      return;
    }
    setSubmitting(true);

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzQvaKOVH7z9LjToA8rSp37ZhiOmqmElcAB6B2nK2lHjtzU7yBHfjywc_87XlaH5MfJYQ/exec";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Please check your connection and try again!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans antialiased relative overflow-hidden selection:bg-purple-500 selection:text-white pt-20 pb-12">
      
      {/* Global CSS Inject for Ultra-Clean Self-Drawing SVG Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drawRing {
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        @keyframes subtleSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes menuReveal {
          from { opacity: 0; transform: translateY(-4px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-draw-ring {
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
          animation: drawRing 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-draw-check {
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          animation: drawCheck 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
        }
        .animate-slide-up {
          animation: subtleSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-menu-reveal {
          animation: menuReveal 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* Premium Subtle Grid Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e12_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* Ambient Glow Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 relative z-10">
        
        {/* Main Grid Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Visual Content Hook */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32 select-none transition-all duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-wider text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 rounded-full backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              JOIN THE NEXT GENERATION
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Join Our <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Waitlist
              </span>
            </h1>
            
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light max-w-md">
              Be the first to know when registrations officially open. Secure your spot and get exclusive access to preliminary study materials.
            </p>

            <div className="hidden lg:block border-t border-gray-800/60 pt-6">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-purple-900/50 border border-gray-800" />
                  <div className="w-7 h-7 rounded-full bg-cyan-900/50 border border-gray-800" />
                  <div className="w-7 h-7 rounded-full bg-indigo-900/50 border border-gray-800" />
                </div>
                <span>Securing early access tier slots</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form Window */}
          <div className="lg:col-span-7">
            <div className="bg-[#07080c]/50 backdrop-blur-md border border-white/[0.05] rounded-2xl p-6 sm:p-8 shadow-2xl relative transition-all duration-300">
              
              {/* Subtle Decorative Corner Marks */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gray-700 rounded-tl-2xl pointer-events-none select-none" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gray-700 rounded-br-2xl pointer-events-none select-none" />

              {!submitted ? (
                /* --- ACTIVE ENTRY FORM --- */
                <form onSubmit={handleSubmit} className="space-y-5 animate-slide-up">
                  
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fullName" className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5 select-none">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        required
                        disabled={submitting}
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-[#0d0f16]/90 border border-white/[0.06] rounded-xl px-4 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200 disabled:opacity-40"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5 select-none">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        disabled={submitting}
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#0d0f16]/90 border border-white/[0.06] rounded-xl px-4 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200 disabled:opacity-40"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5 select-none">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        disabled={submitting}
                        placeholder="+880 1XXX XXXXXX"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-[#0d0f16]/90 border border-white/[0.06] rounded-xl px-4 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200 disabled:opacity-40"
                      />
                    </div>

                    <div>
                      <label htmlFor="institution" className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5 select-none">
                        Educational Institution
                      </label>
                      <input
                        type="text"
                        name="institution"
                        id="institution"
                        required
                        disabled={submitting}
                        placeholder="School / College / University"
                        value={formData.institution}
                        onChange={handleChange}
                        className="w-full bg-[#0d0f16]/90 border border-white/[0.06] rounded-xl px-4 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200 disabled:opacity-40"
                      />
                    </div>
                  </div>

                  {/* Row 3 - PREMIUM CUSTOM SELECT DROPDOWN */}
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5 select-none">
                      Current Academic Level / Class
                    </label>
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        disabled={submitting}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className={`w-full bg-[#0d0f16]/90 border text-left rounded-xl px-4 py-2.5 text-sm flex items-center justify-between transition-all duration-200 disabled:opacity-40 select-none ${
                          dropdownOpen 
                            ? 'border-cyan-500/80 ring-1 ring-cyan-500/30 text-white shadow-lg shadow-cyan-500/5' 
                            : 'border-white/[0.06] text-gray-300'
                        }`}
                      >
                        <span>
                          {formData.classLevel 
                            ? CLASS_OPTIONS.find(opt => opt.value === formData.classLevel)?.label 
                            : "Select your tier level"}
                        </span>
                        <svg 
                          className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${dropdownOpen ? 'transform rotate-180 text-cyan-400' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor" 
                          strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Animated Dropdown Floating Window Menu */}
                      {dropdownOpen && (
                        <div className="absolute z-50 w-full mt-2 bg-[#090b11] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl animate-menu-reveal select-none">
                          <div className="p-1.5 space-y-0.5">
                            {CLASS_OPTIONS.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelectTier(option.value)}
                                className={`w-full text-left px-3.5 py-2.5 text-sm rounded-lg transition-all duration-150 flex items-center justify-between ${
                                  formData.classLevel === option.value
                                    ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-cyan-400 font-medium border border-cyan-500/20'
                                    : 'text-gray-400 hover:bg-white/[0.03] hover:text-white'
                                }`}
                              >
                                <span>{option.label}</span>
                                {formData.classLevel === option.value && (
                                  <svg className="w-4 h-4 text-cyan-400 transition-scale" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div>
                    <label htmlFor="heardAboutUs" className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5 select-none">
                      How did you hear about ACOB?
                    </label>
                    <input
                      type="text"
                      name="heardAboutUs"
                      id="heardAboutUs"
                      disabled={submitting}
                      placeholder="Facebook, Friend, Institution, etc."
                      value={formData.heardAboutUs}
                      onChange={handleChange}
                      className="w-full bg-[#0d0f16]/90 border border-white/[0.06] rounded-xl px-4 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200 disabled:opacity-40"
                    />
                  </div>

                  {/* Important Disclaimer Banner */}
                  <div className="bg-purple-950/10 border border-purple-500/10 rounded-xl p-3.5 text-[11px] text-purple-300/80 leading-relaxed font-light select-none">
                    <strong className="text-purple-400 font-semibold mr-1">Note:</strong> This is a preliminary registration/waitlist form. Submitting your details secures your early priority tier. When formal database profiles go live, you will receive an invitation link to finish final authentication and onboarding.
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-purple-950/40 disabled:to-indigo-950/40 disabled:text-gray-500 text-white font-medium px-6 py-3 rounded-xl shadow-lg transition-all duration-300 cursor-pointer text-center text-sm tracking-wide disabled:cursor-not-allowed transform active:scale-[0.995] select-none"
                    >
                      {submitting ? "Processing Submission..." : "Join Our Waitlist"}
                    </button>
                  </div>
                </form>
              ) : (
                /* --- PREMIUM SELF-DRAWING SUCCESS SCREEN --- */
                <div className="text-center py-8 px-2 flex flex-col items-center justify-center animate-slide-up select-none">
                  
                  {/* High-End Self-Drawing Vector Checkmark */}
                  <div className="h-16 w-16 mb-6 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-full blur-md" />
                    <svg className="w-16 h-16 relative z-10" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Drawing Circle Rim */}
                      <circle 
                        cx="25" 
                        cy="25" 
                        r="23" 
                        stroke="url(#successGradient)" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                        className="animate-draw-ring"
                      />
                      {/* Drawing Check Vector */}
                      <path 
                        d="M16 26l6 6 12-12" 
                        stroke="#22d3ee" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="animate-draw-check"
                      />
                      <defs>
                        <linearGradient id="successGradient" x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 tracking-tight">
                    You're on the list!
                  </h3>
                  
                  <p className="text-cyan-400 font-medium text-xs sm:text-sm mb-6 max-w-xs">
                    Your priority slot for the ACOB waitlist is now secure.
                  </p>

                  <div className="max-w-md w-full bg-[#0d0f16]/60 border border-white/[0.04] rounded-xl p-5 text-gray-400 text-xs sm:text-sm leading-relaxed space-y-3 text-left">
                    <div className="flex gap-3 items-start">
                      <span className="text-purple-400 mt-0.5 flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>
                      </span>
                      <p><strong className="text-white font-medium">Welcome early bird!</strong> We are currently setting up the official syllabus, guidelines, and competition brackets behind the scenes.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="text-purple-400 mt-0.5 flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </span>
                      <p>Before standard registration opens up to the public, we will send an email directly to your inbox with your official invitation link and initial study guides.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => window.location.href = '/'}
                    className="mt-6 px-5 py-2 bg-transparent hover:bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs font-medium tracking-wide text-gray-400 hover:text-white transition duration-200 cursor-pointer"
                  >
                    Back to Homepage
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

{/*
'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  classLevel: string;
  heardAboutUs: string;
}

export default function EnrollPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    classLevel: '',
    heardAboutUs: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const GOOGLE_SCRIPT_URL =
      'https://script.google.com/macros/s/AKfycbzQvaKOVH7z9LjToA8rSp37ZhiOmqmElcAB6B2nK2lHjtzU7yBHfjywc_87XlaH5MfJYQ/exec';

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Something went wrong. Please check your connection and try again!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased relative overflow-hidden selection:bg-purple-500 selection:text-white pt-24">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-purple-400 bg-purple-950/40 border border-purple-800/50 rounded-full mb-4">
            Join the Next Generation
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Join Our{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Waitlist
            </span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Be the first to know when registrations officially open. Secure your spot and get exclusive access to preliminary study materials.
          </p>
        </div>

        <div className="bg-[#0b0c10]/60 backdrop-blur-md border border-gray-800/80 rounded-2xl p-6 sm:p-10 shadow-2xl transition-all duration-300">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    disabled={submitting}
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-[#12141c] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-200 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={submitting}
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#12141c] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-200 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    disabled={submitting}
                    placeholder="+880 1XXX XXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#12141c] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-200 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                    Educational Institution
                  </label>
                  <input
                    type="text"
                    name="institution"
                    required
                    disabled={submitting}
                    placeholder="School / College / University name"
                    value={formData.institution}
                    onChange={handleChange}
                    className="w-full bg-[#12141c] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-200 disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Current Academic Level / Class
                </label>
                <select
                  name="classLevel"
                  required
                  disabled={submitting}
                  value={formData.classLevel}
                  onChange={handleChange}
                  className="w-full bg-[#12141c] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-200 cursor-pointer disabled:opacity-50"
                >
                  <option value="" disabled>
                    Select your level
                  </option>
                  <option value="Class 8-9">Class 8 - 9 (Junior Category)</option>
                  <option value="Class 10 / SSC">Class 10 / SSC Candidates</option>
                  <option value="Class 11-12 / HSC">Class 11 - 12 / HSC Candidates</option>
                  <option value="Undergraduate">University Undergraduate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  How did you hear about ACOB?
                </label>
                <input
                  type="text"
                  name="heardAboutUs"
                  disabled={submitting}
                  placeholder="Facebook, Friend, Institution, etc."
                  value={formData.heardAboutUs}
                  onChange={handleChange}
                  className="w-full bg-[#12141c] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-200 disabled:opacity-50"
                />
              </div>

              <div className="bg-purple-950/20 border border-purple-900/40 rounded-xl p-4 text-xs text-purple-300 leading-relaxed">
                <strong>Note:</strong> This is a preliminary registration/waitlist form.
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-purple-950 disabled:to-indigo-950 disabled:text-gray-400 text-white font-medium px-6 py-3.5 rounded-lg shadow-lg transition-all duration-200 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Processing Submission...' : 'Join Our Waitlist'}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-10 px-4 flex flex-col items-center justify-center">
              <div className="h-16 w-16 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                You're on the list!
              </h3>

              <p className="text-cyan-400 font-medium text-sm sm:text-base mb-8 max-w-md">
                Your priority slot for the ACOB waitlist is now secure.
              </p>

              <button
                onClick={() => window.location.href = '/'}
                className="mt-8 px-6 py-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg text-xs sm:text-sm font-medium tracking-wide text-gray-300 transition duration-200"
              >
                Back to Homepage
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-600 mt-8">
          © 2026 Applied Cognitio Olympiad Bangladesh. All rights reserved.
        </p>
      </div>
    </div>
  );
}
*/}