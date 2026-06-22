'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { TrendingUp, Users, School, Target, Rocket } from 'lucide-react';
import { MouseEvent } from 'react';

const stats = [
  {
    number: '500+',
    label: 'Active Members',
    icon: Users,
    description: 'Talented students in our community',
  },
  {
    number: '15+',
    label: 'Partner Schools',
    icon: School,
    description: 'Growing network across Bangladesh',
  },
  {
    number: '3',
    label: 'Competitions',
    icon: Target,
    description: 'Successfully conducted this year',
  },
  {
    number: '2024',
    label: 'Year Founded',
    icon: Rocket,
    description: "Launching Bangladesh's premier academic olympiad",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const Icon = stat.icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      className="group relative h-full p-8 rounded-2xl border border-neutral-900 bg-neutral-950/40 select-none cursor-pointer transition-colors duration-300 hover:border-neutral-800"
    >
      {/* Interactive Mouse Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(168, 85, 247, 0.05),
              transparent 80%
            )
          `,
        }}
      />

      {/* Content Layout */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Upgraded Premium Icon Block */}
        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/50 text-neutral-400 transition-colors duration-300 group-hover:border-purple-500/30 group-hover:text-purple-400 group-hover:bg-purple-950/10">
          <Icon className="h-4 w-4 transition-transform duration-500 ease-out group-hover:scale-110" />
        </div>

        <div>
          {/* Main Stat Number */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent mb-3 tracking-tight"
          >
            {stat.number}
          </motion.div>
          
          <h3 className="text-base font-medium tracking-tight text-white mb-1 transition-colors duration-300 group-hover:text-purple-300">
            {stat.label}
          </h3>
          <p className="text-xs leading-relaxed text-neutral-400 font-normal">
            {stat.description}
          </p>
        </div>
      </div>

      {/* Subtle Bottom Accent Indicator */}
      <div className="mt-5 h-[1px] w-full bg-neutral-900 transition-colors duration-300 group-hover:bg-neutral-800">
        <div className="h-[1px] bg-gradient-to-r from-purple-500 to-cyan-400 w-0 group-hover:w-6 transition-all duration-500 ease-out" />
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    // Lowered top/bottom padding constraints to seamlessly align section dividers
    <section className="relative pt-16 pb-20 px-6 bg-black overflow-hidden">
      {/* Background ambient glow setup */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-950/5 rounded-full blur-[180px] pointer-events-none select-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section - Adjusted down from mb-20 to mb-12 */}
        <motion.div
          className="text-center mb-12 space-y-3"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900/80 border border-neutral-800 rounded-full select-none">
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs font-medium tracking-wide text-neutral-300">Our Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Our <span className="bg-gradient-to-r from-purple-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed font-normal">
            Building Bangladesh&apos;s most innovative academic competition platform with excellence at its core.
          </p>
        </motion.div>

        {/* Stats Grid Layout */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

{/*

  Previous Code



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
    description: "Launching Bangladesh's premier academic olympiad",
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
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-cyan-600/5 group-hover:from-purple-600/15 group-hover:to-cyan-600/15 transition-all duration-300" />

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

                    <p className="text-white/65 text-sm leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>

                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/0 to-cyan-600/0 group-hover:from-purple-600/20 group-hover:to-cyan-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

*/}