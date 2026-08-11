import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import PodcastPopup from "@/components/podcast-popup"; // 👈 Add global popup import here
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title:
    "ACOB | Applied Cognitio Olympiad Bangladesh - Premier Academic Competition",
  description:
    "Bangladesh's premier academic competition fostering critical thinking, problem-solving excellence, and intellectual innovation. Join ACOB to challenge your cognitive limits.",
  keywords: [
    "olympiad",
    "competition",
    "education",
    "stem",
    "bangladesh",
    "cognitio",
    "academic excellence",
    "critical thinking",
    "acob",
    "acobd",
    "applied cognitio",
  ],
  authors: [{ name: "ACOB Team" }],
  metadataBase: new URL("https://www.theacob.com"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "Ko1DxraRMfkFIx5bxrDZ9yX4btw_ixwGUqRzbc_kVTk",
  },
  generator: "ACOB Platform",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "ACOB - Applied Cognitio Olympiad Bangladesh",
    description:
      "Fostering intellectual innovation and academic excellence among Bangladesh's brightest minds.",
    type: "website",
    locale: "en_US",
    url: "https://www.theacob.com",
    siteName: "ACOB",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ACOB Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ACOB - Applied Cognitio Olympiad Bangladesh",
    description:
      "Bangladesh's premier academic competition for intellectual innovation.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Applied Cognitio Olympiad Bangladesh",
  alternateName: "ACOB",
  url: "https://www.theacob.com",
  logo: "https://www.theacob.com/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "",
    contactType: "customer service",
    email: "contact@acobd.com",
    availableLanguage: ["English", "Bengali"],
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61582673745324",
    "https://linkedin.com/company/acobd",
    "https://instagram.com/acobd",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className="font-sans antialiased bg-black text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />

        {/* Rendered sitewide, listening contextually to users navigating on home or materials paths */}
        <PodcastPopup />

        {children}
        <ScrollToTop />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 539cb75 (added signup and loging and fixed seo)
