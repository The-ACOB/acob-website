'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Facebook } from 'lucide-react';
import Link from 'next/link';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'official.acobd@gmail.com',
    href: 'mailto:official.acobd@gmail.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+880 1234 567890',
    href: 'tel:+8801234567890',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Dhaka, Bangladesh',
    href: '#',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
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
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Background send using fetch (e.g., to an API route or a service like Formspree)
      // You can replace this URL with your actual Formspree or Getform endpoint:
      // const FORM_ENDPOINT = "https://formspree.io/f/your_form_id";
      
      const response = await fetch('https://formspree.io/f/mqaevewy', { // Using a generic endpoint or user can provide one
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _to: 'official.acobd@gmail.com'
        }),
      });

      if (response.ok) {
        setSubmitMessage(
          'Thank you! Your message has been sent successfully.'
        );
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitMessage(
        'Sorry, something went wrong. Please try again or email us directly.'
      );
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Let&apos;s <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Have questions about ACOB? We&apos;d love to hear from you. Reach out anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info - Left Side */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div>
              <h3 className="text-2xl font-semibold text-white mb-8">Contact Information</h3>
            </div>

            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Link
                    href={info.href}
                    className="group flex items-start gap-5 p-6 rounded-2xl glassmorphic border border-white/15 hover:border-purple-500/50 hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-600/40 to-cyan-600/30 text-purple-300 flex-shrink-0 group-hover:from-purple-600/60 group-hover:to-cyan-600/50 transition-all">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg">{info.title}</h4>
                      <p className="text-white/70 text-base mt-1 group-hover:text-white/90 transition-colors">{info.value}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}

            {/* Social Links */}
            <div className="pt-6 border-t border-white/10">
              <h4 className="text-white font-semibold mb-6">Follow ACOB</h4>
              <Link
                href="https://facebook.com/acobd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 hover:border-purple-500/40 text-white/70 hover:text-white transition-all duration-300"
              >
                <Facebook size={20} />
                <span className="font-medium">Facebook</span>
              </Link>
            </div>
          </motion.div>

          {/* Contact Form - Right Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="p-8 rounded-2xl glassmorphic border border-white/15 hover:border-cyan-500/30 transition-all">
              <h3 className="text-2xl font-semibold text-white mb-8">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder-white/50 focus:bg-white/10 focus:border-purple-500 focus:outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder-white/50 focus:bg-white/10 focus:border-purple-500 focus:outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder-white/50 focus:bg-white/10 focus:border-purple-500 focus:outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Message</label>
                  <textarea
                    name="message"
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder-white/50 focus:bg-white/10 focus:border-purple-500 focus:outline-none transition-all resize-none"
                    required
                  />
                </div>

                {submitMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-green-500/15 border border-green-500/40 text-green-300 text-sm font-medium"
                  >
                    {submitMessage}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3.5 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
