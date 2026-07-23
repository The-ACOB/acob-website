'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import logoImg from '@/public/only_logo_transparent-(white).png';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/resources', label: 'Resources' },
  { href: '/verify', label: 'Verify Certificate' },
  { href: '/team', label: 'Team' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-5 left-0 right-0 z-50 px-4 sm:px-6 select-none">
        <div className="max-w-7xl mx-auto relative">
          
          {/* 10. Animated Border Glow & Dynamic Shifting Pill */}
          <div
            className={`
              relative
              flex
              items-center
              justify-between
              rounded-2xl
              border
              before:absolute
              before:inset-0
              before:rounded-2xl
              before:bg-gradient-to-r
              before:from-purple-500/[0.03]
              before:via-transparent
              before:to-cyan-500/[0.03]
              transition-all
              duration-500
              hover:border-purple-500/20
              hover:shadow-[0_0_40px_rgba(168,85,247,0.12)]
              ${
                scrolled
                  ? 'border-white/10 bg-black/70 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-6xl mx-auto'
                  : 'border-white/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.3)] w-full'
              }
            `}
          >
            {/* Ambient Top Glow Accent Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent z-10" />

            {/* Content Container */}
            <div 
              className={`w-full flex items-center justify-between px-6 lg:px-8 transition-all duration-500 relative z-10 ${
                scrolled ? 'h-[68px]' : 'h-[78px]'
              }`}
            >
              
              {/* Logo Area */}
              <Link
                href="/"
                className="group flex items-center relative z-50 shrink-0"
              >
                {/* 2. Floating Orb Behind the Logo */}
                <div
                  className="
                    absolute
                    left-6
                    top-1/2
                    -translate-y-1/2
                    w-12
                    h-12
                    rounded-full
                    bg-purple-500/20
                    blur-2xl
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-700
                    pointer-events-none
                  "
                />

                {/* 1. Upgrade the Logo Hover Scaling Container */}
                <div
                  className="
                    relative
                    w-[170px]
                    sm:w-[210px]
                    h-[50px]
                    sm:h-[60px]
                    transition-all
                    duration-500
                    group-hover:scale-[1.05]
                  "
                >
                  <Image
                    src={logoImg}
                    alt="ACOB"
                    fill
                    priority
                    className="
                      object-contain
                      object-left
                      transition-all
                      duration-500
                      drop-shadow-[0_0_20px_rgba(168,85,247,0.25)]
                      group-hover:drop-shadow-[0_0_28px_rgba(168,85,247,0.45)]
                    "
                  />
                </div>
              </Link>

              {/* Desktop Links */}
              <div className="hidden lg:flex items-center gap-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="
                      relative
                      group
                      text-sm
                      font-medium
                      text-neutral-300
                      py-2
                      px-1
                      transition-all
                      duration-300
                      hover:-translate-y-[2px]
                    "
                  >
                    {/* 4. Soft Glow Behind Text */}
                    <div
                      className="
                        absolute
                        inset-0
                        rounded-lg
                        opacity-0
                        blur-xl
                        bg-gradient-to-r
                        from-purple-500/20
                        to-cyan-500/20
                        transition-all
                        duration-300
                        group-hover:opacity-100
                      "
                    />

                    {/* 5. Animated Hover Spark */}
                    <div
                      className="
                        absolute
                        top-0
                        right-0
                        w-1
                        h-1
                        rounded-full
                        bg-cyan-400
                        opacity-0
                        group-hover:opacity-100
                        group-hover:animate-ping
                      "
                    />

                    {/* Text Element Wrapper (No visible line) */}
                    <span
                      className="
                        relative
                        z-10
                        transition-all
                        duration-300
                        group-hover:text-white
                      "
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Desktop CTA Button */}
              <div className="hidden lg:flex items-center">
                <Link
                  href="/enroll"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-purple-500/20
                    bg-black/40
                    px-6
                    py-3
                    text-sm
                    font-medium
                    text-white
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:scale-[1.03]
                    hover:border-purple-400/50
                    hover:shadow-[0_0_35px_rgba(168,85,247,0.35)]
                  "
                >
                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-r
                      from-purple-500/20
                      to-cyan-500/20
                      opacity-0
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    "
                  />

                  {/* 7. CTA Button Shine Sweep */}
                  <div
                    className="
                      absolute
                      -left-20
                      top-0
                      h-full
                      w-10
                      rotate-12
                      bg-white/10
                      blur-md
                      transition-all
                      duration-700
                      group-hover:left-[140%]
                    "
                  />

                  <span className="relative z-10">
                    Join Our Waitlist
                  </span>
                </Link>
              </div>

              {/* Mobile Menu Action Toggle Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden text-neutral-400 hover:text-white p-2 transition-colors relative z-50 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {/* 8. Ambient Connected Navbar Glow */}
          <div
            className="
              absolute
              left-1/2
              top-full
              -translate-x-1/2
              w-[300px] sm:w-[500px]
              h-[120px]
              bg-gradient-to-r
              from-purple-500/10
              via-cyan-500/10
              to-purple-500/10
              blur-3xl
              pointer-events-none
              z-0
            "
          />
        </div>
      </nav>

      {/* Immersive Mobile Dropdown Panel Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="
              fixed
              inset-0
              z-40
              bg-black/95
              backdrop-blur-2xl
              lg:hidden
            "
          >
            <div className="flex flex-col justify-center items-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="
                      text-2xl
                      font-semibold
                      text-neutral-400
                      hover:text-white
                      transition-colors
                      duration-200
                    "
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Link
                  href="/enroll"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="
                    mt-8
                    block
                    rounded-2xl
                    border
                    border-purple-500/30
                    bg-gradient-to-r
                    from-purple-500/10
                    to-cyan-500/10
                    px-8
                    py-4
                    text-white
                    font-semibold
                    shadow-lg
                    hover:border-purple-400/50
                    transition-colors
                  "
                >
                  Join Our Waitlist
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

{/*
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/resources', label: 'Resources' },
  { href: '/team', label: 'Team' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glassmorphic border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="group hover:scale-110 transition-transform duration-300">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/only_logo_transparent-%28white%29-Nie109Wa5ikBRoVZvVxKF2Wyu9bEd2.png"
              alt="ACOB"
              width={70}
              height={70}
              priority
              loading="eager"
              className="drop-shadow-[0_0_12px_rgba(109,40,217,0.35)] group-hover:drop-shadow-[0_0_18px_rgba(0,217,255,0.35)] transition-all duration-300"
            />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <motion.div key={link.href} whileHover={{ y: -2 }}>
                <Link
                  href={link.href}
                  className="text-white/75 hover:text-white transition-colors duration-200 text-sm font-medium relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
            <motion.div whileHover={{ y: -2 }}>
              <Link
                href="/enroll"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-6 py-2.5 text-sm"
              >
                Join Our Waitlist
              </Link>
            </motion.div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/70 hover:text-white transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col gap-3 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-white/75 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/enroll"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary px-4 py-2.5 text-sm text-center"
                >
                  Join Our Waitlist
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

*/}