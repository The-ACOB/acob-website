import { motion } from 'framer-motion';
import { Share2, Mail, ExternalLink, Globe, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Team = () => {
  const triumvirate = [
    {
      name: "Muhammad Hasan Zarif",
      role: "Founder & CEO",
      bio: "A visionary strategist dedicated to redefining the STEM landscape in Bangladesh through cognitive-first methodologies and academic excellence.",
      image: "/muhammad-hasan-zarif.png",
      socials: {
        linkedin: 'https://www.linkedin.com/in/mdhzarif/',
        email: 'mailto:mdhzarif03@gmail.com',
        portfolio: 'https://mdhzarif03.github.io/portfolio/',
      }
    },
    {
      name: "Mugdho Sarker",
      role: "Co-Founder & COO",
      bio: "Operations architect focused on scaling educational impact and building robust frameworks for international competitions through strategic leadership.",
      image: "/mugdho-sarker.png",
      imagePosition: "center 35%",
      imageScale: 1.05,
      socials: {
        email: 'mailto:official.acobd@gmail.com',
      }
    },
    {
      name: "Khan Jariff Al Naseeb",
      role: "Managing Director",
      bio: "Driving strategic growth and institutional partnerships to power ACOB's mission to reach every aspiring young scientist in the nation.",
      image: "/khan-jariff-al-naseeb.png",
      socials: {
        linkedin: 'https://www.linkedin.com/in/khan-jariff/',
        email: 'mailto:khanjariff09@gmail.com',
        portfolio: 'https://khan-jariff.vercel.app/',
      }
    }
  ];

  const executiveBoard = [
    { department: "Academics & Research", head: "Tawhid Ur Rahman", status: "Lead Researcher" },
    { department: "IT & Platform", head: "Glitch Tech & Khan Jariff Al Naseeb", status: "Technology" },
    { department: "Marketing, Business & Partnerships", head: "Mugdho Sarker", status: "Strategic Growth" },
    { department: "Design & Social Media", head: "Muhammad Hasan Zarif", status: "Creative Lead" },
    { department: "Support & Communication", head: "N/A", status: "Operations" },
    { department: "Finance", head: "N/A", status: "Internal" },
    { department: "Operations", head: "N/A", status: "Institutional" }
  ];

  return (
    <div className="team-page bg-[#030303]">
      <section className="section min-h-screen pt-32">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-32 text-center"
          >
            <p className="text-[10px] uppercase tracking-[0.5em] text-cyan-400 font-bold mb-8">Leadership</p>
            <h1 className="text-5xl md:text-8xl font-heading mb-12 leading-[0.9] uppercase">THE <br/><span className="gradient-text italic-accent">TRIUMVIRATE</span></h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {triumvirate.map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80 mb-12 overflow-hidden rounded-full border-2 border-white/10 group-hover:border-cyan-400 transition-all duration-700">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    style={{ 
                      objectPosition: (member as any).imagePosition || 'center',
                      transform: `scale(${(member as any).imageScale || 1})`
                    }}
                   />
                   <div className="absolute inset-0 flex items-center justify-center gap-6 z-20 opacity-0 group-hover:opacity-100 transition-all translate-y-10 group-hover:translate-y-0">
                        {member.socials.linkedin && (
                          <Link href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin size={20} className="cursor-pointer hover:text-cyan-400 text-white transition-colors" />
                          </Link>
                        )}
                        {member.socials.portfolio && (
                          <Link href={member.socials.portfolio} target="_blank" rel="noopener noreferrer">
                            <Globe size={20} className="cursor-pointer hover:text-cyan-400 text-white transition-colors" />
                          </Link>
                        )}
                        {member.socials.email && (
                          <Link href={member.socials.email}>
                            <Mail size={20} className="cursor-pointer hover:text-cyan-400 text-white transition-colors" />
                          </Link>
                        )}
                   </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-bold mb-4">{member.role}</p>
                  <h3 className="text-3xl font-heading tracking-tighter mb-6 uppercase">{member.name}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed max-w-sm group-hover:text-zinc-300 transition-colors font-body">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-48 bg-zinc-950/30 border-t border-white/5">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 text-center md:text-left">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-6 font-body">Organizational Structure</p>
              <h2 className="text-4xl md:text-6xl font-heading uppercase">EXECUTIVE <span className="text-zinc-800">BOARD</span></h2>
            </div>
            <p className="text-zinc-500 text-sm max-w-sm uppercase tracking-[0.1em] leading-relaxed font-body">
              The operational engine driving our mission with precision and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {executiveBoard.map((dept, idx) => (
              <div key={idx} className="bg-black p-12 hover:bg-zinc-900 transition-all group">
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-8 group-hover:text-cyan-400 transition-colors font-body">{dept.department}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-xl font-heading mb-2 tracking-tighter uppercase">{dept.head}</h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold font-body">{dept.status}</p>
                  </div>
                  <ExternalLink size={16} className="text-zinc-800 group-hover:text-white transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
