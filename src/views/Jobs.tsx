import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';

const Jobs = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const jobs = [
    {
      title: "Researcher",
      location: "Remote / Dhaka",
      type: "Full-time",
      salary: "Competitive",
      link: "https://forms.gle/CZvvhUsv8aMHhLgVA",
      description: "Join our core research team to design and evaluate advanced cognitive metrics and olympiad challenges.",
      requirements: [
        "Strong background in STEM subjects",
        "Experience in academic research or olympiads",
        "Analytical mindset and attention to detail",
        "Commitment to educational innovation"
      ]
    },
    {
      title: "Graphic Designer",
      location: "Remote",
      type: "Contract",
      salary: "Project-based",
      link: "#",
      description: "Craft the visual identity of ACOB. We are looking for a creative mind to produce high-end digital and print assets.",
      requirements: [
        "Expertise in Adobe Creative Suite",
        "Portfolio showcasing minimalist/industrial design",
        "Ability to translate complex concepts into visuals",
        "Excellent communication skills"
      ]
    },
    {
      title: "Operations Manager",
      location: "Dhaka",
      type: "Full-time",
      salary: "Market Standard",
      link: "#",
      description: "Manage the day-to-day operations and logistics of our national events and internal workflows.",
      requirements: [
        "Strong organizational and leadership skills",
        "Experience in event management",
        "Proficiency in project management tools",
        "Problem-solving agility"
      ]
    },
    {
      title: "Communications Manager",
      location: "Remote / Dhaka",
      type: "Part-time",
      salary: "Competitive",
      link: "#",
      description: "Lead our outreach and institutional communication strategies. Bridge the gap between ACOB and our global partners.",
      requirements: [
        "Exceptional written and verbal communication",
        "Background in PR or institutional relations",
        "Networking and relationship-building skills",
        "Fluent in English and Bengali"
      ]
    },
    {
      title: "Social Media Manager",
      location: "Remote",
      type: "Contract",
      salary: "Monthly",
      link: "#",
      description: "Drive the ACOB narrative across digital platforms. Engage with our community through high-impact content.",
      requirements: [
        "Proven experience in social media growth",
        "Content creation and copywriting skills",
        "Understanding of digital analytics",
        "Visual storytelling expertise"
      ]
    }
  ];

  return (
    <div className="jobs-page bg-[#030303]">
      <section className="section pt-32">
        <div className="container">
          <div className="max-w-3xl mb-32">
            <p className="text-[10px] uppercase tracking-[0.6em] text-cyan-400 font-bold mb-8">Career Portal</p>
            <h1 className="text-5xl md:text-8xl font-heading mb-12 max-w-2xl leading-[0.9] uppercase">JOIN THE <br/><span className="gradient-text italic-accent">MISSION</span></h1>
            <p className="text-zinc-500 text-lg leading-relaxed font-light font-body">
              We aren't just building an olympiad; we are building the future of intelligence in Bangladesh. 
              We seek outliers, visionaries, and executors who believe in the power of applied cognition.
            </p>
          </div>

          <div className="space-y-4">
            {jobs.map((job, idx) => (
              <motion.div 
                key={idx}
                layout
                className={`glass border-white/5 overflow-hidden transition-all duration-500 ${expandedIndex === idx ? 'border-white/20' : 'hover:border-white/10'}`}
              >
                <div 
                  className="p-10 md:p-16 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-12"
                  onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-6 mb-6">
                       <span className="px-4 py-1 glass text-[10px] uppercase tracking-[0.2em] font-bold text-cyan-400 border-cyan-400/20 font-body">{job.type}</span>
                       <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-600 font-body"><MapPin size={12}/> {job.location}</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-heading tracking-tighter group-hover:text-cyan-400 transition-colors uppercase">{job.title}</h3>
                  </div>
                  <div className="flex items-center gap-12 w-full md:w-auto justify-between">
                    <div className="text-left md:text-right">
                       <p className="text-[10px] uppercase tracking-widest text-zinc-700 font-bold mb-2 font-body">Compensation</p>
                       <p className="text-sm font-bold tracking-widest font-body">{job.salary}</p>
                    </div>
                    <div className={`p-4 glass rounded-full transition-transform duration-500 ${expandedIndex === idx ? 'rotate-180 bg-white text-black' : ''}`}>
                       <ChevronDown size={20} />
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedIndex === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-10 md:px-16 pb-16 pt-8 border-t border-white/5">
                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            <div>
                               <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-600 mb-8 flex items-center gap-3 font-body">
                                 <Briefcase size={12} /> The Role
                               </h4>
                               <p className="text-zinc-400 text-sm leading-relaxed mb-8 font-body">
                                 {job.description}
                               </p>
                            </div>
                            <div>
                               <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-600 mb-8 flex items-center gap-3 font-body">
                                 <Clock size={12} /> Requirements
                               </h4>
                               <ul className="space-y-6">
                                  {job.requirements.map((req, rIdx) => (
                                    <li key={rIdx} className="text-zinc-400 text-sm flex items-start gap-4 font-body">
                                      <div className="w-1.5 h-1.5 bg-cyan-400 mt-2 flex-shrink-0" />
                                      {req}
                                    </li>
                                  ))}
                               </ul>
                            </div>
                         </div>
                         <div className="mt-16 pt-16 border-t border-white/5 flex justify-end">
                            <a 
                              href={job.link} 
                              target="_blank" 
                              rel="noreferrer"
                              className="px-16 py-6 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:scale-105 transition-all flex items-center gap-4 font-body"
                            >
                              Apply Now <ArrowRight size={16} />
                            </a>
                         </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-48 relative overflow-hidden">
        <div className="container">
          <div className="glass border-white/5 p-24 text-center relative overflow-hidden bg-gradient-to-b from-transparent to-zinc-950/50">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-4xl font-heading mb-8 uppercase tracking-tighter">Unconventional <br/><span className="text-zinc-800">Application</span></h2>
            <p className="text-zinc-500 max-w-xl mx-auto mb-12 text-sm leading-relaxed font-body">
              We value brilliance over credentials. If you believe you can contribute to our mission in a way we haven't listed, we want to hear from you.
            </p>
            <a href="mailto:official.acobd@gmail.com" className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 hover:text-white transition-colors border-b border-cyan-400/20 pb-2 font-body">
              General Application &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jobs;
