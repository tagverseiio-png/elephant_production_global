'use client';

import { motion } from 'framer-motion';
import { locationsDetail } from '@/lib/data';

interface LocationDetailPageProps {
  slug: string;
  onBack: () => void;
  onContact: () => void;
}

export default function LocationDetailPage({
  slug,
  onBack,
  onContact,
}: LocationDetailPageProps) {
  const loc = locationsDetail.find((l) => l.slug === slug) ?? locationsDetail[0];

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
          <span className="text-[14px]">&larr;</span> Back to Locations
        </button>

        <h1 className="text-[10vw] md:text-[6vw] font-black leading-[0.9] tracking-[-0.04em] uppercase font-oswald mb-8 text-[#111]">
          {loc.h1}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 border-b border-gray-200 pb-16 md:pb-24 mb-16">
          <div className="col-span-1 md:col-span-7 flex flex-col gap-6">
            <p className="text-xl md:text-2xl leading-[1.5] tracking-tight font-medium text-[#111]">
              {loc.body}
            </p>
            <p className="text-[12px] md:text-sm text-[#666] leading-[1.9] tracking-wide">
              {loc.note}
            </p>
          </div>
          <div className="col-span-1 md:col-span-4 md:col-start-9 flex flex-col gap-6">
            <div className="bg-[#111] text-white p-8 flex flex-col gap-4">
              <span className="text-[9px] uppercase tracking-widest font-bold text-white/60">
                {loc.city} Studio
              </span>
              <span className="text-[13px] leading-[1.8] text-white/90">
                {loc.address}
              </span>
              <span className="text-[13px] font-bold">{loc.phone}</span>
              <button
                onClick={onContact}
                className="mt-2 bg-white text-[#111] px-8 py-4 text-[11px] font-bold tracking-widest uppercase hover:px-10 transition-all duration-500 text-left"
              >
                Book This Studio &rarr;
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-[11px] text-[#666] tracking-wide">
          <span>
            Singapore: 7A Cuff Road, Little India +65 93515143
          </span>
          <span>Chennai: Habibullah Road, T.Nagar</span>
          <span>Karaikudi: Ananda Nagar +91 8012248366</span>
          <span>Malaysia bookings via Singapore HQ</span>
        </div>
      </div>
    </motion.div>
  );
}
