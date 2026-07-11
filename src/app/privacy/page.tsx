'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

const sections = [
  {
    title: 'Who We Are',
    body: 'Elephant Productions is a boutique film production company based in Tel Aviv, Israel. This Privacy Policy explains how we collect, use, and protect information when you visit our website at elephantproductions.com.',
  },
  {
    title: 'Information We Collect',
    body: 'We may collect information you voluntarily provide — such as your email address when subscribing to our newsletter or contacting us. We also collect anonymised analytics data (e.g. page views, session duration) to improve site performance.',
  },
  {
    title: 'How We Use Your Information',
    body: 'We use your email to send updates about our films and releases (only if you have subscribed). We use anonymised analytics to understand how visitors use the site. We never sell, rent, or share your personal information with third parties for marketing purposes.',
  },
  {
    title: 'Data Retention',
    body: 'Newsletter subscriber emails are retained until you unsubscribe. Anonymised analytics data is retained for up to 26 months. Contact enquiry data is retained for up to 3 years for legitimate business purposes.',
  },
  {
    title: 'Your Rights',
    body: 'Under applicable data protection law (including GDPR where relevant), you have the right to access, correct, or delete your personal data; the right to object to or restrict processing; and the right to data portability. To exercise any of these rights, contact us at lee@elephantproductions.com.',
  },
  {
    title: 'Cookies',
    body: 'We use cookies to improve your experience. Please see our Cookie Policy for full details on the types of cookies we use and how to manage them.',
  },
  {
    title: 'Third-Party Links',
    body: 'Our website may contain links to external sites. We are not responsible for the privacy practices of those sites and encourage you to review their policies independently.',
  },
  {
    title: 'Security',
    body: 'We take reasonable technical and organisational measures to protect your personal information. However, no method of transmission over the internet is completely secure.',
  },
  {
    title: 'Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. The most recent version will always be available on this page with the date of last revision.',
  },
  {
    title: 'Contact Us',
    body: 'For any privacy-related queries, please contact: Elephant Productions, Dizengoff ST 123, Tel Aviv | lee@elephantproductions.com | +972-54-2804049',
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-elephant-ivory text-elephant-black flex flex-col">
      <section className="pt-32 sm:pt-44 pb-20 px-5 sm:px-10 md:px-16 max-w-4xl w-full mx-auto flex-1">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-12">
          <Link href="/" className="font-mono text-[9px] font-bold tracking-widest uppercase text-elephant-black/40 hover:text-elephant-black transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back
          </Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="mb-16">
          <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-elephant-black/40 block mb-4">Legal</span>
          <div className="border-t border-b border-elephant-black/15 py-6">
            <h1 className="font-serif text-[clamp(2.5rem,8vw,5rem)] font-black tracking-tight uppercase leading-[0.9]">Privacy Policy</h1>
          </div>
          <p className="font-mono text-[9px] text-elephant-black/40 tracking-widest mt-4">Last updated: January 2025</p>
        </motion.div>
        <div className="space-y-0">
          {sections.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }} className="py-7 border-b border-elephant-black/10">
              <span className="font-mono text-[8px] font-bold tracking-widest uppercase text-elephant-black/35 block mb-2">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="font-serif text-xl font-bold mb-3 uppercase tracking-wide">{s.title}</h2>
              <p className="font-sans text-sm text-elephant-black/70 leading-relaxed max-w-2xl">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
