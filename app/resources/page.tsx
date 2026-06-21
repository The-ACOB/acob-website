import PageTransition from '@/components/page-transition';
import { ArrowRight, BookOpen, Video, Download } from 'lucide-react';

export const metadata = {
  title: 'Resources | ACOB - Study Materials & Guides',
  description: 'Access study materials, video tutorials, and preparation guides for ACOB competition.',
};

const resources = [
  {
    category: 'Study Guides',
    icon: BookOpen,
    items: [
      {
        title: 'ACOB Problem-Solving Framework',
        desc: 'Master the systematic approach to tackling complex problems',
        type: 'PDF',
      },
      {
        title: 'Critical Thinking Workbook',
        desc: 'Develop analytical skills with curated exercises',
        type: 'PDF',
      },
      {
        title: 'Past Papers Analysis 2023-2024',
        desc: 'Understand problem patterns and solution strategies',
        type: 'PDF',
      },
    ],
  },
  {
    category: 'Video Tutorials',
    icon: Video,
    items: [
      {
        title: 'Getting Started with ACOB',
        desc: 'Introduction to the competition format and expectations',
        type: 'Video',
      },
      {
        title: 'Time Management Strategies',
        desc: 'Excel in competitive exams with smart planning',
        type: 'Video',
      },
      {
        title: 'Expert Tips & Tricks',
        desc: 'Learn secrets from ACOB winners',
        type: 'Video',
      },
    ],
  },
  {
    category: 'Competition Resources',
    icon: Download,
    items: [
      {
        title: 'Sample Problems & Solutions',
        desc: 'Practice with actual ACOB-level problems',
        type: 'Download',
      },
      {
        title: 'Competition Rules Handbook',
        desc: 'Complete guide to ACOB rules and regulations',
        type: 'Download',
      },
      {
        title: 'Registration Checklist',
        desc: 'Everything you need before competition day',
        type: 'Download',
      },
    ],
  },
];

export default function Resources() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-black">
        {/* Hero */}
        <section className="relative min-h-[50vh] w-full overflow-hidden bg-black flex flex-col items-center justify-center pt-32 sm:pt-40 pb-16 sm:pb-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 via-black to-purple-950/30" />
            <div className="absolute top-1/3 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Learning <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Resources</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 font-light leading-relaxed">
              Comprehensive study materials to prepare for ACOB success
            </p>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-16">
              {resources.map((category, idx) => {
                const Icon = category.icon;
                return (
                  <div key={idx} className="space-y-6">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-purple-600/50 to-cyan-600/30 border border-purple-500/30">
                        <Icon className="w-6 h-6 text-purple-200" />
                      </div>
                      <h2 className="text-2xl font-semibold text-white">{category.category}</h2>
                    </div>

                    <div className="space-y-4">
                      {category.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="group p-6 rounded-xl glassmorphic border border-white/15 hover:border-cyan-500/50 transition-all cursor-pointer hover:shadow-[0_0_30px_rgba(0,217,255,0.15)]"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-sm text-white/70">{item.desc}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                          </div>
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <span className="text-xs font-semibold text-cyan-400/90">{item.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Featured Section */}
            <div className="bg-gradient-to-r from-purple-600/20 via-black to-cyan-600/20 border border-white/20 rounded-3xl p-12 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                Get Premium Access to All Resources
              </h3>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Register for ACOB to unlock exclusive study materials, mentorship sessions, and expert guidance.
              </p>
              <a
                href="/enroll"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold rounded-lg transition-all"
              >
                Join Our Waitlist
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
