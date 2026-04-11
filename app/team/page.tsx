import type { Metadata } from 'next';
import Leadership from '@/components/sections/leadership';
import ExecutiveBoard from '@/components/sections/executive-board';
import PageTransition from '@/components/page-transition';

export const metadata: Metadata = {
  title: 'Team - ACOB',
  description: 'Meet the leadership and executive board of Applied Cognitio Olympiad Bangladesh.',
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
