import type { Metadata } from 'next';
import ContactSection from '@/components/sections/contact';
import PageTransition from '@/components/page-transition';

export const metadata: Metadata = {
  title: 'Contact Us | ACOB - Get in Touch',
  description: 'Have questions about ACOB? Contact our team for inquiries regarding competitions, partnerships, or resources.',
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
