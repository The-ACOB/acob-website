'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Aisha Rahman',
    role: 'ACOB 2024 Grand Prize Winner',
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
    role: 'ACOB 2024 Finalist',
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
        {/* Section Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Loved by <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">ACOB Winners</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Hear from students who&apos;ve transformed their academic journey through ACOB.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative p-6 sm:p-8 rounded-2xl glassmorphic border border-white/15 hover:border-cyan-500/50 transition-all group-hover:shadow-[0_0_40px_rgba(0,217,255,0.15)] h-full flex flex-col">
                {/* Premium corner accent */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Rating Stars */}
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

                {/* Message */}
                <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 relative z-10 flex-grow italic">
                  &quot;{testimonial.message}&quot;
                </p>

                {/* Author Info */}
                <div className="relative z-10 pt-4 sm:pt-6 border-t border-white/10 group-hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-center gap-1 mb-2">
                    <p className="text-sm sm:text-base font-semibold text-white">{testimonial.name}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-cyan-400/90 font-medium">{testimonial.role}</p>
                  <p className="text-xs text-white/50 mt-1">{testimonial.university}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
