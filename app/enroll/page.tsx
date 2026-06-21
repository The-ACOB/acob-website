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

    // Your active Google Apps Script Web App Endpoint URL
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
    <div className="min-h-screen bg-black text-white font-sans antialiased relative overflow-hidden selection:bg-purple-500 selection:text-white pt-24">
      {/* Background Cyber Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-purple-400 bg-purple-950/40 border border-purple-800/50 rounded-full mb-4">
            Join the Next Generation
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Join Our <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Waitlist</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Be the first to know when registrations officially open. Secure your spot and get exclusive access to preliminary study materials.
          </p>
        </div>

        {/* Dynamic Card Container Switch */}
        <div className="bg-[#0b0c10]/60 backdrop-blur-md border border-gray-800/80 rounded-2xl p-6 sm:p-10 shadow-2xl transition-all duration-300">
          
          {!submitted ? (
            /* --- ACTIVE ENTRY FORM --- */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Two-Column Grid: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
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
                    className="w-full bg-[#12141c] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-200 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
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
                    className="w-full bg-[#12141c] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-200 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Two-Column Grid: Phone & Institution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
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
                    className="w-full bg-[#12141c] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-200 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="institution" className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                    Educational Institution
                  </label>
                  <input
                    type="text"
                    name="institution"
                    id="institution"
                    required
                    disabled={submitting}
                    placeholder="School / College / University name"
                    value={formData.institution}
                    onChange={handleChange}
                    className="w-full bg-[#12141c] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-200 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Academic Level Select Menu */}
              <div>
                <label htmlFor="classLevel" className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Current Academic Level / Class
                </label>
                <select
                  name="classLevel"
                  id="classLevel"
                  required
                  disabled={submitting}
                  value={formData.classLevel}
                  onChange={handleChange}
                  className="w-full bg-[#12141c] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-200 cursor-pointer disabled:opacity-50"
                >
                  <option value="" disabled className="bg-[#12141c] text-gray-500">Select your level</option>
                  <option value="Class 8-9" className="bg-[#12141c] text-white">Class 8 - 9 (Junior Category)</option>
                  <option value="Class 10 / SSC" className="bg-[#12141c] text-white">Class 10 / SSC Candidates</option>
                  <option value="Class 11-12 / HSC" className="bg-[#12141c] text-white">Class 11 - 12 / HSC Candidates</option>
                  <option value="Undergraduate" className="bg-[#12141c] text-white">University Undergraduate</option>
                </select>
              </div>

              {/* Discovery Fields */}
              <div>
                <label htmlFor="heardAboutUs" className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
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
                  className="w-full bg-[#12141c] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-200 disabled:opacity-50"
                />
              </div>

              {/* Important Disclaimer Banner */}
              <div className="bg-purple-950/20 border border-purple-900/40 rounded-xl p-4 text-xs text-purple-300 leading-relaxed">
                <strong>Note:</strong> This is a preliminary registration/waitlist form. Submitting your details secures your early priority tier. When formal database profiles go live, you will receive an invitation link to finish final authentication and onboarding.
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-purple-950 disabled:to-indigo-950 disabled:text-gray-400 text-white font-medium px-6 py-3.5 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all duration-200 cursor-pointer text-center text-sm tracking-wide disabled:cursor-not-allowed"
                >
                  {submitting ? "Processing Submission..." : "Join Our Waitlist"}
                </button>
              </div>
            </form>
          ) : (
            /* --- SIMPLIFIED FRIENDLY SUCCESS SCREEN --- */
            <div className="text-center py-10 px-4 flex flex-col items-center justify-center">
              {/* Checkmark Icon */}
              <div className="h-16 w-16 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl shadow-purple-500/20 mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                You're on the list!
              </h3>
              
              <p className="text-cyan-400 font-medium text-sm sm:text-base mb-8 max-w-md">
                Your priority slot for the ACOB waitlist is now secure.
              </p>

              <div className="max-w-md bg-[#12141c]/80 border border-gray-800 rounded-xl p-6 text-gray-400 text-sm leading-relaxed space-y-4 text-left">
                <div className="flex gap-3 items-start">
                  <span className="text-purple-400 text-base">👋</span>
                  <p><strong>Welcome early bird!</strong> We are currently setting up the official syllabus, guidelines, and competition brackets behind the scenes.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-purple-400 text-base">📧</span>
                  <p>Before standard registration opens up to the public, we will send an email directly to your inbox with your official invitation link and initial study guides.</p>
                </div>
              </div>

              <button
                onClick={() => window.location.href = '/'}
                className="mt-8 px-6 py-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg text-xs sm:text-sm font-medium tracking-wide text-gray-300 transition duration-200 cursor-pointer"
              >
                Back to Homepage
              </button>
            </div>
          )}

        </div>

        {/* Footer brand line */}
        <p className="text-center text-xs text-gray-600 mt-8">
          © 2026 Applied Cognitio Olympiad Bangladesh. All rights reserved.
        </p>
      </div>
    </div>
  );
}