'use client';

import { motion } from 'framer-motion';
import { Award, BookOpen, Briefcase, Globe, Zap, Users } from 'lucide-react';

const benefitsData = [
  {
    icon: Award,
    title: 'Recognition',
    description: 'Win awards and certificates that boost your academic profile.',
    size: 'col-span-1 row-span-1',
  },
  {
    icon: BookOpen,
    title: 'Advanced Learning',
    description: 'Explore cutting-edge problem-solving techniques and methodologies.',
    size: 'col-span-1 row-span-1',
  },
  {
    icon: Briefcase,
    title: 'Career Opportunities',
    description: 'Connect with top employers and access exclusive job placements.',
    size: 'col-span-1 md:col-span-2 row-span-1',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Join a community of brilliant minds from across Bangladesh.',
    size: 'col-span-1 row-span-1',
  },
  {
    icon: Zap,
    title: 'Skills Enhancement',
    description: 'Develop critical thinking and analytical problem-solving abilities.',
    size: 'col-span-1 row-span-1',
  },
  {
    icon: Users,
    title: 'Mentorship',
    description: 'Get guidance from industry experts and academic leaders.',
    size: 'col-span-1 md:col-span-2 row-span-1',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Benefits() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Why Join <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">ACOB</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Transform your potential through rigorous academic competition and professional growth opportunities.
          </p>
        </motion.div>

        {/* Premium Timeline Layout */}
        <motion.div
          className="space-y-6 sm:space-y-8 relative max-w-4xl mx-auto px-4 sm:px-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Vertical connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/30 via-cyan-500/30 to-purple-500/30 hidden md:block transform -translate-x-1/2" />

          {benefitsData.map((benefit, index) => {
            const Icon = benefit.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch gap-4 sm:gap-8`}
              >
                {/* Left side content */}
                <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="group relative p-6 sm:p-8 rounded-2xl glassmorphic border border-white/15 hover:border-purple-500/50 transition-all h-full flex flex-col justify-center hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]">
                    {/* Premium background glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-cyan-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Index badge */}
                    <div className="relative z-10 mb-4 inline-flex items-center justify-center w-9 sm:w-10 h-9 sm:h-10 rounded-lg bg-gradient-to-br from-purple-600/30 to-cyan-600/20 border border-purple-500/30 group-hover:from-purple-600/50 group-hover:to-cyan-600/40 transition-all mx-auto md:mx-0">
                      <span className="text-xs sm:text-sm font-bold text-purple-200">{index + 1}</span>
                    </div>

                    <h3 className="text-lg sm:text-2xl font-semibold text-white mb-3 relative z-10">{benefit.title}</h3>
                    <p className="text-white/70 leading-relaxed relative z-10 text-sm sm:text-base">{benefit.description}</p>

                    {/* Accent line */}
                    <div className="mt-6 pt-6 border-t border-white/10 group-hover:border-purple-500/30 transition-colors">
                      <div className={`h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full w-12 opacity-0 group-hover:opacity-100 transition-all ${isEven ? 'md:ml-auto' : ''}`} />
                    </div>
                  </div>
                </div>

                {/* Center dot/icon */}
                <motion.div
                  className="hidden md:flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="relative z-20 w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 border-4 border-black flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.5)] group-hover:shadow-[0_0_50px_rgba(0,217,255,0.5)]">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                {/* Right side (empty for spacing) */}
                <div className="flex-1" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
