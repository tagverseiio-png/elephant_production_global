'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

const sections = [
  {
    title: 'Acceptance of Terms',
    body: 'By accessing or using the Elephant Productions website, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use our site.',
  },
  {
    title: 'Intellectual Property',
    body: 'All content on this website — including films, photographs, text, graphics, logos, and design elements — is the exclusive property of Elephant Productions and is protected by applicable copyright and intellectual property laws.',
  },
  {
    title: 'Permitted Use',
    body: 'You may browse the website for personal, non-commercial purposes. You may not reproduce, distribute, modify, publicly display, or create derivative works from any content without prior written permission from Elephant Productions.',
  },
  {
    title: 'Film Content',
    body: 'All film content, trailers, and stills are copyright of Elephant Productions or the respective rights holders. Unauthorised copying, screenshotting, or distribution of film materials is strictly prohibited.',
  },
  {
    title: 'Disclaimer of Warranties',
    body: 'This website is provided on an "as is" basis. Elephant Productions makes no warranties, express or implied, regarding the accuracy, completeness, or reliability of any information on the site.',
  },
  {
    title: 'Limitation of Liability',
    body: 'To the fullest extent permitted by law, Elephant Productions shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website.',
  },
  {
    title: 'Changes to Terms',
    body: 'We reserve the right to update these Terms at any time. Continued use of the site following any changes constitutes your acceptance of the revised Terms.',
  },
  {
    title: 'Contact',
    body: 'For questions regarding these Terms, please contact us at lee@elephantproductions.com.',
  },
];

export default function TermsPage() {
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
            <h1 className="font-serif text-[clamp(2.5rem,8vw,5rem)] font-black tracking-tight uppercase leading-[0.9]">Terms of Use</h1>
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
