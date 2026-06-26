'use client';

import { motion } from 'framer-motion';
import { Star, Quote, Sparkles } from 'lucide-react';

const testimonials = [
  {
    name: 'Aisha Rahman',
    role: 'ACOB 2025Grand Prize Winner',
    message: 'ACOB transformed my approach to problem-solving. The competition was rigorous, but the experience was invaluable. It opened doors I never knew existed.',
    rating: 5,
    university: 'BUET',
  },
  {
    name: 'Karim Hassan',
    role: 'First Runner-up, Regional Round',
    message: 'Being part of ACOB community gave me confidence and exposure to brilliant minds. The networking alone made it worth every hour of preparation.',
    rating: 5,
    university: 'DU',
  },
  {
    name: 'Fatima Zahra',
    role: 'ACOB 2025Finalist',
    message: 'The quality of problems and the learning environment are exceptional. ACOB is not just a competition—it\'s a launchpad for ambitious students.',
    rating: 5,
    university: 'SUST',
  },
  {
    name: 'Ahmed Hasan',
    role: 'Career Placement through ACOB',
    message: 'I landed my dream internship through ACOB\'s industry connections. The credibility ACOB carries is remarkable in the professional sphere.',
    rating: 5,
    university: 'NSU',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 90 },
  },
};

export default function Testimonials() {
  return (
    // Balanced top/bottom padding prevents structural clashing with adjacent blocks
    <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden select-none">
      
      {/* Background Micro Mesh/Grid Accent & Lighting Flares */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0c_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[250px] bg-cyan-500/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header - Fixed mb-24 gap down to mb-14 */}
        <motion.div
          className="text-center mb-14 relative"
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-semibold tracking-wider uppercase mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
            <span>Success Stories</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
            Loved by <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.2)]">ACOB Winners</span>
          </h2>
          <p className="text-base text-neutral-400 max-w-xl mx-auto leading-relaxed font-normal">
            Hear from students who&apos;ve transformed their academic journey through ACOB.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.005 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="group relative"
            >
              <div className="relative p-6 sm:p-8 rounded-2xl border border-white/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] backdrop-blur-xl transition-all duration-500 group-hover:border-purple-500/30 group-hover:shadow-[0_0_50px_rgba(168,85,247,0.1)] h-full flex flex-col justify-between overflow-hidden">
                
                {/* Micro Color Linear Gradient Accent Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/[0.02] via-transparent to-cyan-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Card Top Block Structure */}
                <div>
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    {/* Rating Stars Array */}
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <Star className="w-4 h-4 fill-cyan-400 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                        </motion.div>
                      ))}
                    </div>

                    <Quote className="w-8 h-8 text-white/[0.03] group-hover:text-purple-500/10 transition-colors duration-500 transform scale-x-[-1]" />
                  </div>

                  {/* Message Quote Block */}
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 relative z-10 font-normal tracking-wide">
                    &quot;{testimonial.message}&quot;
                  </p>
                </div>

                {/* Author Metadata Frame Block */}
                <div className="relative z-10 pt-4 border-t border-white/[0.06] group-hover:border-purple-500/20 transition-colors duration-500 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white tracking-wide mb-0.5 group-hover:text-purple-300 transition-colors duration-300">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-cyan-400/90 font-medium tracking-normal">
                      {testimonial.role}
                    </p>
                  </div>

                  {/* University Badge Asset Wrapper */}
                  <div className="shrink-0 flex items-center justify-center px-2.5 py-1 rounded-xl bg-white/[0.03] border border-white/5 group-hover:bg-purple-500/[0.06] group-hover:border-purple-500/20 transition-all duration-500">
                    <span className="text-[11px] font-bold tracking-wider text-neutral-400 group-hover:text-purple-300 transition-colors">
                      {testimonial.university}
                    </span>
                  </div>
                </div>

                <div className="absolute -left-32 top-0 h-full w-16 rotate-12 bg-white/[0.02] blur-xl transition-all duration-1000 group-hover:left-[130%] pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
{/*
  Previous Design


'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Aisha Rahman',
    role: 'ACOB 2025Grand Prize Winner',
    message: 'ACOB transformed my approach to problem-solving. The competition was rigorous, but the experience was invaluable. It opened doors I never knew existed.',
    rating: 5,
    university: 'BUET',
  },
  {
    name: 'Karim Hassan',
    role: 'First Runner-up, Regional Round',
    message: 'Being part of ACOB community gave me confidence and exposure to brilliant minds. The networking alone made it worth every hour of preparation.',
    rating: 5,
    university: 'DU',
  },
  {
    name: 'Fatima Zahra',
    role: 'ACOB 2025Finalist',
    message: "The quality of problems and the learning environment are exceptional. ACOB is not just a competition—it's a launchpad for ambitious students.",
    rating: 5,
    university: 'SUST',
  },
  {
    name: 'Ahmed Hasan',
    role: 'Career Placement through ACOB',
    message: "I landed my dream internship through ACOB's industry connections. The credibility ACOB carries is remarkable in the professional sphere.",
    rating: 5,
    university: 'NSU',
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Testimonials() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Loved by{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              ACOB Winners
            </span>
          </h2>

          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Hear from students who&apos;ve transformed their academic journey through ACOB.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative p-6 sm:p-8 rounded-2xl glassmorphic border border-white/15 hover:border-cyan-500/50 transition-all group-hover:shadow-[0_0_40px_rgba(0,217,255,0.15)] h-full flex flex-col">
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex gap-1.5 mb-4 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Star className="w-5 h-5 fill-cyan-400 text-cyan-400" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 relative z-10 flex-grow italic">
                  &quot;{testimonial.message}&quot;
                </p>

                <div className="relative z-10 pt-4 sm:pt-6 border-t border-white/10 group-hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-center gap-1 mb-2">
                    <p className="text-sm sm:text-base font-semibold text-white">
                      {testimonial.name}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-cyan-400/90 font-medium">
                    {testimonial.role}
                  </p>

                  <p className="text-xs text-white/50 mt-1">
                    {testimonial.university}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

*/}