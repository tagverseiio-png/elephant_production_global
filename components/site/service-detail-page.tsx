'use client';

import { motion } from 'framer-motion';
import { servicesDetail } from '@/lib/data';
import { REGION_META } from '@/lib/region';
import { useRegionContext } from '@/components/site/region-context';

interface ServiceDetailPageProps {
  slug: string;
  onBack: () => void;
  onContact: () => void;
}

export default function ServiceDetailPage({
  slug,
  onBack,
  onContact,
}: ServiceDetailPageProps) {
  const { region } = useRegionContext();
  const meta = REGION_META[region];
  const service = servicesDetail.find((s) => s.slug === slug) ?? servicesDetail[0];

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
          <span className="text-[14px]">&larr;</span> Back to Services
        </button>

        <h1 className="text-[9vw] md:text-[5vw] font-black leading-[0.9] tracking-[-0.04em] uppercase font-oswald mb-8 text-[#111]">
          {service.h1}
        </h1>
        <p className="text-[11px] font-medium text-[#888] max-w-xl leading-relaxed tracking-wide mb-12">
          {meta.heroLead}. {meta.homeBase} — {meta.phone}.
        </p>

        <div className="w-full aspect-square md:aspect-[21/9] bg-gray-100 mb-16 md:mb-24 overflow-hidden">
          <motion.img
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src={service.img}
            alt={`${service.title} by Elephant Production`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 border-b border-gray-200 pb-16 md:pb-24 mb-16 md:mb-24">
          <div className="col-span-1 md:col-span-7 flex flex-col gap-6">
            <p className="text-xl md:text-2xl leading-[1.5] tracking-tight font-medium text-[#111]">
              {service.intro}
            </p>
            <ul className="flex flex-col gap-4 mt-4">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-4 text-[12px] md:text-sm text-[#444] leading-[1.8] tracking-wide"
                >
                  <span className="w-6 h-[1px] bg-[#111] block mt-3 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            {service.includes && (
              <p className="text-[12px] md:text-sm text-[#666] leading-[1.9] tracking-wide mt-4">
                {service.includes}
              </p>
            )}
          </div>
          <div className="col-span-1 md:col-span-4 md:col-start-9 flex flex-col gap-6">
            <div className="bg-[#111] text-white p-8 flex flex-col gap-4">
              <span className="text-[9px] uppercase tracking-widest font-bold text-white/60">
                {service.title}
              </span>
              <span className="text-lg font-bold tracking-tight">
                {service.cta}
              </span>
              <span className="text-[11px] text-white/70 leading-[1.8]">
                Singapore/Malaysia: +65 93515143. Chennai/Karaikudi: +91
                8012248366.
              </span>
              <button
                onClick={onContact}
                className="mt-2 bg-white text-[#111] px-8 py-4 text-[11px] font-bold tracking-widest uppercase hover:px-10 transition-all duration-500 text-left"
              >
                Check Availability &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
