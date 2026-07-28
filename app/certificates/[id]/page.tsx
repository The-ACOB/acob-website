"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Printer,
  Copy,
  User,
  Award,
  Calendar,
  Maximize2,
} from "lucide-react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { getCertificateById, Certificate } from "@/lib/supabase";

interface Props {
  params: Promise<{ id: string }>;
}

export default function SingleCertificatePage({ params }: Props) {
  const resolvedParams = use(params);
  const rawId = decodeURIComponent(resolvedParams.id || "");

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
        console.error("Error loading certificate:", e);
      } finally {
        setLoading(false);
      }
    }
    loadCert();
  }, [rawId]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-24">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-neutral-400 font-medium">
            Fetching Official Certificate Record...
          </span>
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
          <h1 className="text-2xl font-bold text-white mb-2">
            Certificate Not Found
          </h1>
          <p className="text-sm text-neutral-400 mb-6">
            No official ACOB certificate was found matching ID{" "}
            <code className="text-red-300 bg-red-950/60 px-2 py-0.5 rounded">
              {rawId}
            </code>
            .
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

  const certUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://acob.vercel.app/certificates/${certificate.certificate_id}`;

  return (
    <div className="min-h-screen bg-black text-white pt-20 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-purple-600/20 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
          <Link
            href="/verify"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-300 rounded-xl text-xs font-semibold transition-all w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Verify Another Certificate</span>
          </Link>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleShare}
              className="flex-1 sm:flex-none px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-200 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2"
            >
              {copied ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>{copied ? "Link Copied!" : "Share Link"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-5 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Status Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 mb-8 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-white text-sm sm:text-base">
                  Officially Verified Credential
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full uppercase">
                  Authentic
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Recorded in Applied Cognitio Olympiad Bangladesh Registry
              </p>
            </div>
          </div>

          <div className="font-mono text-xs text-purple-300 bg-black/60 border border-purple-500/30 px-3 py-1.5 rounded-lg self-start sm:self-auto">
            ID: <span className="font-bold">{certificate.certificate_id}</span>
          </div>
        </motion.div>

        {/* Mobile Swipe Notice */}
        <div className="sm:hidden flex items-center justify-between text-xs text-neutral-400 mb-2 px-1">
          <span className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-purple-400" /> Swipe
            horizontally to view full document
          </span>
          <span className="text-[10px] bg-neutral-800 px-2 py-0.5 rounded text-neutral-300 font-mono">
            100% Scale
          </span>
        </div>

        {/* Dynamic Scale Container */}
        <motion.div
          id="certificate-print"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full overflow-x-auto sm:overflow-hidden rounded-2xl shadow-2xl border border-white/20 bg-neutral-950 select-none ..."
        >
          <div className="relative aspect-[3508/2480] min-w-[650px] sm:min-w-0 w-full [container-type:inline-size]">
            {/* Background Template */}
            <img
              src="/clean_certificate_template.png"
              alt="ACOB Certificate Background"
              className="absolute inset-0 w-full h-full object-fill pointer-events-none"
            />

            {/* Content Safe Zone Canvas */}
            <div className="absolute inset-0 flex flex-col justify-between pt-[21cqw] pb-[5cqw] px-[22cqw] text-center text-black pointer-events-none">
              {/* Main Header Grouping */}
              <div className="space-y-[0.4cqw]">
                <h3 className="uppercase text-neutral-900 tracking-[0.22em] font-extrabold text-[1.9cqw] leading-none">
                  Certificate of Appreciation
                </h3>
                <p className="uppercase text-purple-900 font-bold tracking-[0.18em] text-[1.1cqw]">
                  {certificate.event_name}
                </p>
                <p className="uppercase text-neutral-500 tracking-[0.16em] font-medium text-[0.95cqw] pt-[0.4cqw]">
                  PRESENTED TO
                </p>
              </div>

              {/* Student Recipient Name */}
              <div className="my-[0.5cqw] flex items-center justify-center min-h-[16%]">
                <h1 className="font-black text-neutral-900 tracking-tight leading-none text-[5cqw] font-sans">
                  {certificate.student_name}
                </h1>
              </div>

              {/* Achievement Subtitle */}
              <div>
                <p className="text-neutral-700 font-medium text-[1.5cqw] leading-tight">
                  for outstanding performance as{" "}
                  <span className="font-extrabold text-neutral-950">
                    {certificate.achievement}
                  </span>
                </p>
              </div>

              {/* Refined Citation Text */}
              <div className="px-[1cqw] my-[0.3cqw]">
                <p className="text-neutral-600 tracking-wide font-medium text-[1.05cqw] leading-relaxed max-w-[85%] mx-auto">
                  In recognition of exemplary skill, intellectual rigor, and
                  outstanding performance demonstrated throughout the
                  competition.
                </p>
              </div>

              {/* Clean Footer Row */}
              <div className="w-full flex items-end justify-between pt-[1cqw] border-t border-neutral-300/40">
                {/* Metadata Column */}
                <div className="text-left space-y-[0.3cqw]">
                  <div className="flex items-center gap-[2cqw] text-[1.1cqw] text-neutral-800">
                    <p>
                      <span className="font-bold text-neutral-500 uppercase text-[0.85cqw] block">
                        Date Issued
                      </span>
                      {certificate.issue_date}
                    </p>
                    <p>
                      <span className="font-bold text-neutral-500 uppercase text-[0.85cqw] block">
                        Credential ID
                      </span>
                      <span className="font-mono text-neutral-900 font-bold">
                        {certificate.certificate_id}
                      </span>
                    </p>
                  </div>
                </div>

                {/* QR Code Block */}
                <div className="bg-white p-[0.6cqw] rounded-[0.8cqw] shadow-md border border-neutral-300 flex flex-col items-center shrink-0">
                  <QRCode
                    value={certUrl}
                    size={256}
                    className="w-[5.2cqw] h-[5.2cqw]"
                    level="H"
                  />
                  <span className="text-[0.6cqw] font-mono font-bold text-neutral-900 mt-[0.2cqw] tracking-wider">
                    SCAN TO VERIFY
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Details Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
            <span className="text-xs text-neutral-400 font-medium block mb-1">
              Student Recipient
            </span>
            <div className="text-lg font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-purple-400" />
              {certificate.student_name}
            </div>
          </div>

          <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
            <span className="text-xs text-neutral-400 font-medium block mb-1">
              Achievement Honor
            </span>
            <div className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              {certificate.achievement}
            </div>
          </div>

          <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
            <span className="text-xs text-neutral-400 font-medium block mb-1">
              Issue Date
            </span>
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
