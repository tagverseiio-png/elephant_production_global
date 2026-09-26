'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { PortfolioWork } from '@/lib/data';

interface WorkDetailPageProps {
  work: PortfolioWork;
  onBack: () => void;
}

export default function WorkDetailPage({ work, onBack }: WorkDetailPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen pt-32 pb-32 bg-white"
    >
      <div className="px-6 md:px-12">
        <button
          onClick={onBack}
          className="text-[9px] uppercase tracking-[0.2em] font-bold mb-12 hover:opacity-50 flex items-center gap-3 transition-opacity text-[#111]"
        >
          <span className="text-[14px]">&larr;</span> Back to Archives
        </button>

        <h1 className="text-[14vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase font-oswald mb-12 text-[#111]">
          {work.title}
        </h1>

        <div className="w-full aspect-square md:aspect-[21/9] bg-gray-100 mb-16 md:mb-24 overflow-hidden">
          <motion.img
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src={work.img}
            alt={`${work.title} — ${work.category} in ${work.location} by Elephant Production`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 border-b border-gray-200 pb-16 md:pb-24 mb-16 md:mb-24">
          <div className="col-span-1 md:col-span-4 flex flex-row md:flex-col gap-8 md:gap-8 text-[9px] uppercase tracking-widest text-[#666] flex-wrap">
            <div className="flex flex-col gap-2">
              <span className="font-bold text-[#111]">Client</span> {work.client}
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-[#111]">Location</span>{' '}
              {work.location}
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-[#111]">Category</span>{' '}
              {work.category}
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-[#111]">Year</span> {work.year}
            </div>
          </div>
          <div className="col-span-1 md:col-span-7 md:col-start-6">
            <h3 className="text-xl md:text-3xl leading-[1.5] tracking-tight font-medium text-[#111]">
              {work.description}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {work.gallery.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="w-full aspect-[3/4] md:aspect-square overflow-hidden bg-gray-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`${work.title} — ${work.category} gallery in ${work.location} by Elephant Production`}
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(10%)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
