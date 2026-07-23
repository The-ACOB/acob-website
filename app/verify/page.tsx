'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Search, Award, Calendar, CheckCircle2, ArrowRight, ExternalLink, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { getCertificateById, Certificate } from '@/lib/supabase';

export default function VerifyCertificatePage() {
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const cert = await getCertificateById(searchId);
      setCertificate(cert);
    } catch (err) {
      console.error(err);
      setCertificate(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-purple-600/10 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Official Verification Portal
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-purple-400 bg-clip-text text-transparent"
          >
            Verify Credentials & Certificates
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-neutral-400 text-base sm:text-lg"
          >
            Enter the unique Certificate ID (e.g. <code className="bg-purple-950/80 px-2 py-0.5 rounded text-purple-300 border border-purple-800/40">ACOB-2026-98A1B</code>) to authenticate official achievements.
          </motion.p>
        </div>

        {/* Search Input Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 p-4 sm:p-6 rounded-3xl shadow-2xl mb-12"
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter Certificate ID (e.g., ACOB-2026-98A1B)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all text-base"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-medium px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Verify Now</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 px-2">
            <span>Try sample IDs: <button type="button" onClick={() => setSearchId('ACOB-2026-98A1B')} className="text-purple-400 underline hover:text-purple-300">ACOB-2026-98A1B</button> or <button type="button" onClick={() => setSearchId('ACOB-2026-77F4C')} className="text-purple-400 underline hover:text-purple-300">ACOB-2026-77F4C</button></span>
            <span className="hidden sm:inline">Encrypted Realtime Verification</span>
          </div>
        </motion.div>

        {/* Results View */}
        {searched && !loading && (
          certificate ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-purple-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Top verification badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      Verified Authentic Certificate
                    </h3>
                    <p className="text-xs text-emerald-400 font-medium">Recorded in ACOB Official Registry</p>
                  </div>
                </div>

                <div className="px-4 py-2 bg-neutral-900 border border-white/10 rounded-xl text-xs font-mono text-neutral-300">
                  ID: <span className="text-purple-300 font-bold">{certificate.certificate_id}</span>
                </div>
              </div>

              {/* Certificate Card Design */}
              <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-4 text-center md:text-left flex-1">
                    <div>
                      <span className="text-xs font-semibold uppercase text-purple-400 tracking-wider">Recipient Name</span>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                        {certificate.student_name}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                      <div>
                        <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">Event / Competition</span>
                        <div className="text-sm font-semibold text-neutral-200 flex items-center justify-center md:justify-start gap-2">
                          <Award className="w-4 h-4 text-cyan-400" />
                          {certificate.event_name}
                        </div>
                      </div>

                      <div>
                        <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">Achievement Honor</span>
                        <div className="text-sm font-semibold text-amber-300">
                          {certificate.achievement}
                        </div>
                      </div>

                      <div>
                        <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">Date Issued</span>
                        <div className="text-sm text-neutral-300 flex items-center justify-center md:justify-start gap-2">
                          <Calendar className="w-4 h-4 text-purple-400" />
                          {certificate.issue_date}
                        </div>
                      </div>

                      <div>
                        <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">Issuing Authority</span>
                        <div className="text-sm text-neutral-300">
                          {certificate.issue_by || 'Applied Cognitio Olympiad Bangladesh'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl shrink-0 shadow-lg border border-white/20">
                    <QRCode
                      value={typeof window !== 'undefined' ? `${window.location.origin}/verify?id=${certificate.certificate_id}` : certificate.certificate_id}
                      size={120}
                      level="H"
                    />
                    <span className="text-[10px] text-neutral-900 font-mono mt-2 font-bold tracking-tight">SCAN TO VERIFY</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900/60 border border-red-500/30 rounded-3xl p-8 text-center max-w-xl mx-auto"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto mb-4">
                !
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Certificate Not Found</h3>
              <p className="text-neutral-400 text-sm mb-6">
                No official record matched Certificate ID <code className="text-red-300 bg-red-950/60 px-2 py-0.5 rounded">{searchId}</code>. Please double-check the ID or contact ACOB support.
              </p>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}
