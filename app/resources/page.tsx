'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/page-transition';
import { ArrowRight, BookOpen, Video, Download, Sparkles, FolderDown, ArrowUpRight, Lock } from 'lucide-react';

const resources = [
  {
    category: 'Study Guides',
    icon: BookOpen,
    badgeColor: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    items: [
      {
        title: 'ACOB Problem-Solving Framework',
        desc: 'Master the systematic approach to tackling complex problems',
        type: 'PDF',
      },
      {
        title: 'Critical Thinking Workbook',
        desc: 'Develop analytical skills with curated exercises',
        type: 'PDF',
      },
      {
        title: 'Past Papers Analysis 2023-2024',
        desc: 'Understand problem patterns and solution strategies',
        type: 'PDF',
      },
    ],
  },
  {
    category: 'Video Tutorials',
    icon: Video,
    badgeColor: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    items: [
      {
        title: 'Getting Started with ACOB',
        desc: 'Introduction to the competition format and expectations',
        type: 'Video',
      },
      {
        title: 'Time Management Strategies',
        desc: 'Excel in competitive exams with smart planning',
        type: 'Video',
      },
      {
        title: 'Expert Tips & Tricks',
        desc: 'Learn secrets from ACOB winners',
        type: 'Video',
      },
    ],
  },
  {
    category: 'Competition Resources',
    icon: Download,
    badgeColor: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    items: [
      {
        title: 'Sample Problems & Solutions',
        desc: 'Practice with actual ACOB-level problems',
        type: 'Download',
      },
      {
        title: 'Competition Rules Handbook',
        desc: 'Complete guide to ACOB rules and regulations',
        type: 'Download',
      },
      {
        title: 'Registration Checklist',
        desc: 'Everything you need before competition day',
        type: 'Download',
      },
    ],
  },
];

