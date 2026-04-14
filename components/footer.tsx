'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/10 mt-32 bg-gradient-to-b from-black to-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand - Full Width on Mobile */}
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
                  className="h-28 w-auto sm:h-36 opacity-100 transition-opacity object-contain" 
                  style={{ color: 'transparent' }} 
                  src="/acob-footer-logo.png"
                />
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-md mt-4">
                A premier academic competition fostering critical thinking, problem-solving excellence, and intellectual innovation among Bangladesh&apos;s brightest minds.
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
                href="mailto:official.acobd@gmail.com"
                className="p-3 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-white/60 hover:text-cyan-400 transition-all duration-300"
                title="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">Team</span>
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">Opportunities</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Resources</h4>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="https://makeform.ai/f/2u09IMK6" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Join Our Waitlist</span>
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">Career Paths</span>
                </Link>
              </li>
              <li>
                <a href="mailto:official.acobd@gmail.com" className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">Get Support</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-xs sm:text-sm">
              © 2024 Applied Cognitio Olympiad Bangladesh. All rights reserved.
            </p>
            <p className="text-white/40 text-xs sm:text-sm">
              Built with excellence by{' '}
              <span className="font-semibold text-white/60">Glitched Tech</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
