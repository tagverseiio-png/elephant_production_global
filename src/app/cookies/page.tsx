'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

const sections = [
  {
    title: 'What Are Cookies',
    body: 'Cookies are small text files placed on your device when you visit our website. They allow us to recognise your browser and remember certain information to improve your experience.',
  },
  {
    title: 'How We Use Cookies',
    body: 'We use cookies to understand how visitors interact with our site (analytics), to remember your preferences, and to ensure the site functions correctly. We do not use cookies for advertising or to sell your data.',
  },
  {
    title: 'Types of Cookies We Use',
    body: 'Strictly necessary cookies — required for the site to function. Analytics cookies (anonymised) — help us understand page performance. Preference cookies — remember settings such as your last-viewed film.',
  },
  {
    title: 'Third-Party Cookies',
    body: 'Some pages may embed content from third-party services (e.g. video players). These services may set their own cookies, governed by their respective privacy policies.',
  },
  {
    title: 'Managing Cookies',
    body: 'You can control and delete cookies through your browser settings. Disabling cookies may affect the functionality of certain parts of the site.',
  },
  {
    title: 'Contact',
    body: 'If you have any questions about our use of cookies, please contact us at lee@elephantproductions.com.',
  },
];

export default function CookiesPage() {
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
            <h1 className="font-serif text-[clamp(2.5rem,8vw,5rem)] font-black tracking-tight uppercase leading-[0.9]">Cookie Policy</h1>
          </div>
          <p className="font-mono text-[9px] text-elephant-black/40 tracking-widest mt-4">Last updated: January 2025</p>
        </motion.div>
        <div className="space-y-0">
          {sections.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }} className="py-7 border-b border-elephant-black/10">
              <span className="font-mono text-[8px] font-bold tracking-widest uppercase text-elephant-black/35 block mb-2">0{i + 1}</span>
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
