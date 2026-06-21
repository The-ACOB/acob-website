import type { Metadata } from 'next';
import Leadership from '@/components/sections/leadership';
import ExecutiveBoard from '@/components/sections/executive-board';
import PageTransition from '@/components/page-transition';

export const metadata: Metadata = {
  title: 'Meet the Team | ACOB - Applied Cognitio Olympiad Bangladesh',
  description: 'Learn about the visionaries and experts leading Applied Cognitio Olympiad Bangladesh (ACOB). Meet our leadership and executive board.',
};

export default function TeamPage() {
  // Set this to true when you want to make the team public!
  const showTeam = false;

  return (
    <PageTransition>
      <main className="min-h-screen pt-20">
        {showTeam ? (
          <>
            <Leadership />
            <ExecutiveBoard />
          </>
        ) : (
          /* Coming Soon / Under Construction State */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <span className="px-3 py-1 text-xs font-semibold tracking-wider text-purple-400 bg-purple-950/40 border border-purple-800/50 rounded-full mb-4 animate-pulse">
              Under Development
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Coming Soon</span>
            </h1>
            <p className="text-gray-400 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
              We are currently finalizing our leadership profiles and executive roster. Check back soon to meet the minds behind ACOB!
            </p>
          </div>
        )}
      </main>
    </PageTransition>
  );
}