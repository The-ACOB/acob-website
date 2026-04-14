'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const jobListings = [
  {
    id: 'researcher',
    title: 'Researcher',
    department: 'Academics',
    level: 'Any',
    type: 'Project-based',
    description: 'Join our core research team to design and evaluate advanced cognitive metrics and olympiad challenges.',
    requirements: [
      'Strong analytical skills',
      'Research background',
      'Cognitive science interest',
      'Problem-solving abilities',
    ],
    applicationLink: 'https://forms.gle/CZvvhUsv8aMHhLgVA'
  },
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    department: 'Creative',
    level: 'Any',
    type: 'Part-time',
    description: 'Create visually stunning assets for ACOB branding, social media, and event materials.',
    requirements: [
      'Proficiency in design tools',
      'Creative portfolio',
      'Brand consistency',
      'Communication skills',
    ],
    applicationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeGnwZUl_GfMCu6GvDOHN4GcdzwLupJVQtHmnUBowHVxiJSRg/viewform?usp=header'
  },
  {
    id: 'operations-manager',
    title: 'Operations Manager',
    department: 'Operations',
    level: 'Mid-Level',
    type: 'Full-time',
    description: 'Oversee the logistical execution of ACOB programs and ensure organizational excellence.',
    requirements: [
      'Organizational expertise',
      'Team coordination',
      'Process improvement',
      'Strategic planning',
    ],
    applicationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfrfqiUpvrNBH5WY2Jml_cw9C9tb-tBqHHvoRvyQ7rl1Z9G2g/viewform?usp=header'
  },
  {
    id: 'communications-manager',
    title: 'Communications Manager',
    department: 'Communications',
    level: 'Mid-Level',
    type: 'Full-time',
    description: 'Lead our communication strategy and manage relationships with participants and stakeholders.',
    requirements: [
      'Excellent writing skills',
      'Public relations',
      'Stakeholder management',
      'Strategic messaging',
    ],
    applicationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSev0Ie3355FTxpS9VC0l4G-fltX0RJGk31vj4gj9IKWL5d-YA/viewform?usp=header'
  },
  {
    id: 'social-media-manager',
    title: 'Social Media Manager',
    department: 'Marketing',
    level: 'Any',
    type: 'Part-time',
    description: 'Manage and grow ACOB\'s presence across all social media platforms with engaging content.',
    requirements: [
      'Content strategy',
      'Community engagement',
      'Social media analytics',
      'Creative copywriting',
    ],
    applicationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSd3wq3WGFQYzJMmFty2_Qo-7q9twtJ6LzfracONRbGc57b09A/viewform?usp=header'
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

const jobVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function JobBoard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

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
            Join Our <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Help us shape the future of academic excellence in Bangladesh. Explore career opportunities with ACOB.
          </p>
        </motion.div>

        {/* Job Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {jobListings.map((job) => (
            <motion.div
              key={job.id}
              variants={itemVariants}
              className="group h-full"
              whileHover={{ y: -6 }}
            >
              <div className="relative h-full p-8 rounded-2xl glassmorphic border border-white/15 group-hover:border-purple-500/50 transition-all duration-300 flex flex-col">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="inline-flex text-xs font-medium px-3 py-1 rounded-lg bg-purple-600/30 text-purple-200 border border-purple-500/30">
                    {job.department}
                  </span>
                  <span className="inline-flex text-xs font-medium px-3 py-1 rounded-lg bg-cyan-600/30 text-cyan-200 border border-cyan-500/30">
                    {job.level}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">{job.title}</h3>
                <p className="text-white/70 text-sm mb-6 leading-relaxed flex-grow">{job.description}</p>

                {/* Key Skills */}
                <div className="mb-6 pt-6 border-t border-white/10">
                  <p className="text-xs font-medium text-white/70 mb-3 uppercase tracking-wide">Key Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.slice(0, 2).map((req, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-lg bg-white/5 text-white/60 border border-white/10"
                      >
                        {req.split(' ')[0]}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <a
                  href={job.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2"
                >
                  Apply Now
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Section */}
        <motion.div
          className="mt-16 p-8 rounded-xl border border-white/10 glassmorphic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white mb-2">Don&apos;t see a perfect fit?</h3>
          <p className="text-white/70 mb-4">
            We&apos;re always looking for talented individuals. Send us your resume and tell us
            how you&apos;d like to contribute.
          </p>
          <a
            href="mailto:careers@acobd.com"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
          >
            careers@acobd.com
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
