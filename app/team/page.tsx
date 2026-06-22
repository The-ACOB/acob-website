'use client';

import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/page-transition';
import { Terminal, ShieldCheck, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

// Streamlined Content Array with Pure Focus on Individual Profiles
const leadershipTeam = [
  {
    name: 'Muhammad Hasan Zarif',
    role: 'FOUNDER & CEO',
    bio: 'Visionary leader with a passion for fostering academic excellence and innovation across the nation.',
    img: '/muhammad-hasan-zarif.png'
  },
  {
    name: 'Mugdho Sarker',
    role: 'CO-FOUNDER & COO',
    bio: 'Dedicated to creating pathways for talented students to reach their full potential through strategic operations.',
    img: '/mugdho-sarker.png'
  },
  {
    name: 'Khan Jariff Al Naseeb',
    role: 'MANAGING DIRECTOR & CTO',
    bio: 'Expert in ensuring seamless execution of all ACOB initiatives, programs, and large-scale educational events.',
    img: '/khan-jariff-al-naseeb.png'
  }
];

const executiveBoard = [
  { name: 'Tawhid-Ur-Rahman', role: 'Head of Academics & Research', dept: 'Academics & Research' },
  { name: 'Shafayat Hossain', role: 'Communication Manager', dept: 'Marketing and PR' },
  { name: 'Samman Sam', role: 'Content Writer', dept: 'Marketing and PR' },
];

export default function TeamPage() {
  // FEATURE FLAG: Switch between private placeholder or live display roster
  const showTeam = true;

  return (
    <PageTransition>
      <main className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col justify-between cursor-default select-none">
        
        {/* Spatial Cyber Grid Aura */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]" />
          <div className="absolute top-[30%] right-[-10%] w-[800px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px]" />
        </div>

        <AnimatePresence mode="wait">
          {!showTeam ? (
            /* Premium Private View State */
            <motion.div
              key="team-locked"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="relative w-full flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 z-10 pt-32 pb-16"
            >
              <div className="max-w-4xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950 border border-neutral-900 text-[11px] font-mono tracking-wider text-purple-400 uppercase">
                    <Terminal size={12} className="text-cyan-400" />
                    <span>Directory Status: Locked</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none">
                    Meet the <br className="hidden lg:block" />
                    <span className="bg-gradient-to-r from-cyan-400 via-indigo-200 to-purple-400 bg-clip-text text-transparent">Team</span>
                  </h1>
                  <div className="h-[2px] w-24 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto lg:mx-0 rounded-full" />
                  <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                    We are currently finalizing our leadership profiles and executive roster. Check back soon to meet the minds behind ACOB!
                  </p>
                </div>

                <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-[280px] aspect-square rounded-2xl bg-neutral-950 border border-neutral-900 flex flex-col items-center justify-center p-6 shadow-2xl overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
                    <div className="absolute top-2 left-2 text-neutral-800 text-[9px] font-mono select-none">SYS.02</div>
                    <div className="absolute bottom-2 right-2 text-neutral-800 text-[9px] font-mono select-none">//ACOB</div>
                    <div className="p-4 rounded-full bg-neutral-900 border border-neutral-800 text-purple-400 shadow-inner group-hover:border-purple-500/30 transition-all duration-500 transform group-hover:scale-105">
                      <Terminal size={32} className="animate-pulse text-cyan-400" />
                    </div>
                    <div className="mt-6 text-center space-y-1">
                      <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Roster Update</div>
                      <div className="text-[10px] font-mono text-neutral-600 uppercase flex items-center gap-1.5 justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
                        In Progress
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Premium Live Deck View State */
            <motion.div
              key="team-unlocked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24"
            >
              {/* Main Typography Header Section */}
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950 border border-neutral-900 text-xs text-cyan-400 tracking-wider uppercase font-mono">
                  <ShieldCheck size={13} className="text-purple-400 animate-pulse" />
                  <span>Verified Administration</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
                  Our <span className="bg-gradient-to-r from-purple-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent brightness-110">Leadership</span>
                </h1>
                <p className="text-neutral-400 font-light text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
                  Meet the visionary leaders and pioneers driving ACOB's mission forward across Bangladesh.
                </p>
              </div>

              {/* Minimal Geometric Spotlight Roster Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {leadershipTeam.map((member, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="group relative rounded-3xl bg-neutral-950/70 border border-neutral-900 p-8 pt-10 pb-10 flex flex-col justify-start h-full transition-all duration-300 hover:border-neutral-800 shadow-2xl overflow-hidden cursor-default"
                  >
                    {/* Corner Ambient Spill Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/5 to-purple-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Cyber Shield Image Frame Container */}
                    <div className="relative w-32 h-32 mx-auto mb-6 rounded-full p-[2px] bg-gradient-to-b from-neutral-800 to-neutral-900 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-500 shadow-xl overflow-hidden">
                      <div className="w-full h-full rounded-full bg-neutral-950 overflow-hidden flex items-center justify-center relative">
                        <img 
                          src={member.img} 
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-user.jpg';
                          }}
                        />
                      </div>
                    </div>

                    {/* Meta Typography Block */}
                    <div className="text-center space-y-3">
                      <div className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase bg-cyan-950/20 border border-cyan-900/30 px-2.5 py-0.5 rounded-md inline-block">
                        {member.role}
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed pt-1 px-1">
                        {member.bio}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Section Divider: Executive Roster Matrix */}
              <div className="space-y-8 pt-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">Executive Roster</h2>
                  <p className="text-neutral-500 text-xs sm:text-sm font-light">Talented professionals dedicated to excellence across all organizational divisions.</p>
                </div>

                {/* Minimal Grid Table Layout */}
                <div className="rounded-2xl border border-neutral-900 bg-neutral-950/40 backdrop-blur-md overflow-hidden shadow-2xl cursor-default">
                  <div className="hidden md:grid grid-cols-3 gap-4 p-4 border-b border-neutral-900 bg-neutral-950/80 text-[11px] font-mono tracking-wider text-neutral-500 uppercase">
                    <div>Name</div>
                    <div>Position</div>
                    <div>Department</div>
                  </div>

                  <div className="divide-y divide-neutral-900/50">
                    {executiveBoard.map((exec, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-4 text-sm items-center hover:bg-neutral-900/20 transition-colors duration-200 group"
                      >
                        <div className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                          {exec.name}
                        </div>
                        <div className="text-neutral-400 font-light flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-purple-500/60" />
                          {exec.role}
                        </div>
                        <div className="text-neutral-500 text-xs font-mono md:text-left">
                          {exec.dept}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Layout Shift Expansion: Join the Team Action Banner */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-neutral-900 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-900/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden cursor-default"
              >
                <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/5 blur-3xl pointer-events-none" />
                <div className="space-y-2 text-center md:text-left max-w-xl">
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    Want to impact the future of education?
                  </h3>
                  <p className="text-neutral-400 text-sm font-light leading-relaxed">
                    We are always looking for driven, exceptional individuals to expand our academic and operations matrices across the country.
                  </p>
                </div>
                <div>
                  <Link 
                    href="/jobs"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-black hover:bg-neutral-200 font-semibold text-sm tracking-wide transition-all duration-300 shadow-xl group cursor-pointer"
                  >
                    <span>Join the Team</span>
                    <ArrowUpRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </PageTransition>
  );
}
{/*
  import type { Metadata } from 'next';
import Leadership from '@/components/sections/leadership';
import ExecutiveBoard from '@/components/sections/executive-board';
import PageTransition from '@/components/page-transition';

export const metadata: Metadata = {
  title: 'Meet the Team | ACOB - Applied Cognitio Olympiad Bangladesh',
  description: 'Learn about the visionaries and experts leading Applied Cognitio Olympiad Bangladesh (ACOB). Meet our leadership and executive board.',
};

export default function TeamPage() {
  const showTeam = false;

  return (
    <PageTransition>
      <main className="min-h-screen pt-20">
        {showTeam ? (
          <>
            <Leadership />
            <ExecutiveBoard />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <span className="px-3 py-1 text-xs font-semibold tracking-wider text-purple-400 bg-purple-950/40 border border-purple-800/50 rounded-full mb-4 animate-pulse">
              Under Development
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Coming Soon
              </span>
            </h1>
            <p className="text-gray-400 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
              We are currently finalizing our leadership profiles and executive roster. Check back soon to meet the minds behind ACOB!
            </p>
          </div>
        )}
      </main>
    </PageTransition>
  );
}
  */}