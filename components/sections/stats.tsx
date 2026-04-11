'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const stats = [
  {
    number: '500+',
    label: 'Active Members',
    icon: '👥',
    description: 'Talented students in our community',
  },
  {
    number: '15+',
    label: 'Partner Schools',
    icon: '🏫',
    description: 'Growing network across Bangladesh',
  },
  {
    number: '3',
    label: 'Competitions',
    icon: '🎯',
    description: 'Successfully conducted this year',
  },
  {
    number: '2024',
    label: 'Year Founded',
    icon: '🚀',
    description: 'Launching Bangladesh\'s premier academic olympiad',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Stats() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/5 border border-purple-500/30 rounded-full">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-white/80">Our Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Our <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Building Bangladesh&apos;s most innovative academic competition platform with excellence at its core.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative"
              whileHover={{ y: -8 }}
            >
              <div className="relative h-full p-8 rounded-2xl glassmorphic border border-white/15 group-hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-cyan-600/5 group-hover:from-purple-600/15 group-hover:to-cyan-600/15 transition-all duration-300" />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="text-4xl mb-3">{stat.icon}</div>

                  <div>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2"
                    >
                      {stat.number}
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-1">{stat.label}</h3>
                    <p className="text-white/65 text-sm leading-relaxed">{stat.description}</p>
                  </div>
                </div>

                {/* Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/0 to-cyan-600/0 group-hover:from-purple-600/20 group-hover:to-cyan-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
