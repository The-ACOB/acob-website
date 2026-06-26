'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, X, ArrowRight, Play, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function PodcastPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup this session to guard UX
    const hasSeenPopup = sessionStorage.getItem('acob_podcast_popup_seen');
    if (!hasSeenPopup) {
      // Small intentional delay for a highly cinematic entry after page elements load
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('acob_podcast_popup_seen', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          
          {/* Glass Backdrop Overlap */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Premium Animated Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-neutral-950 border border-neutral-900 shadow-[0_0_50px_rgba(6,182,212,0.15)] backdrop-blur-2xl z-10 p-6 sm:p-8"
          >
            {/* Top-Right Cyber Glowing Accent Mesh */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            
            {/* Premium Top Thin Neon Border Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

            {/* Absolute Dismiss Button Close Controller */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-neutral-900/50 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all duration-300"
              aria-label="Close Announcement"
            >
              <X size={16} />
            </button>

            {/* Content Layout Engine */}
            <div className="space-y-6 text-left relative z-10">
              
              {/* Premium Floating Mini Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-mono font-medium tracking-wider uppercase">
                <Sparkles size={12} className="animate-pulse" />
                <span>New Release</span>
              </div>

              {/* Main Info Row Segment */}
              <div className="flex gap-4 sm:gap-5 items-start">
                {/* Cinematic Icon Visual Matrix */}
                <div className="relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 flex items-center justify-center text-cyan-400 shadow-inner group">
                  <Headphones size={24} className="relative z-10 text-cyan-400" />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-2xl bg-cyan-500/10 blur-md pointer-events-none" 
                  />
                </div>

                {/* Typography Engine Headers */}
                <div className="space-y-1.5 flex-1 pr-6">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                    Inside Excellence <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Podcast</span>
                  </h3>
                  <p className="text-xs sm:text-sm font-light text-neutral-400 leading-relaxed">
                    Episode #01 is officially live. Discover how elite gold medalists map out advanced study routines and break down problem frameworks.
                  </p>
                </div>
              </div>

              {/* Highlight Track Interactive Visual Card Preview */}
              <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-900/80 backdrop-blur-sm flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1 space-y-0.5">
                  <span className="text-[9px] font-mono text-neutral-500 font-semibold tracking-wider uppercase">Now Streaming</span>
                  <h4 className="text-sm font-semibold text-neutral-200 line-clamp-1">How Naseeb Became an Olympiad Enthusiast</h4>
                </div>
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Play size={12} className="fill-cyan-400 ml-0.5" />
                </div>
              </div>

              {/* Interactive Call-To-Action Button Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href="/resources#podcast"
                  onClick={handleClose}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-sm rounded-xl shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 border border-white/10 text-center group"
                >
                  <span>Start Listening Now</span>
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </Link>
                
                <button
                  onClick={handleClose}
                  className="px-5 py-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 font-medium hover:text-neutral-200 hover:border-neutral-700 transition-all duration-300 text-center"
                >
                  Maybe Later
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}