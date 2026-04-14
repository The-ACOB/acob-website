import type { Metadata } from 'next';
import Leadership from '@/components/sections/leadership';
import ExecutiveBoard from '@/components/sections/executive-board';
import PageTransition from '@/components/page-transition';

export const metadata: Metadata = {
  title: 'Meet the Team | ACOB - Applied Cognitio Olympiad Bangladesh',
  description: 'Learn about the visionaries and experts leading Applied Cognitio Olympiad Bangladesh (ACOB). Meet our leadership and executive board.',
};

export default function TeamPage() {
  return (
    <PageTransition>
      <main className="min-h-screen pt-20">
        <Leadership />
        <ExecutiveBoard />
      </main>
    </PageTransition>
  );
}
