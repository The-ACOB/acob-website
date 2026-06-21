'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Award, BookOpen, Briefcase, Globe, Zap, Users } from 'lucide-react';
import { MouseEvent } from 'react';

const benefitsData = [
  {
    icon: Award,
    title: 'Recognition',
    description: 'Win awards and certificates that boost your academic profile.',
  },
  {
    icon: BookOpen,
    title: 'Advanced Learning',
    description: 'Explore cutting-edge problem-solving techniques and methodologies.',
  },
  {
    icon: Briefcase,
    title: 'Career Opportunities',
    description: 'Connect with top employers and access exclusive job placements.',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Join a community of brilliant minds from across Bangladesh.',
  },
  {
    icon: Zap,
    title: 'Skills Enhancement',
    description: 'Develop critical thinking and analytical problem-solving abilities.',
  },
  {
    icon: Users,
    title: 'Mentorship',
    description: 'Get guidance from industry experts and academic leaders.',
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function BenefitCard({ 
  benefit, 
  index, 
  isEven 
}: { 
  benefit: typeof benefitsData[0]; 
  index: number; 
  isEven: boolean 
}) {
  const Icon = benefit.icon;
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
      className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-0 group`}
    >
      {/* Interactive Text Card */}
      <div 
        onMouseMove={handleMouseMove}
        className={`w-full md:w-[calc(50%-2.5rem)] relative p-6 sm:p-8 rounded-2xl border border-neutral-900 bg-neutral-950/40 select-none cursor-pointer transition-colors duration-500 hover:border-cyan-500/20 ${
          isEven ? 'md:text-right md:mr-auto' : 'md:text-left md:ml-auto'
        }`}
      >
        {/* Spotlight Glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                rgba(6, 182, 212, 0.06),
                transparent 80%
              )
            `,
          }}
        />

        {/* Counter Badge with subtle hover elevation */}
        <div className="relative z-10 mb-4 inline-flex items-center justify-center w-8 h-8 rounded-lg border border-neutral-800 bg-neutral-900/50 text-xs font-semibold tracking-wider text-neutral-400 transition-all duration-500 group-hover:border-cyan-500/30 group-hover:text-cyan-400 group-hover:-translate-y-0.5">
          {String(index + 1).padStart(2, '0')}
        </div>

        <h3 className="text-xl font-medium tracking-tight text-white mb-2 transition-colors duration-500 group-hover:text-cyan-300">
          {benefit.title}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-400 font-normal transition-colors duration-500 group-hover:text-neutral-300">
          {benefit.description}
        </p>

        {/* Dynamic Microline grow */}
        <div className="mt-5 h-[1px] w-full bg-neutral-900 transition-colors duration-500 group-hover:bg-neutral-800">
          <div className={`h-[1px] bg-gradient-to-r from-cyan-500 to-purple-400 w-0 group-hover:w-10 transition-all duration-500 ease-out ${isEven ? 'md:ml-auto' : ''}`} />
        </div>
      </div>

      {/* Center Junction Node with Active Glow and Micro-animations */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-20 pointer-events-none select-none">
        {/* Radial Ambient Glow Aura behind the center ring */}
        <div className="absolute w-24 h-24 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-all duration-500 blur-xl scale-75 group-hover:scale-110" />
        <div className="absolute w-24 h-24 rounded-full bg-purple-500/0 group-hover:bg-purple-500/5 transition-all duration-500 blur-xl scale-75 group-hover:scale-110 delay-75" />

        <div className="relative flex items-center justify-center h-11 w-11 rounded-full border border-neutral-800 bg-black transition-all duration-500 group-hover:border-cyan-400/40 group-hover:scale-105 shadow-2xl">
          {/* Internal gradient shift */}
          <div className="absolute inset-[1px] rounded-full bg-neutral-950 transition-opacity opacity-100 group-hover:opacity-0" />
          <div className="absolute inset-[1px] rounded-full bg-gradient-to-br from-purple-950/40 to-cyan-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <Icon className="w-4 h-4 text-neutral-500 transition-all duration-500 relative z-10 group-hover:text-cyan-400 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Benefits() {
  return (
    <section className="relative py-32 px-6 bg-black overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-950/5 rounded-full blur-[180px] pointer-events-none select-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-24 space-y-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Why Join <span className="bg-gradient-to-r from-cyan-400 via-indigo-200 to-purple-400 bg-clip-text text-transparent">ACOB</span>
          </h2>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Transform your potential through rigorous academic competition and professional growth opportunities.
          </p>
        </motion.div>

        {/* Timeline Layout */}
        <motion.div
          className="relative space-y-12 md:space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Animated Gradient Center Track Line */}
          <div className="absolute left-1/2 top-4 bottom-4 w-[1px] bg-neutral-900 hidden md:block transform -translate-x-1/2 overflow-hidden">
            <motion.div 
              animate={{
                y: ["-100%", "100%"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent"
            />
          </div>

          {benefitsData.map((benefit, index) => (
            <BenefitCard 
              key={index} 
              benefit={benefit} 
              index={index} 
              isEven={index % 2 === 0} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

{/*
  Previous code


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

        <motion.div
          className="space-y-6 sm:space-y-8 relative max-w-4xl mx-auto px-4 sm:px-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
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
                <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="group relative p-6 sm:p-8 rounded-2xl glassmorphic border border-white/15 hover:border-purple-500/50 transition-all h-full flex flex-col justify-center hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-cyan-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10 mb-4 inline-flex items-center justify-center w-9 sm:w-10 h-9 sm:h-10 rounded-lg bg-gradient-to-br from-purple-600/30 to-cyan-600/20 border border-purple-500/30 group-hover:from-purple-600/50 group-hover:to-cyan-600/40 transition-all mx-auto md:mx-0">
                      <span className="text-xs sm:text-sm font-bold text-purple-200">{index + 1}</span>
                    </div>

                    <h3 className="text-lg sm:text-2xl font-semibold text-white mb-3 relative z-10">{benefit.title}</h3>
                    <p className="text-white/70 leading-relaxed relative z-10 text-sm sm:text-base">{benefit.description}</p>

                    <div className="mt-6 pt-6 border-t border-white/10 group-hover:border-purple-500/30 transition-colors">
                      <div className={`h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full w-12 opacity-0 group-hover:opacity-100 transition-all ${isEven ? 'md:ml-auto' : ''}`} />
                    </div>
                  </div>
                </div>

                <motion.div
                  className="hidden md:flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="relative z-20 w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 border-4 border-black flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.5)] group-hover:shadow-[0_0_50px_rgba(0,217,255,0.5)]">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                <div className="flex-1" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

*/}