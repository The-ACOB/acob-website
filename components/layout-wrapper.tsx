'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';
import Footer from './footer';
import ScrollToTop from './scroll-to-top';
import PodcastPopup from './podcast-popup';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {/* Sitewide popup */}
      <PodcastPopup />
      {children}
      <ScrollToTop />
      <Footer />
    </>
  );
}
