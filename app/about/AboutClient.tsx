'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Sparkles, Code2, Users2, CheckCircle2, ChevronRight } from 'lucide-react';
import PageTransition from '@/components/page-transition';

export default function AboutClient() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-black text-white relative overflow-hidden">
        
        {/* Universal Ambient Grid & Glow System */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-purple-500/10 rounded-full blur-[140px]" />
          <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px]" />
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[60vh] w-full flex flex-col items-center justify-center pt-32 sm:pt-40 pb-16 sm:pb-20 z-10">
          <div className="relative px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none"
            >
              About <span className="bg-gradient-to-r from-purple-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent brightness-110">ACOB</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed"
            >
              Building Bangladesh&apos;s Premier Academic Olympiad Platform
            </motion.p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
              
              {/* Mission Panel */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative p-8 rounded-3xl bg-neutral-950/40 border border-neutral-900 shadow-2xl backdrop-blur-xl group hover:border-cyan-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                    <Target size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">Our Mission</h3>
                    <div className="w-12 h-[2px] bg-cyan-500 mt-1.5 rounded-full" />
                  </div>
                </div>
                
                <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-8 font-light">
                  To foster intellectual excellence and critical thinking among Bangladesh&apos;s brightest minds through rigorous academic competition. We believe in creating opportunities that transform potential into achievement.
                </p>
                
                <ul className="space-y-4 border-t border-neutral-900/60 pt-6">
                  {[
                    "Empower students through challenging problems",
                    "Build a community of ambitious learners",
                    "Create pathways to career excellence"
                  ].map((text, idx) => (
                    <li key={idx} className="flex items-start gap-3 group/item">
                      <CheckCircle2 size={18} className="text-cyan-400 shrink-0 mt-0.5 transition-transform duration-300 group-hover/item:scale-110" />
                      <span className="text-neutral-400 text-sm sm:text-base group-hover/item:text-neutral-300 transition-colors duration-200">{text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Vision Panel */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative p-8 rounded-3xl bg-neutral-950/40 border border-neutral-900 shadow-2xl backdrop-blur-xl group hover:border-purple-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-950/50 border border-purple-500/30 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                    <Eye size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">Our Vision</h3>
                    <div className="w-12 h-[2px] bg-purple-500 mt-1.5 rounded-full" />
                  </div>
                </div>
                
                <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-8 font-light">
                  To become Asia&apos;s most prestigious academic olympiad, recognized globally for developing the next generation of innovators, leaders, and problem-solvers who will shape the future of Bangladesh.
                </p>
                
                <ul className="space-y-4 border-t border-neutral-900/60 pt-6">
                  {[
                    "Scale to 50+ partner institutions by 2026",
                    "Engage 10,000+ talented students annually",
                    "Establish industry partnerships for career growth"
                  ].map((text, idx) => (
                    <li key={idx} className="flex items-start gap-3 group/item">
                      <ChevronRight size={18} className="text-purple-400 shrink-0 mt-0.5 transition-transform duration-300 group-hover/item:translate-x-0.5" />
                      <span className="text-neutral-400 text-sm sm:text-base group-hover/item:text-neutral-300 transition-colors duration-200">{text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10 border-t border-neutral-900/40 bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.03),transparent_60%)]">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16 sm:mb-24 space-y-3">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Our Core Values</h2>
              <p className="text-base sm:text-lg text-neutral-400 max-w-md mx-auto font-light">The principles that guide everything we do</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  title: 'Excellence',
                  desc: 'We demand the highest standards in every aspect of our competition and operations.',
                  icon: <Sparkles size={24} className="text-purple-400" />,
                  glow: 'group-hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] group-hover:border-purple-500/30'
                },
                {
                  title: 'Innovation',
                  desc: 'We continuously evolve our problem-sets and methods to stay ahead of the curve.',
                  icon: <Code2 size={24} className="text-cyan-400" />,
                  glow: 'group-hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] group-hover:border-cyan-500/30'
                },
                {
                  title: 'Inclusion',
                  desc: 'We welcome talented minds from all backgrounds and make opportunities accessible.',
                  icon: <Users2 size={24} className="text-orange-400" />,
                  glow: 'group-hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] group-hover:border-orange-500/30'
                },
              ].map((value, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative p-8 rounded-2xl bg-neutral-950/60 border border-neutral-900/80 transition-all duration-500 backdrop-blur-md ${value.glow}`}
                >
                  <div className="mb-6 inline-flex p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 transition-transform duration-500 group-hover:-translate-y-1">
                    {value.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 tracking-tight">{value.title}</h3>
                  <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">{value.desc}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

      </main>
    </PageTransition>
  );
}

{/*

'use client';

import { motion } from 'framer-motion';
import PageTransition from '@/components/page-transition';

export default function AboutClient() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-black">
        <section className="relative min-h-[60vh] w-full overflow-hidden bg-black flex flex-col items-center justify-center pt-32 sm:pt-40 pb-16 sm:pb-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-black to-cyan-950/30" />
            <div className="absolute top-1/4 left-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-1/4 right-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-600/15 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: '1s' }}
            />
          </div>

          <div className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              About{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                ACOB
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-light leading-relaxed">
              Building Bangladesh&apos;s Premier Academic Olympiad Platform
            </p>
          </div>
        </section>

        <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                    Our Mission
                  </h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-6" />
                </div>

                <p className="text-lg text-white/80 leading-relaxed">
                  To foster intellectual excellence and critical thinking among
                  Bangladesh&apos;s brightest minds through rigorous academic
                  competition. We believe in creating opportunities that
                  transform potential into achievement.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold mt-1">✓</span>
                    <span className="text-white/75">
                      Empower students through challenging problems
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold mt-1">✓</span>
                    <span className="text-white/75">
                      Build a community of ambitious learners
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold mt-1">✓</span>
                    <span className="text-white/75">
                      Create pathways to career excellence
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                    Our Vision
                  </h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mb-6" />
                </div>

                <p className="text-lg text-white/80 leading-relaxed">
                  To become Asia&apos;s most prestigious academic olympiad,
                  recognized globally for developing the next generation of
                  innovators, leaders, and problem-solvers who will shape the
                  future of Bangladesh.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold mt-1">◆</span>
                    <span className="text-white/75">
                      Scale to 50+ partner institutions by 2026
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold mt-1">◆</span>
                    <span className="text-white/75">
                      Engage 10,000+ talented students annually
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold mt-1">◆</span>
                    <span className="text-white/75">
                      Establish industry partnerships for career growth
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-semibold text-white mb-4">
                Our Core Values
              </h2>

              <p className="text-lg text-white/70">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Excellence',
                  desc: 'We demand the highest standards in every aspect of our competition and operations.',
                  icon: (
                    <svg
                      className="w-8 h-8 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                    </svg>
                  ),
                },
                {
                  title: 'Innovation',
                  desc: 'We continuously evolve our problem-sets and methods to stay ahead of the curve.',
                  icon: (
                    <div className="text-cyan-400 font-mono text-2xl font-bold tracking-tighter select-none h-8 flex items-center">
                      &lt;/&gt;
                    </div>
                  ),
                },
                {
                  title: 'Inclusion',
                  desc: 'We welcome talented minds from all backgrounds and make opportunities accessible.',
                  icon: (
                    <svg
                      className="w-8 h-8 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 3v18M3 12h18" />
                    </svg>
                  ),
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-2xl glassmorphic border border-white/15 hover:border-purple-500/50 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                >
                  <div className="mb-4 flex items-center h-12">
                    {value.icon}
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {value.title}
                  </h3>

                  <p className="text-white/75">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
 */}