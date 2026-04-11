'use client';

import { motion } from 'framer-motion';

const executiveMembers = [
  { name: 'Tawhid Ur Rahman', role: 'Head of Academics & Research', department: 'Academics & Research' },
  { name: 'Glitch Tech & Khan Jariff Al Naseeb', role: 'Platform Leads', department: 'IT & Platform' },
  { name: 'Mugdho Sarker', role: 'Strategic Growth', department: 'Marketing, Business & Partnerships' },
  { name: 'Muhammad Hasan Zarif', role: 'Creative Lead', department: 'Design & social media' },
  { name: 'N/A', role: 'Coordinator', department: 'Support & Communication' },
  { name: 'N/A', role: 'Manager', department: 'Finance' },
  { name: 'N/A', role: 'Lead', department: 'Operations' },
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

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

export default function ExecutiveBoard() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Executive <span className="bg-gradient-purple-cyan bg-clip-text text-transparent">Board</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Talented professionals dedicated to excellence across all departments.
          </p>
        </motion.div>

        {/* Executive Table */}
        <motion.div
          className="overflow-hidden rounded-xl border border-white/10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-left text-white font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Position</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Department</th>
                </tr>
              </thead>
              <tbody>
                {executiveMembers.map((member, index) => (
                  <motion.tr
                    key={index}
                    variants={rowVariants}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-white font-medium">{member.name}</td>
                    <td className="px-6 py-4 text-cyan-400">{member.role}</td>
                    <td className="px-6 py-4 text-white/70">{member.department}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