export default function Resources() {
  // FEATURE FLAG: Set this to true to show all the resource items instantly!
  const isLive = false;
  
  const [activeTab, setActiveTab] = useState(0);

  return (
    <PageTransition>
      <main className="min-h-screen bg-black text-white relative overflow-hidden">
        
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-0 left-1/3 w-[800px] h-[350px] bg-cyan-500/5 rounded-full blur-[130px]" />
          <div className="absolute top-20 right-1/3 w-[800px] h-[350px] bg-purple-500/5 rounded-full blur-[130px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1100px] h-[300px] bg-purple-950/10 rounded-full blur-[150px]" />
        </div>

        <section className="relative min-h-[45vh] w-full flex flex-col items-center justify-center pt-32 sm:pt-40 pb-12 sm:pb-16 z-10">
          <div className="relative px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none"
            >
              Learning <span className="bg-gradient-to-r from-cyan-400 via-indigo-200 to-purple-400 bg-clip-text text-transparent brightness-110">Resources</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-neutral-400 font-light max-w-xl mx-auto leading-relaxed"
            >
              Comprehensive study materials to prepare for ACOB success
            </motion.p>
          </div>
        </section>

        {/* Main Content Controlled by isLive Flag */}
        <section className="relative pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-5xl mx-auto">
            
            <AnimatePresence mode="wait">
              {!isLive ? (
                /* Premium "Coming Soon" Placeholder View */
                <motion.div
                  key="coming-soon"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center py-20 px-6 rounded-3xl bg-neutral-950/40 border border-neutral-900/80 backdrop-blur-xl text-center shadow-3xl min-h-[400px] relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                  
                  <div className="mb-6 relative inline-flex p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-cyan-400/80 shadow-inner group-hover:border-cyan-500/20 transition-all duration-500">
                    <Lock size={28} className="animate-pulse" />
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
                    Resources Coming Soon
                  </h2>
                  <p className="text-neutral-400 text-sm sm:text-base font-light max-w-sm leading-relaxed">
                    Our team is gathering the best study guides and practice papers to help you prepare for the competition. Stay tuned!
                  </p>
                  
                  <div className="mt-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/60 border border-neutral-800/80 text-[11px] text-neutral-500 tracking-wide font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
                    STATUS: UPDATING MATERIALS
                  </div>
                </motion.div>
              ) : (
                /* Complete Premium Layout Architecture (Fully Saved & Operational) */
                <motion.div
                  key="live-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Navigation Tab Bar */}
                  <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-2 p-1.5 rounded-2xl bg-neutral-950/80 border border-neutral-900 backdrop-blur-xl mb-12 sm:mb-16 shadow-2xl">
                    {resources.map((category, idx) => {
                      const Icon = category.icon;
                      const isSelected = activeTab === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveTab(idx)}
                          className={`relative flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 select-none ${
                            isSelected ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                          }`}
                        >
                          <Icon size={16} className={`transition-colors duration-300 ${isSelected ? 'text-cyan-400' : 'text-neutral-600'}`} />
                          <span className="relative z-10">{category.category}</span>
                          {isSelected && (
                            <motion.div
                              layoutId="activeResourceTab"
                              className="absolute inset-0 bg-neutral-900 border border-neutral-800/60 rounded-xl z-0 shadow-inner"
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Content Display Deck */}
                  <div className="min-h-[320px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                      >
                        {resources[activeTab].items.map((item, itemIdx) => (
                          <motion.div
                            key={itemIdx}
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.3 }}
                            className="group relative flex flex-col justify-between p-6 rounded-2xl bg-neutral-950/40 border border-neutral-900 hover:border-cyan-500/20 shadow-xl backdrop-blur-md transition-all duration-300 cursor-pointer overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <div>
                              <div className="flex items-start justify-between gap-4 mb-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-semibold tracking-wider uppercase border ${resources[activeTab].badgeColor}`}>
                                  {item.type}
                                </span>
                                <div className="p-1.5 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-500 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all duration-300">
                                  <ArrowUpRight size={14} />
                                </div>
                              </div>
                              <h3 className="text-lg font-semibold text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors duration-300">
                                {item.title}
                              </h3>
                              <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed mt-2">
                                {item.desc}
                              </p>
                            </div>
                            <div className="w-full h-[1px] bg-neutral-900 group-hover:bg-cyan-500/30 transition-colors duration-300 mt-6" />
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Premium Action Core Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-20 relative rounded-3xl p-8 sm:p-12 text-center bg-gradient-to-b from-neutral-950/80 to-neutral-950/30 border border-neutral-900 backdrop-blur-xl shadow-2xl overflow-hidden group"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                <div className="mx-auto inline-flex p-3 rounded-2xl bg-purple-950/40 border border-purple-500/20 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.05)]">
                  <FolderDown size={22} className="animate-bounce" />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Get Premium Access to All Resources
                </h3>
                
                <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-xl mx-auto">
                  Register for ACOB to unlock exclusive study materials, mentorship sessions, and expert guidance.
                </p>
                
                <div className="pt-4">
                  <motion.a
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    href="/enroll"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-medium text-sm rounded-xl shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 border border-white/10"
                  >
                    <span>Join Our Waitlist</span>
                    <ArrowRight size={16} />
                  </motion.a>
                </div>
              </div>
            </motion.div>

          </div>
        </section>
      </main>
    </PageTransition>
  );
}


{/*
import PageTransition from '@/components/page-transition';
import { ArrowRight, BookOpen, Video, Download } from 'lucide-react';

export const metadata = {
  title: 'Resources | ACOB - Study Materials & Guides',
  description:
    'Access study materials, video tutorials, and preparation guides for ACOB competition.',
};

const resources = [
  {
    category: 'Study Guides',
    icon: BookOpen,
    items: [
      {
        title: 'ACOB Problem-Solving Framework',
        desc: 'Master the systematic approach to tackling complex problems',
        type: 'PDF',
      },
      {
        title: 'Critical Thinking Workbook',
        desc: 'Develop analytical skills with curated exercises',
        type: 'PDF',
      },
      {
        title: 'Past Papers Analysis 2023-2024',
        desc: 'Understand problem patterns and solution strategies',
        type: 'PDF',
      },
    ],
  },
  {
    category: 'Video Tutorials',
    icon: Video,
    items: [
      {
        title: 'Getting Started with ACOB',
        desc: 'Introduction to the competition format and expectations',
        type: 'Video',
      },
      {
        title: 'Time Management Strategies',
        desc: 'Excel in competitive exams with smart planning',
        type: 'Video',
      },
      {
        title: 'Expert Tips & Tricks',
        desc: 'Learn secrets from ACOB winners',
        type: 'Video',
      },
    ],
  },
  {
    category: 'Competition Resources',
    icon: Download,
    items: [
      {
        title: 'Sample Problems & Solutions',
        desc: 'Practice with actual ACOB-level problems',
        type: 'Download',
      },
      {
        title: 'Competition Rules Handbook',
        desc: 'Complete guide to ACOB rules and regulations',
        type: 'Download',
      },
      {
        title: 'Registration Checklist',
        desc: 'Everything you need before competition day',
        type: 'Download',
      },
    ],
  },
];

export default function Resources() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-black">
        <section className="relative min-h-[50vh] w-full overflow-hidden bg-black flex flex-col items-center justify-center pt-32 sm:pt-40 pb-16 sm:pb-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 via-black to-purple-950/30" />
            <div className="absolute top-1/3 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Learning{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Resources
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/80 font-light leading-relaxed">
              Comprehensive study materials to prepare for ACOB success
            </p>
          </div>
        </section>

        <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-16">
              {resources.map((category, idx) => {
                const Icon = category.icon;

                return (
                  <div key={idx} className="space-y-6">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-purple-600/50 to-cyan-600/30 border border-purple-500/30">
                        <Icon className="w-6 h-6 text-purple-200" />
                      </div>

                      <h2 className="text-2xl font-semibold text-white">
                        {category.category}
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {category.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="group p-6 rounded-xl glassmorphic border border-white/15 hover:border-cyan-500/50 transition-all cursor-pointer hover:shadow-[0_0_30px_rgba(0,217,255,0.15)]"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                                {item.title}
                              </h3>

                              <p className="text-sm text-white/70">
                                {item.desc}
                              </p>
                            </div>

                            <ArrowRight className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                          </div>

                          <div className="mt-4 pt-4 border-t border-white/10">
                            <span className="text-xs font-semibold text-cyan-400/90">
                              {item.type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-purple-600/20 via-black to-cyan-600/20 border border-white/20 rounded-3xl p-12 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                Get Premium Access to All Resources
              </h3>

              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Register for ACOB to unlock exclusive study materials,
                mentorship sessions, and expert guidance.
              </p>

              <a
                href="/enroll"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold rounded-lg transition-all"
              >
                Join Our Waitlist
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}

*/}