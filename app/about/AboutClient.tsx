'use client';

import { motion } from 'framer-motion';
import PageTransition from '@/components/page-transition';

export default function AboutClient() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] w-full overflow-hidden bg-black flex flex-col items-center justify-center pt-32 sm:pt-40 pb-16 sm:pb-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-black to-cyan-950/30" />
            <div className="absolute top-1/4 left-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              About <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">ACOB</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-light leading-relaxed">
              Building Bangladesh&apos;s Premier Academic Olympiad Platform
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {/* Mission */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-semibold text-white mb-4">Our Mission</h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-6" />
                </div>
                <p className="text-lg text-white/80 leading-relaxed">
                  To foster intellectual excellence and critical thinking among Bangladesh&apos;s brightest minds through rigorous academic competition. We believe in creating opportunities that transform potential into achievement.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold mt-1">✓</span>
                    <span className="text-white/75">Empower students through challenging problems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold mt-1">✓</span>
                    <span className="text-white/75">Build a community of ambitious learners</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold mt-1">✓</span>
                    <span className="text-white/75">Create pathways to career excellence</span>
                  </li>
                </ul>
              </div>

              {/* Vision */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-semibold text-white mb-4">Our Vision</h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mb-6" />
                </div>
                <p className="text-lg text-white/80 leading-relaxed">
                  To become Asia&apos;s most prestigious academic olympiad, recognized globally for developing the next generation of innovators, leaders, and problem-solvers who will shape the future of Bangladesh.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold mt-1">◆</span>
                    <span className="text-white/75">Scale to 50+ partner institutions by 2026</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold mt-1">◆</span>
                    <span className="text-white/75">Engage 10,000+ talented students annually</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold mt-1">◆</span>
                    <span className="text-white/75">Establish industry partnerships for career growth</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-semibold text-white mb-4">Our Core Values</h2>
              <p className="text-lg text-white/70">The principles that guide everything we do</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Excellence',
                  desc: 'We demand the highest standards in every aspect of our competition and operations.',
                  icon: (
                    <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
                    <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 3v18M3 12h18" />
                    </svg>
                  ),
                },
              ].map((value, index) => (
                <div key={index} className="group p-8 rounded-2xl glassmorphic border border-white/15 hover:border-purple-500/50 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                  <div className="mb-4 flex items-center h-12">{value.icon}</div>
                  <h3 className="text-2xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-white/75">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats */}
      </main>
    </PageTransition>
  );
}