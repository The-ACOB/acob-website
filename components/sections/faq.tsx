'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ArrowRight, Sparkles, Mail, Clock, CheckCircle2 } from 'lucide-react';

const faqs = [
  {
    id: '01',
    question: 'Who can participate in ACOB?',
    answer: 'ACOB welcomes high school students from all academic backgrounds. Participants should have strong problem-solving skills and a passion for intellectual challenges. No prior competition experience is necessary.',
  },
  {
    id: '02',
    question: 'What is the format of the competition?',
    answer: 'The competition consists of multiple rounds including preliminary tests, advanced problem-solving sessions, and final competitions. Each round is designed to challenge critical thinking and analytical abilities.',
  },
  {
    id: '03',
    question: 'Are there prizes and scholarships?',
    answer: 'Yes! Top performers receive certificates, monetary prizes, and scholarship opportunities for higher education. Additionally, winners get priority access to our mentorship and career placement programs.',
  },
  {
    id: '04',
    question: 'How do I register?',
    answer: 'You can register online through our website. Simply fill out the registration form, pay the registration fee, and you\'ll receive confirmation and further details via email.',
  },
  {
    id: '05',
    question: 'Is there any age limit?',
    answer: 'ACOB is open to students aged 14-19 years old. We welcome participants from secondary and higher secondary schools across Bangladesh.',
  },
  {
    id: '06',
    question: 'What preparation resources are available?',
    answer: 'We provide comprehensive study materials, practice problems, online coaching sessions, and mentorship from experienced educators and professionals.',
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    // Reduced from py-32 to pt-16 pb-24 to pull the sections closer together perfectly
    <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 bg-black text-white overflow-hidden select-none">
      
      {/* Precision Grid Background Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0c_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0c_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-70 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Split Grid Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: Header & Tab Controls */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            <div>
              {/* Premium Tag Capsule */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-md">
                <HelpCircle className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                <span>Knowledge Base</span>
              </div>
              
              <h2 className="text-4xl font-semibold tracking-tight leading-none text-white mb-4">
                Common <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="text-base text-neutral-400 font-normal">
                Click through the inquiries to discover detailed insights regarding the ACOB ecosystem.
              </p>
            </div>

            {/* Interactive Sidebar Nav Controls */}
            <div className="space-y-2">
              {faqs.map((faq, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={faq.id}
                    onClick={() => setActiveIndex(index)}
                    className="w-full text-left relative p-4 rounded-xl flex items-center justify-between gap-4 transition-all duration-300 group outline-none"
                  >
                    {/* Active Background Animation */}
                    {isActive && (
                      <motion.div
                        layoutId="activeFaqTab"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    <div className="relative z-10 flex items-center gap-4">
                      <span className={`text-xs font-mono font-semibold transition-colors duration-300 ${
                        isActive ? 'text-cyan-400' : 'text-neutral-600 group-hover:text-neutral-400'
                      }`}>
                        {faq.id}
                      </span>
                      <span className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'
                      }`}>
                        {faq.question}
                      </span>
                    </div>

                    <div className={`w-1.5 h-1.5 rounded-full relative z-10 transition-all duration-300 ${
                      isActive ? 'bg-cyan-400 scale-120 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-transparent border border-neutral-700 group-hover:border-neutral-500'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: Dynamic Display Canvas & Integrated CTA */}
          <div className="lg:col-span-7 space-y-6 lg:h-[580px] flex flex-col justify-between">
            
            {/* The Showcase Answer Tile */}
            <div className="relative p-8 rounded-2xl border border-white/[0.05] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.005))] backdrop-blur-xl flex-grow flex flex-col justify-center min-h-[220px] lg:min-h-0 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-cyan-500/[0.03] to-transparent rounded-tl-2xl" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="relative z-10"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400/80" />
                    <span className="text-xs uppercase font-semibold tracking-widest text-cyan-400/80 font-mono">
                      Official Response {faqs[activeIndex].id}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium tracking-wide text-white mb-4">
                    {faqs[activeIndex].question}
                  </h3>
                  <p className="text-neutral-300 text-[15px] leading-relaxed font-normal">
                    {faqs[activeIndex].answer}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Compact Luxury Integrated CTA Card */}
            <div className="relative rounded-2xl border border-neutral-900 bg-neutral-950 p-6 md:p-8 overflow-hidden group shadow-xl">
              {/* Dynamic Accent Top Line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
              <div className="absolute -right-24 -bottom-24 w-60 h-60 bg-purple-500/[0.02] rounded-full blur-[60px] pointer-events-none group-hover:bg-purple-500/[0.04] transition-all duration-700" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-md">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-purple-500/20 bg-purple-500/5 rounded-full text-purple-400 text-[10px] font-semibold tracking-wider uppercase">
                    <Sparkles className="w-2.5 h-2.5 text-purple-400" />
                    <span>Get in Touch</span>
                  </div>
                  <h4 className="text-lg font-semibold tracking-tight text-white">
                    Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">ACOB Journey?</span>
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Have any remaining questions? Our professional team is on standby to assist you with personalized guidance.
                  </p>
                </div>

                {/* Micro Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                  <a
                    href="/contact"
                    className="w-full sm:w-auto px-5 py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 text-black bg-white hover:bg-neutral-200 transition-colors duration-200"
                  >
                    <span>Contact Team</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="/"
                    className="w-full sm:w-auto px-5 py-2 rounded-lg font-medium text-xs border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 bg-transparent transition-all duration-200 text-center"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              {/* Minimalist Subtext Footer */}
              <div className="mt-6 pt-4 border-t border-neutral-900/60 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-medium text-neutral-500">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-neutral-600" />
                  <span>reachappliedcognitio@gmail.com</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-neutral-600" />
                  <span>Available 24/7</span>
                </div>
              </div>

              {/* Luxury Sweep Effect on Hover */}
              <div className="absolute -left-32 top-0 h-full w-16 rotate-12 bg-white/[0.01] blur-xl transition-all duration-1000 group-hover:left-[130%] pointer-events-none" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

{/*
  
  Previous COde
  
  'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Who can participate in ACOB?',
    answer: 'ACOB welcomes high school students from all academic backgrounds. Participants should have strong problem-solving skills and a passion for intellectual challenges. No prior competition experience is necessary.',
  },
  {
    question: 'What is the format of the competition?',
    answer: 'The competition consists of multiple rounds including preliminary tests, advanced problem-solving sessions, and final competitions. Each round is designed to challenge critical thinking and analytical abilities.',
  },
  {
    question: 'Are there prizes and scholarships?',
    answer: 'Yes! Top performers receive certificates, monetary prizes, and scholarship opportunities for higher education. Additionally, winners get priority access to our mentorship and career placement programs.',
  },
  {
    question: 'How do I register?',
    answer: 'You can register online through our website. Simply fill out the registration form, pay the registration fee, and you\'ll receive confirmation and further details via email.',
  },
  {
    question: 'Is there any age limit?',
    answer: 'ACOB is open to students aged 14-19 years old. We welcome participants from secondary and higher secondary schools across Bangladesh.',
  },
  {
    question: 'What preparation resources are available?',
    answer: 'We provide comprehensive study materials, practice problems, online coaching sessions, and mentorship from experienced educators and professionals.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 50, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/2 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/5 border border-cyan-500/30 rounded-full">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-white/80">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Common{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="text-lg text-white/70">
            Find answers to everything you need to know about ACOB.
          </p>
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 rounded-2xl glassmorphic border border-white/15 group-hover:border-cyan-500/50 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-semibold text-white flex-1">
                    {faq.question}
                  </h3>

                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 mt-0.5"
                  >
                    <ChevronDown className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 border-t-0 rounded-t-none">
                      <p className="text-white/70 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-20 relative"
        >
          <div className="relative p-12 md:p-16 rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-black to-cyan-600/20 rounded-3xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-purple-600/10 rounded-3xl" />
            <div className="absolute inset-0 border border-white/20 rounded-3xl group-hover:border-purple-500/50 transition-all duration-300" />

            <motion.div
              className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
              animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <motion.div
              className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
              animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="relative z-10 text-center">
              <motion.div
                className="mb-6 inline-flex items-center justify-center"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="px-4 py-2 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 border border-purple-500/50 rounded-full backdrop-blur-sm">
                  <span className="text-sm font-semibold bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
                    Questions? We&apos;re Here to Help
                  </span>
                </div>
              </motion.div>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your{' '}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  ACOB Journey?
                </span>
              </h3>

              <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                Have any remaining questions about the competition,
                registration, or opportunities? Our team is ready to assist you
                with personalized guidance.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-10 py-4 rounded-xl font-semibold text-lg overflow-hidden group/btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 group-hover/btn:from-purple-500 group-hover/btn:to-cyan-500 transition-all" />

                  <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 bg-gradient-to-r from-purple-400 to-cyan-400 blur transition-all" />

                  <span className="relative flex items-center justify-center gap-2 text-white">
                    Contact Our Team
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </motion.svg>
                  </span>
                </motion.a>

                <motion.a
                  href="/"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 rounded-xl font-semibold text-lg border-2 border-white/30 hover:border-white/60 text-white transition-all"
                >
                  Learn More
                </motion.a>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Email: reachappliedcognitio@gmail.com</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Available 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
*/}