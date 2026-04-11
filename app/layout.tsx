import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ScrollToTop from '@/components/scroll-to-top'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
}

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: 'ACOB - Applied Cognitio Olympiad Bangladesh',
  description: 'Bangladesh\'s premier academic competition fostering critical thinking, problem-solving excellence, and intellectual innovation. Join ACOB to challenge your cognitive limits.',
  keywords: ['olympiad', 'competition', 'education', 'stem', 'bangladesh', 'cognitio', 'academic excellence', 'critical thinking', 'acob'],
  authors: [{ name: 'ACOB Team' }],
  metadataBase: new URL('https://acob.vercel.app'),
  alternates: {
    canonical: '/',
  },
  generator: 'ACOB Platform',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'ACOB - Applied Cognitio Olympiad Bangladesh',
    description: 'Fostering intellectual innovation and academic excellence among Bangladesh\'s brightest minds.',
    type: 'website',
    locale: 'en_US',
    url: 'https://acob.vercel.app',
    siteName: 'ACOB',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'ACOB Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACOB - Applied Cognitio Olympiad Bangladesh',
    description: 'Bangladesh\'s premier academic competition for intellectual innovation.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className="font-sans antialiased bg-black text-white">
        <Navbar />
        {children}
        <ScrollToTop />
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
