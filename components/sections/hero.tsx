'use client';

import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center pt-32 pb-20">
      {/* Premium Animated Background with Parallax */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-black to-cyan-950/40" />
        
        {/* Animated background orbs with enhanced motion */}
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple-600/25 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 80, -40, 0],
            scale: [1, 0.95, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"
        />

        {/* Additional subtle orb */}
        <motion.div
          animate={{
            x: [0, 40, -60, 0],
            y: [0, -40, 60, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 right-1/3 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl opacity-50"
        />
      </div>

      {/* Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-6 max-w-5xl mx-auto text-center space-y-10"
      >


        {/* Premium Badge */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-5 py-2.5 bg-white/5 border border-purple-500/40 rounded-full backdrop-blur-md hover:bg-white/8 transition-all cursor-default"
          >
            <p className="text-sm font-semibold text-white/85">
              ✨ Bangladesh&apos;s Premier Academic Olympiad
            </p>
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white leading-tight mb-4">
            Applied Cognitio
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg">
              Olympiad Bangladesh
            </span>
          </h1>
        </motion.div>

        {/* Premium Subheading */}
        <motion.div variants={itemVariants}>
          <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
            Foster critical thinking, problem-solving excellence, and intellectual innovation. Join Bangladesh&apos;s most competitive academic platform for exceptional minds.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-5 justify-center pt-6"
        >
          <Link 
            href="/enroll" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group flex items-center justify-center gap-2 px-10 py-4 text-lg"
          >
            Join Our Waitlist
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/contact" className="btn-secondary px-10 py-4 text-lg">
            Explore More
          </Link>
        </motion.div>


      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="absolute bottom-10 z-10"
      >
        <ChevronDown className="w-7 h-7 text-white/50 hover:text-white/80 transition-colors cursor-pointer" />
      </motion.div>
    </section>
  );
}
