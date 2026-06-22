'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Mail, ArrowRight, ShieldCheck, Cpu, Linkedin, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-neutral-900 bg-black overflow-hidden">
      {/* Dynamic Background Mesh & Ambient Glow Elements */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute -bottom-10 left-1/4 w-[500px] h-[200px] bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-10 right-1/4 w-[500px] h-[200px] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 pb-16 border-b border-neutral-900">
          
          {/* Brand Info Block */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center">
              <Image 
                alt="ACOB - Applied Cognitio Olympiad Bangladesh" 
                width={240} 
                height={60} 
                className="h-10 w-auto sm:h-12 object-contain filter brightness-110 contrast-105 select-none pointer-events-none mix-blend-screen" 
                src="/acob-footer-logo.png"
                priority
              />
            </div>
            
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm font-normal">
              A premier academic competition fostering critical thinking, problem-solving excellence, and intellectual innovation among Bangladesh&apos;s brightest minds.
            </p>

            {/* Social Links Panel */}
            <div className="flex flex-wrap gap-3 pt-2">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.facebook.com/profile.php?id=61582673745324#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-neutral-950 border border-neutral-900 text-neutral-400 hover:text-purple-400 hover:border-purple-500/30 transition-all duration-300"
                title="Facebook"
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com/company/appliedcognitiobd"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-neutral-950 border border-neutral-900 text-neutral-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all duration-300"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.youtube.com/@appliedcognitiobd"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-neutral-950 border border-neutral-900 text-neutral-400 hover:text-red-400 hover:border-red-500/30 transition-all duration-300"
                title="YouTube"
              >
                <Youtube size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:reachappliedcognitio@gmail.com"
                className="p-3 rounded-xl bg-neutral-950 border border-neutral-900 text-neutral-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300"
                title="Email"
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </div>

          {/* Navigation Directory */}
          <div>
            <h4 className="text-white font-medium text-xs uppercase tracking-widest mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-4 after:h-[2px] after:bg-purple-500">
              Navigation
            </h4>
            <ul className="space-y-3.5">
              {[
                { name: 'Home', href: '/' },
                { name: 'Team', href: '/team' },
                { name: 'Opportunities', href: '/jobs' },
                { name: 'Contact', href: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-neutral-400 hover:text-white text-sm font-normal inline-flex items-center gap-1 group transition-colors duration-300"
                  >
                    <ArrowRight size={12} className="text-purple-500/0 -ml-3 group-hover:text-purple-400 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 ease-out" />
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Directory */}
          <div>
            <h4 className="text-white font-medium text-xs uppercase tracking-widest mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-4 after:h-[2px] after:bg-cyan-500">
              Resources
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link 
                  href="/enroll" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white text-sm font-normal inline-flex items-center gap-1 group transition-colors duration-300"
                >
                  <ArrowRight size={12} className="text-cyan-500/0 -ml-3 group-hover:text-cyan-400 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 ease-out" />
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                    Join Our Waitlist
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/jobs" 
                  className="text-neutral-400 hover:text-white text-sm font-normal inline-flex items-center gap-1 group transition-colors duration-300"
                >
                  <ArrowRight size={12} className="text-cyan-500/0 -ml-3 group-hover:text-cyan-400 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 ease-out" />
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                    Career Paths
                  </span>
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:reachappliedcognitio@gmail.com" 
                  className="text-neutral-400 hover:text-white text-sm font-normal inline-flex items-center gap-1 group transition-colors duration-300"
                >
                  <ArrowRight size={12} className="text-cyan-500/0 -ml-3 group-hover:text-cyan-400 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 ease-out" />
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                    Get Support
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Upgraded Copyright Bar with Premium Badge UI Elements */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Copyright Pill */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-950 border border-neutral-900 text-neutral-500 text-xs shadow-inner select-none">
            <ShieldCheck size={14} className="text-neutral-600" />
            <span>
              © 2025-2026 <span className="text-neutral-400 font-medium">Applied Cognitio Olympiad Bangladesh</span>. All rights reserved.
            </span>
          </div>

          {/* Credits Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-950 border border-neutral-900 text-neutral-500 text-xs shadow-inner select-none">
            <Cpu size={14} className="text-purple-500/50 animate-pulse" />
            <span>
              A joint production by{' '}
              <Link 
                href="/"
                className="relative inline-block font-semibold text-neutral-400 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent hover:brightness-125 transition-all duration-300 group"
              >
                ACOB
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
              </Link>
              {' '} & {' '}
              <Link 
                href="https://glitched-tech.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block font-semibold text-neutral-400 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent hover:brightness-125 transition-all duration-300 group"
              >
                Glitched Tech
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}

{/*
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/10 mt-32 bg-gradient-to-b from-black to-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="mb-6">
              <div className="mb-8">
                <img
                  alt="ACOB - Applied Cognitio Olympiad Bangladesh"
                  loading="lazy"
                  width="600"
                  height="150"
                  decoding="async"
                  data-nimg="1"
                  className="h-10 w-auto sm:h-14 opacity-100 transition-opacity object-contain"
                  style={{ color: 'transparent' }}
                  src="/acob-footer-logo.png"
                />
              </div>

              <p className="text-white/50 text-sm leading-relaxed max-w-md mt-4">
                A premier academic competition fostering critical thinking,
                problem-solving excellence, and intellectual innovation among
                Bangladesh&apos;s brightest minds.
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/profile.php?id=61582673745324#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-white/5 hover:bg-purple-500/20 text-white/60 hover:text-purple-500 transition-all duration-300"
                title="Facebook"
              >
                <Facebook size={20} />
              </a>

              <a
                href="mailto:reachappliedcognitio@gmail.com"
                className="p-3 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-white/60 hover:text-cyan-400 transition-all duration-300"
                title="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Navigation
            </h4>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Home
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/team"
                  className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Team
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/jobs"
                  className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Opportunities
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Resources
            </h4>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/enroll"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Join Our Waitlist
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/jobs"
                  className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Career Paths
                  </span>
                </Link>
              </li>

              <li>
                <a
                  href="mailto:reachappliedcognitio@gmail.com"
                  className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Get Support
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-xs sm:text-sm">
              © 2025-2026 Applied Cognitio Olympiad Bangladesh. All rights
              reserved.
            </p>

            <p className="text-white/40 text-xs sm:text-sm tracking-wide">
              A joint production by{' '}
              <span className="font-semibold text-white/60">ACOB</span>
              {' '} & {' '}
              <Link
                href="https://glitched-tech.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block font-semibold text-white/60 hover:text-cyan-400 transition-colors duration-300 group"
              >
                Glitched Tech
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

*/}