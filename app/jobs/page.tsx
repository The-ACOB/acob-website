import type { Metadata } from 'next';
import JobBoard from '@/components/sections/job-board';
import PageTransition from '@/components/page-transition';

export const metadata: Metadata = {
  title: 'Career Opportunities | ACOB - Join Our Mission',
  description: 'Explore rewarding career opportunities at ACOB. Join a team dedicated to fostering intellectual excellence and academic innovation in Bangladesh.',
};

export default function JobsPage() {
  return (
    <PageTransition>
      <main className="min-h-screen pt-20">
        <JobBoard />
      </main>
    </PageTransition>
  );
}
