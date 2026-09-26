'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '@/lib/data';

export default function FaqPage({ onContact }: { onContact: () => void }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen pt-32 pb-32 bg-white"
    >
      <div className="px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-200 pb-12">
          <h1 className="text-[12vw] md:text-[8vw] font-black tracking-[-0.05em] leading-[0.85] text-[#111] uppercase font-oswald">
            Questions,
            <br />
            Answered.
          </h1>
          <p className="text-[11px] font-medium text-[#888] max-w-xs md:text-right mt-8 md:mt-0 leading-relaxed tracking-wide">
            Everything about booking Elephant Production across Singapore,
            Chennai, Karaikudi &amp; Malaysia.
          </p>
        </div>

        <div className="max-w-4xl flex flex-col">
          {faqs.map((faq, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={idx}
                className="border-b border-gray-200 last:border-0"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center gap-8 py-8 text-left group"
                >
                  <span className="text-[10px] text-[#888] font-bold tracking-widest uppercase shrink-0">
                    0{idx + 1}
                  </span>
                  <span
                    className={`flex-1 text-base md:text-2xl font-bold tracking-tight transition-colors ${
                      isOpen ? 'text-[#111]' : 'text-[#111] group-hover:text-[#555]'
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`text-2xl font-light transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 pl-10 md:pl-14 text-[12px] md:text-sm text-[#666] leading-[1.9] tracking-wide max-w-3xl">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-[#111] text-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 max-w-4xl">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] uppercase tracking-widest font-bold text-white/60">
              Still curious?
            </span>
            <span className="text-xl md:text-2xl font-bold tracking-tight">
              How does booking Elephant Production work?
            </span>
            <span className="text-[11px] text-white/70 leading-[1.8]">
              Consult → Proposal → Shoot → Edit → Deliver in 4-6 weeks.
            </span>
          </div>
          <button
            onClick={onContact}
            className="bg-white text-[#111] px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:px-12 transition-all duration-500 shrink-0"
          >
            Check Availability &rarr;
          </button>
        </div>
      </div>
    </motion.div>
  );
}
