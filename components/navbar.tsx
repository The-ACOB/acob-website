'use client';

// Navbar component - fully responsive and optimized
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
          {/* Logo */}
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

          {/* Desktop Navigation */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/70 hover:text-white transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
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
