'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { 
  Award, 
  Plus, 
  Search, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Download, 
  ShieldCheck, 
  Sparkles,
  QrCode,
  Calendar,
  User,
  Medal,
  RefreshCw,
  Lock,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { getAllCertificates, createCertificate, Certificate } from '@/lib/supabase';

interface Props {
  params: Promise<{ passcode: string }>;
}

export default function CertificateAdminPage({ params }: Props) {
  const resolvedParams = use(params);
  const passcode = decodeURIComponent(resolvedParams.passcode || '');

  const expectedPasscode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || '';
  const isValidPasscode = Boolean(
    passcode && 
    (expectedPasscode ? passcode === expectedPasscode : passcode.length > 0)
  );

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    student_name: '',
    event_name: 'National Cognitio Olympiad 2026',
    issue_date: new Date().toISOString().split('T')[0],
    achievement: 'First Place - Champion'
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const loadCertificates = async () => {
    setLoading(true);
    try {
      const data = await getAllCertificates();
      setCertificates(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isValidPasscode) {
      loadCertificates();
    }
  }, [isValidPasscode]);

  // Generate Unique ID format ACOB-YYYY-XXXX
  const generateUniqueId = () => {
    const year = new Date().getFullYear();
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `ACOB-${year}-${randomHex}`;
  };

  const handleCreateCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.student_name.trim()) return;

    setSubmitting(true);
    const uniqueCertId = generateUniqueId();

    try {
      const created = await createCertificate({
        certificate_id: uniqueCertId,
        student_name: formData.student_name,
        event_name: formData.event_name,
        issue_date: formData.issue_date,
        achievement: formData.achievement,
        issue_by: 'Applied Cognitio Olympiad Bangladesh'
      });

      setCertificates(prev => [created, ...prev]);
      setSuccessMessage(`Certificate generated! ID: ${uniqueCertId}`);
      setFormData({
        student_name: '',
        event_name: 'National Cognitio Olympiad 2026',
        issue_date: new Date().toISOString().split('T')[0],
        achievement: 'First Place - Champion'
      });
      setTimeout(() => {
        setSuccessMessage('');
        setShowModal(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const copyToClipboard = (certId: string) => {
    navigator.clipboard.writeText(certId);
    setCopiedId(certId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredCertificates = certificates.filter(cert =>
    cert.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.certificate_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.event_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isValidPasscode) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center">
          <Lock className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-neutral-400">Invalid Admin passcode provided in URL.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Bar Navigation & Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Certificates Console
              </span>
              <span className="text-xs text-neutral-500">Authenticated: {passcode}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-2">
              Certificate Management Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/admin/${encodeURIComponent(passcode)}`}
              className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-300 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Visual CMS</span>
            </Link>
            
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-purple-500/25 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Issue New Certificate</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
            <span className="text-xs text-neutral-400 font-medium">Total Issued Certificates</span>
            <div className="text-3xl font-extrabold text-white mt-1">{certificates.length}</div>
          </div>
          <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
            <span className="text-xs text-neutral-400 font-medium">Database Status</span>
            <div className="text-3xl font-extrabold text-emerald-400 mt-1 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              Realtime Synced
            </div>
          </div>
          <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
            <span className="text-xs text-neutral-400 font-medium">Public Verification Portal</span>
            <div className="mt-2">
              <Link href="/verify" target="_blank" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                <span>acob.vercel.app/verify</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Search & Actions Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by student, ID or event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900/80 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500"
            />
          </div>
          
          <button
            onClick={loadCertificates}
            className="p-2.5 bg-neutral-900 border border-white/10 rounded-xl hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all text-xs flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh Table
          </button>
        </div>

        {/* Certificate Records Table */}
        <div className="bg-neutral-900/60 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-950/80 text-neutral-400 text-xs uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-4 px-6">Certificate ID</th>
                  <th className="py-4 px-6">Student Name</th>
                  <th className="py-4 px-6">Event</th>
                  <th className="py-4 px-6">Achievement</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredCertificates.length > 0 ? (
                  filteredCertificates.map((cert) => (
                    <tr key={cert.certificate_id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-mono text-purple-300 font-semibold flex items-center gap-2">
                        <span>{cert.certificate_id}</span>
                        <button
                          onClick={() => copyToClipboard(cert.certificate_id)}
                          className="text-neutral-500 hover:text-white transition-colors"
                          title="Copy ID"
                        >
                          {copiedId === cert.certificate_id ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-6 font-medium text-white">{cert.student_name}</td>
                      <td className="py-4 px-6 text-neutral-300">{cert.event_name}</td>
                      <td className="py-4 px-6 text-amber-300 font-medium">{cert.achievement}</td>
                      <td className="py-4 px-6 text-neutral-400 text-xs">{cert.issue_date}</td>
                      <td className="py-4 px-6 text-right flex items-center justify-end gap-2">
                        <Link
                          href={`/certificates/${cert.certificate_id}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1.5 rounded-lg transition-all"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        <Link
                          href={`/verify?id=${cert.certificate_id}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1.5 rounded-lg transition-all"
                        >
                          <span>Verify</span>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-neutral-500">
                      No certificates found. Click "Issue New Certificate" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Form for Creating Certificate */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-neutral-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-400" />
                  Issue New Certificate
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-neutral-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {successMessage && (
                <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleCreateCertificate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mahfuzur Rahman"
                    value={formData.student_name}
                    onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Event / Olympiad Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.event_name}
                    onChange={(e) => setFormData({ ...formData, event_name: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Achievement / Position
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.achievement}
                    onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.issue_date}
                    onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 bg-neutral-800 text-neutral-300 rounded-xl text-sm font-medium hover:bg-neutral-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl text-sm hover:from-purple-500 hover:to-cyan-500 disabled:opacity-50"
                  >
                    {submitting ? 'Generating...' : 'Auto-Generate & Save'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}
