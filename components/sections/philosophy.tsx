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
        {/* Section Header */}
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

        {/* Philosophy Grid Layout */}
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
                {/* Card */}
                <div className="relative p-8 rounded-2xl glassmorphic border border-white/15 hover:border-purple-500/50 transition-all group-hover:bg-white/5 group-hover:shadow-lg">
                  {/* Premium corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Icon with premium effect */}
                  <motion.div
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600/50 to-cyan-600/30 border border-purple-500/30 flex items-center justify-center mb-6 relative z-10 transition-all shadow-lg"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Icon className="w-8 h-8 text-purple-200" />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-white mb-2 relative z-10">{card.title}</h3>
                  <p className="text-white/70 leading-relaxed relative z-10">{card.description}</p>

                  {/* Bottom accent line */}
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
