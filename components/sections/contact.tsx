'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const contactInfo = [
  {
    type: 'email',
    title: 'Email Us',
    value: 'official.acobd@gmail.com',
    href: 'mailto:official.acobd@gmail.com',
    svgPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  },
  {
    type: 'phone',
    title: 'Call Us',
    value: '+880 1234 567890',
    href: 'tel:+8801234567890',
    svgPath: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.94.72l.54 2.21a1 1 0 01-.24.97l-2.02 2.02a15.918 15.918 0 006.57 6.57l2.02-2.02a1 1 0 01.97-.24l2.21.54a1 1 0 01.72.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
  },
  {
    type: 'location',
    title: 'Headquarters',
    value: 'Dhaka, Bangladesh',
    href: '#',
    svgPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzbyHqwLmldfymcmAcFOd8x38S_VgHx70vhaW4IQ3QvcGH7mrETITTyLpG-0B5LaLXIQQ/exec';

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        position: formData.subject,
        message: formData.message,
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload),
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Submission tracking failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden selection:bg-purple-500/30">
      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-5">
            Let&apos;s <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed font-light">
            Have questions about ACOB? We&apos;d love to hear from you. Reach out anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Contact Info - Left Side */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-between space-y-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="space-y-6">
              <h3 className="text-xl font-medium tracking-wide text-zinc-200">Contact Information</h3>
              <p className="text-sm text-zinc-500 font-light max-w-sm leading-relaxed">
                Connect directly with our team members or monitor official channels for fast response tracks.
              </p>
              
              <div className="space-y-4 pt-2">
                {contactInfo.map((info, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Link
                      href={info.href}
                      className="group flex items-center gap-4 p-4 rounded-xl bg-zinc-900/30 border border-white/[0.04] hover:border-zinc-800 hover:bg-zinc-900/60 transition-all duration-300"
                    >
                      <div className="p-3 rounded-lg bg-zinc-900 border border-white/[0.06] text-zinc-400 flex-shrink-0 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all w-11 h-11 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d={info.svgPath} />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-500">{info.title}</h4>
                        <p className="text-sm text-zinc-300 font-light mt-0.5 transition-colors group-hover:text-white">{info.value}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-white/[0.06]">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Follow ACOB</h4>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'Facebook', href: 'https://www.facebook.com/appliedcognitiobd', path: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
                  { name: 'YouTube', href: 'https://www.youtube.com/@appliedcognitiobd', path: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/appliedcognitiobd', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' }
                ].map((soc) => (
                  <Link
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-zinc-950 border border-white/[0.05] hover:border-purple-500/30 hover:bg-zinc-900/50 text-zinc-400 hover:text-white transition-all duration-200 flex items-center justify-center"
                    aria-label={soc.name}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d={soc.path} />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form - Right Side */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="p-8 md:p-10 rounded-2xl bg-zinc-900/20 backdrop-blur-md border border-white/[0.05] min-h-[520px] flex flex-col justify-center relative overflow-hidden">
              {submitStatus === 'success' ? (
                <div className="text-center space-y-5 py-6 relative z-10">
                  <div className="w-14 h-14 bg-cyan-500/5 border border-cyan-500/20 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium text-white">Message Transmitted!</h3>
                    <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed font-light">
                      Thank you for reaching out. Your entry has been securely compiled. One of our agents will review your details and get back to you shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-2 px-5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/[0.06] rounded-xl text-xs font-medium tracking-wide transition-all text-zinc-300 hover:text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="relative z-10">
                  <h3 className="text-xl font-medium text-zinc-200 mb-6">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium tracking-wider text-zinc-400 uppercase mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-950 border border-white/[0.05] text-white placeholder-zinc-600 focus:bg-zinc-900/40 focus:border-cyan-500/50 focus:outline-none transition-all duration-200"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium tracking-wider text-zinc-400 uppercase mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-950 border border-white/[0.05] text-white placeholder-zinc-600 focus:bg-zinc-900/40 focus:border-cyan-500/50 focus:outline-none transition-all duration-200"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium tracking-wider text-zinc-400 uppercase mb-2">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="What is this regarding?"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-950 border border-white/[0.05] text-white placeholder-zinc-600 focus:bg-zinc-900/40 focus:border-cyan-500/50 focus:outline-none transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium tracking-wider text-zinc-400 uppercase mb-2">Message</label>
                      <textarea
                        name="message"
                        placeholder="Your message details..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-950 border border-white/[0.05] text-white placeholder-zinc-600 focus:bg-zinc-900/40 focus:border-cyan-500/50 focus:outline-none transition-all duration-200 resize-none"
                        required
                      />
                    </div>

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/20 text-red-400 text-xs font-medium"
                      >
                        System error encountered. Please try again or reach out directly via email.
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-medium text-sm rounded-xl transition-all duration-300 shadow-lg shadow-purple-950/10 active:scale-[0.995] disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Processing Dispatch...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}