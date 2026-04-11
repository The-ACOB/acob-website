import Hero from '@/components/sections/hero';
import Philosophy from '@/components/sections/philosophy';
import Benefits from '@/components/sections/benefits';
import Stats from '@/components/sections/stats';
import Testimonials from '@/components/sections/testimonials';
import FAQ from '@/components/sections/faq';
import PageTransition from '@/components/page-transition';

export default function Home() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-black">
        <Hero />
        <Philosophy />
        <Benefits />
        <Stats />
        <Testimonials />
        <FAQ />
      </main>
    </PageTransition>
  );
}
