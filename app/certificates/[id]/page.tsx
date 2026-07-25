'use client';

import { useState, useEffect, useRef, use } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft,
  Printer,
  Copy,
  User,
  Award,
  Calendar,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { getCertificateById, Certificate } from '@/lib/supabase';

interface Props {
  params: Promise<{ id: string }>;
}

export default function SingleCertificatePage({ params }: Props) {
  const resolvedParams = use(params);
  const rawId = decodeURIComponent(resolvedParams.id || '');
  
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadCert() {
      if (!rawId) return;
      setLoading(true);
      try {
        const cert = await getCertificateById(rawId);
        setCertificate(cert);
      } catch (e) {
        console.error('Error loading certificate:', e);
      } finally {
        setLoading(false);
      }
    }
    loadCert();
  }, [rawId]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-24">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-neutral-400 font-medium">Fetching Official Certificate Record...</span>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="min-h-screen bg-black text-white pt-36 pb-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-neutral-900/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
            !
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Certificate Not Found</h1>
          <p className="text-sm text-neutral-400 mb-6">
            No official ACOB certificate was found matching ID <code className="text-red-300 bg-red-950/60 px-2 py-0.5 rounded">{rawId}</code>.
          </p>
          <Link
            href="/verify"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Go to Search Portal
          </Link>
        </div>
      </div>
    );
  }

  const certUrl = typeof window !== 'undefined' ? window.location.href : `https://acob.vercel.app/certificates/${certificate.certificate_id}`;

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-r from-purple-600/15 via-cyan-500/15 to-purple-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Top Header & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <Link
            href="/verify"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-300 rounded-xl text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Verify Another Certificate</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-200 rounded-xl text-xs font-semibold transition-all flex items-center gap-2"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Link Copied!' : 'Share Link'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Verification Status Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 mb-8 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">Officially Verified Credential</span>
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full uppercase">Authentic</span>
              </div>
              <p className="text-xs text-neutral-400">Recorded in Applied Cognitio Olympiad Bangladesh Registry</p>
            </div>
          </div>

          <div className="font-mono text-xs text-purple-300 bg-black/60 border border-purple-500/30 px-3 py-1.5 rounded-lg">
            ID: <span className="font-bold">{certificate.certificate_id}</span>
          </div>
        </motion.div>

        {/* Clean Official Certificate Visual Canvas Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative aspect-[3508/2480] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-neutral-950 select-none"
        >
          {/* Background Clean ACOB Template Image (without pre-rendered text layers) */}
          <img
            src="/clean_certificate_template.png"
            alt="ACOB Certificate Background"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />

          {/* Precision Text & Asset Overlays */}
          <div className="absolute inset-0 flex flex-col justify-between p-[4%] text-center text-black pointer-events-none">
            
            {/* Top Header / Logo Space */}
            <div className="h-[22%]" />

            {/* Title & Presented To */}
            <div className="space-y-[0.5%]">
              <h3 className="uppercase text-neutral-800 tracking-[0.25em] font-medium text-[9px] sm:text-sm md:text-xl lg:text-2xl">
                This Certificate Of Appreciation
              </h3>
              <p className="uppercase text-neutral-600 tracking-[0.2em] font-medium text-[8px] sm:text-xs md:text-lg lg:text-xl">
                Is Proudly Presented To
              </p>
            </div>

            {/* Recipient Student Name (Perfectly Centered & Scaled) */}
            <div className="my-[1%] px-[5%] flex items-center justify-center min-h-[14%]">
              <h1 
                className="font-bold text-neutral-900 tracking-tight leading-none drop-shadow-sm font-sans"
                style={{ fontSize: 'clamp(1.6rem, 5.2vw, 5.5rem)' }}
              >
                {certificate.student_name}
              </h1>
            </div>

            {/* Achievement Honor Line */}
            <div className="px-[8%] my-[0.5%]">
              <p className="text-neutral-700 font-medium text-[9px] sm:text-sm md:text-xl lg:text-2xl">
                for outstanding performance as <span className="font-bold text-neutral-900">{certificate.achievement}</span>
              </p>
            </div>

            {/* Congratulatory Sub-text */}
            <div className="px-[12%] my-[1%] space-y-[0.5%]">
              <p className="uppercase text-neutral-800 tracking-wider font-semibold text-[7px] sm:text-[10px] md:text-sm lg:text-base">
                Congratulations on your performance. Your exceptional
              </p>
              <p className="uppercase text-neutral-600 tracking-wider font-medium text-[6px] sm:text-[9px] md:text-xs lg:text-sm">
                understanding of concepts and outstanding practical application have distinguished your performance.
              </p>
            </div>

            {/* Bottom Footer Section: Event Name on Left, Date & ID, and QR Code */}
            <div className="w-full flex items-end justify-between px-[5%] mb-[1%] pt-[1%]">
              
              {/* Event Name & Date Info on Left Bottom */}
              <div className="text-left space-y-1 text-[8px] sm:text-xs md:text-sm lg:text-base text-neutral-900">
                <div>
                  <span className="text-neutral-500 uppercase tracking-wider text-[7px] sm:text-[9px] md:text-xs block font-bold">Event</span>
                  <p className="font-extrabold text-neutral-900 leading-tight drop-shadow-sm">
                    {certificate.event_name}
                  </p>
                </div>

                <div className="pt-1 flex items-center gap-3 text-[7px] sm:text-[10px] md:text-xs text-neutral-700">
                  <p><span className="font-bold">Date:</span> {certificate.issue_date}</p>
                  <p className="font-mono text-[7px] sm:text-[10px] text-neutral-600">ID: {certificate.certificate_id}</p>
                </div>
              </div>

              {/* Scannable QR Code on Right Bottom */}
              <div className="bg-white p-1.5 sm:p-2.5 rounded-xl shadow-lg border border-neutral-200 flex flex-col items-center shrink-0">
                <QRCode
                  value={certUrl}
                  size={68}
                  className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20"
                  level="H"
                />
                <span className="text-[6px] sm:text-[8px] font-mono font-bold text-neutral-900 mt-1 tracking-tighter">
                  VERIFY ONLINE
                </span>
              </div>

            </div>

          </div>
        </motion.div>

        {/* Bottom Details Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
            <span className="text-xs text-neutral-400 font-medium block mb-1">Student Recipient</span>
            <div className="text-lg font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-purple-400" />
              {certificate.student_name}
            </div>
          </div>

          <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
            <span className="text-xs text-neutral-400 font-medium block mb-1">Achievement Honor</span>
            <div className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              {certificate.achievement}
            </div>
          </div>

          <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
            <span className="text-xs text-neutral-400 font-medium block mb-1">Issue Date</span>
            <div className="text-lg font-bold text-cyan-400 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              {certificate.issue_date}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
