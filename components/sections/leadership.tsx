'use client';

import { motion } from 'framer-motion';
import { Facebook, Mail, Linkedin, Globe } from 'lucide-react';
import Link from 'next/link';

const leadershipTeam = [
  {
    name: 'Muhammad Hasan Zarif',
    role: 'Founder & CEO',
    bio: 'Visionary leader with a passion for fostering academic excellence and innovation across the nation.',
    image: '/muhammad-hasan-zarif.png',
    socials: {
      linkedin: 'https://www.linkedin.com/in/mdhzarif/',
      email: 'mailto:mdhzarif03@gmail.com',
      portfolio: 'https://mdhzarif03.github.io/portfolio/',
    },
  },
  {
    name: 'Mugdho Sarker',
    role: 'Co-Founder & COO',
    bio: 'Dedicated to creating pathways for talented students to reach their full potential through strategic operations.',
    image: '/mugdho-sarker.png',
    imagePosition: 'center 35%',
    imageScale: 1.05,
    socials: {
      email: 'mailto:official.acobd@gmail.com',
    },
  },
  {
    name: 'Khan Jariff Al Naseeb',
    role: 'Managing Director',
    bio: 'Expert in ensuring seamless execution of all ACOB initiatives, programs, and large-scale educational events.',
    image: '/khan-jariff-al-naseeb.png',
    socials: {
      linkedin: 'https://www.linkedin.com/in/khan-jariff/',
      email: 'mailto:khanjariff09@gmail.com',
      portfolio: 'https://khan-jariff.vercel.app/',
    },
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

export default function Leadership() {
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
            Our <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Leadership</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Meet the visionary leaders and pioneers driving ACOB&apos;s mission forward.
          </p>
        </motion.div>

        {/* Leadership Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {leadershipTeam.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group h-full"
              whileHover={{ y: -8 }}
            >
              <div className="relative h-full rounded-2xl overflow-hidden glassmorphic border border-white/15 hover:border-purple-500/50 transition-all duration-300">
                {/* Image Container */}
                <div className="relative h-64 flex items-center justify-center p-6 bg-gradient-to-br from-purple-600/10 to-cyan-600/5">
                  <div className="relative w-44 h-44 rounded-full overflow-hidden border-2 border-purple-500/30 group-hover:border-purple-500/60 transition-all duration-500 shadow-[0_0_20px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      style={{ 
                        objectPosition: (member as any).imagePosition || 'center',
                        scale: (member as any).imageScale || 1
                      }}
                      whileHover={{ scale: ((member as any).imageScale || 1) * 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-purple-300 text-sm font-medium mb-5 uppercase tracking-wide">{member.role}</p>
                  <p className="text-white/75 text-base mb-8 leading-relaxed">{member.bio}</p>

                  {/* Social Links */}
                  <div className="flex gap-2 pt-6 border-t border-white/10">
                    {member.socials.email && (
                      <Link
                        href={member.socials.email}
                        className="flex-1 flex items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-300"
                        title="Email"
                      >
                        <Mail size={16} />
                      </Link>
                    )}
                    {member.socials.linkedin && (
                      <Link
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-300"
                        title="LinkedIn"
                      >
                        <Linkedin size={16} />
                      </Link>
                    )}
                    {member.socials.portfolio && (
                      <Link
                        href={member.socials.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-300"
                        title="Portfolio"
                      >
                        <Globe size={16} />
                      </Link>
                    )}
                    {member.socials.facebook && (
                      <Link
                        href={member.socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-300"
                        title="Facebook"
                      >
                        <Facebook size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
