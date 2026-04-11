import type { Metadata } from 'next';
import ContactSection from '@/components/sections/contact';
import PageTransition from '@/components/page-transition';

export const metadata: Metadata = {
  title: 'Contact - ACOB',
  description: 'Get in touch with ACOB. We&apos;d love to hear from you.',
};

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="min-h-screen pt-20">
        <ContactSection />
      </main>
    </PageTransition>
  );
}
