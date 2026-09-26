'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { portfolioWorks, type PortfolioWork } from '@/lib/data';
import { useRegionContext } from '@/components/site/region-context';

interface WorkPageProps {
  onWorkSelect: (work: PortfolioWork) => void;
}

export default function WorkPage({ onWorkSelect }: WorkPageProps) {
  const { region } = useRegionContext();
  // Region-first: viewer's home-region works surface first, others keep
  // their catalogue order. New Pic-Time works carry homeRegion in data.
  const orderedWorks = useMemo(() => {
    return [...portfolioWorks].sort((a, b) => {
      const ah = a.homeRegion === region ? 0 : 1;
      const bh = b.homeRegion === region ? 0 : 1;
      if (ah !== bh) return ah - bh;
      return portfolioWorks.indexOf(a) - portfolioWorks.indexOf(b);
    });
  }, [region]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen pt-32 pb-32 bg-white"
    >
      <div className="px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-gray-200 pb-12">
          <h1 className="text-[12vw] md:text-[8vw] font-black tracking-[-0.05em] leading-[0.85] text-[#111] uppercase font-oswald">
            Selected
            <br />
            Archives.
          </h1>
          <p className="text-[11px] font-medium text-[#888] max-w-xs md:text-right mt-8 md:mt-0 leading-relaxed tracking-wide">
            Indian Weddings, Pre-Wedding, Maternity, Baby, Family &amp;
            Corporate in Singapore, Chennai, Karaikudi &amp; Malaysia — candid
            + cinematic by Team Elephant Production.
          </p>
        </div>

        <div className="flex flex-col">
          {orderedWorks.map((work, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                onClick={() => onWorkSelect(work)}
                className={`group cursor-pointer flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 md:gap-16 items-center py-16 border-b border-gray-100 last:border-0`}
              >
                <div className="w-full md:w-[55%] overflow-hidden bg-gray-100 aspect-[4/3] md:aspect-[16/10] relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={work.img}
                    alt={`${work.title} — ${work.category} in ${work.location} by Elephant Production`}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                    style={{ filter: 'grayscale(20%)' }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <div className="w-full md:w-[45%] flex flex-col items-start px-4 md:px-0">
                  <span className="text-[10px] text-[#888] font-bold tracking-widest uppercase mb-6 flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-[#ddd] block" />
                    0{idx + 1} &mdash; {work.category}
                  </span>
                  <h2 className="text-[10vw] md:text-[6vw] font-bold leading-[0.9] tracking-[-0.03em] uppercase font-oswald text-[#111] group-hover:text-[#555] transition-colors duration-300">
                    {work.title}
                  </h2>
                  <div className="mt-8 flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-[#111] group-hover:underline underline-offset-4">
                    View Project <span className="text-[12px]">&rarr;</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
