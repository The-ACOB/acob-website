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
      {/* Background */}
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
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/5 border border-cyan-500/30 rounded-full">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-white/80">Frequently Asked Questions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Common <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-lg text-white/70">Find answers to everything you need to know about ACOB.</p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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
                  <h3 className="text-base font-semibold text-white flex-1">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 mt-0.5"
                  >
                    <ChevronDown className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                  </motion.div>
                </div>
              </button>

              {/* Answer */}
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
                      <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 relative"
        >
          {/* Gradient background container */}
          <div className="relative p-12 md:p-16 rounded-3xl overflow-hidden group">
            {/* Premium background with multiple layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-black to-cyan-600/20 rounded-3xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-purple-600/10 rounded-3xl" />
            <div className="absolute inset-0 border border-white/20 rounded-3xl group-hover:border-purple-500/50 transition-all duration-300" />
            
            {/* Animated background elements */}
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

            {/* Content */}
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
                Ready to Start Your <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">ACOB Journey?</span>
              </h3>
              
              <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                Have any remaining questions about the competition, registration, or opportunities? Our team is ready to assist you with personalized guidance.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-10 py-4 rounded-xl font-semibold text-lg overflow-hidden group/btn"
                >
                  {/* Button background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 group-hover/btn:from-purple-500 group-hover/btn:to-cyan-500 transition-all" />
                  <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 bg-gradient-to-r from-purple-400 to-cyan-400 blur transition-all" />
                  
                  {/* Button text */}
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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

              {/* Support info */}
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
