'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Brain, Lightbulb, Users, Zap } from 'lucide-react';
import { MouseEvent } from 'react';

const philosophyCards = [
  {
    icon: Brain,
    title: 'Critical Thinking',
    description: 'Develop analytical and reasoning skills through challenging problems.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Foster creative problem-solving and original thinking approaches.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Build connections with brilliant minds across Bangladesh.',
  },
  {
    icon: Zap,
    title: 'Excellence',
    description: 'Pursue the highest standards of academic achievement.',
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

// Interactive Spotlight Card Component
function PhilosophyCard({ card }: { card: typeof philosophyCards[0] }) {
  const Icon = card.icon;
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
      className="group relative rounded-2xl border border-neutral-900 bg-neutral-950/40 p-8 transition-colors duration-300 hover:border-neutral-800 select-none cursor-pointer"
    >
      {/* Interactive Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(168, 85, 247, 0.06),
              transparent 80%
            )
          `,
        }}
      />

      {/* Icon Wrapper */}
      <div className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/50 text-neutral-400 transition-colors duration-300 group-hover:border-purple-500/30 group-hover:text-purple-400 group-hover:bg-purple-950/10">
        <Icon className="h-5 w-5 transition-transform duration-500 ease-out group-hover:scale-110" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-medium tracking-tight text-white mb-2 transition-colors duration-300 group-hover:text-purple-300">
        {card.title}
      </h3>
      <p className="text-sm leading-relaxed text-neutral-400 font-normal">
        {card.description}
      </p>

      {/* Elegant Micro-Line Indicator */}
      <div className="mt-5 h-[1px] w-full bg-neutral-900 transition-colors duration-300 group-hover:bg-neutral-800">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '24px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="h-[1px] bg-gradient-to-r from-purple-500 to-cyan-400"
        />
      </div>
    </motion.div>
  );
}

export default function Philosophy() {
  return (
    // Balanced padding configuration to establish seamless flow between blocks
    <section className="relative pt-16 pb-20 px-6 overflow-hidden bg-black">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-[160px] pointer-events-none select-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header - Balanced from mb-16 to mb-12 */}
        <motion.div
          className="text-center mb-12 space-y-3"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Our Core <span className="bg-gradient-to-r from-purple-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent">Philosophy</span>
          </h2>
          <p className="text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed font-normal">
            We nurture the next generation of brilliant problem-solvers by fostering intellectual rigor, creative innovation, and collaborative excellence.
          </p>
        </motion.div>

        {/* Philosophy Grid Layout */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {philosophyCards.map((card, index) => (
            <PhilosophyCard key={index} card={card} />
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
import { Brain, Lightbulb, Users, Zap } from 'lucide-react';

const philosophyCards = [
  {
    icon: Brain,
    title: 'Critical Thinking',
    description: 'Develop analytical and reasoning skills through challenging problems.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Foster creative problem-solving and original thinking approaches.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Build connections with brilliant minds across Bangladesh.',
  },
  {
    icon: Zap,
    title: 'Excellence',
    description: 'Pursue the highest standards of academic achievement.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Philosophy() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Our Core <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Philosophy</span>
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            We nurture the next generation of brilliant problem-solvers by fostering intellectual rigor, creative innovation, and collaborative excellence.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {philosophyCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative"
              >
                <div className="relative p-8 rounded-2xl glassmorphic border border-white/15 hover:border-purple-500/50 transition-all group-hover:bg-white/5 group-hover:shadow-lg">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <motion.div
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600/50 to-cyan-600/30 border border-purple-500/30 flex items-center justify-center mb-6 relative z-10 transition-all shadow-lg"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Icon className="w-8 h-8 text-purple-200" />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-white mb-2 relative z-10">{card.title}</h3>
                  <p className="text-white/70 leading-relaxed relative z-10">{card.description}</p>

                  <div className="mt-6 pt-6 border-t border-white/10 group-hover:border-purple-500/30 transition-colors">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: 32 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


  
  */}