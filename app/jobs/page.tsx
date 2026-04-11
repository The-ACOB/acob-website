import type { Metadata } from 'next';
import JobBoard from '@/components/sections/job-board';
import PageTransition from '@/components/page-transition';

export const metadata: Metadata = {
  title: 'Jobs - ACOB',
  description: 'Explore career opportunities and join the ACOB team.',
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
