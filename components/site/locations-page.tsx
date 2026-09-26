'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { locationsDetail } from '@/lib/data';
import { REGION_LOCATION_ORDER } from '@/lib/region';
import { useRegionContext } from '@/components/site/region-context';

interface LocationsPageProps {
  onLocationSelect: (slug: string) => void;
}

export default function LocationsPage({ onLocationSelect }: LocationsPageProps) {
  const { region } = useRegionContext();
  const ordered = useMemo(() => {
    const order = REGION_LOCATION_ORDER[region];
    const rank = (city: string) => {
      const i = order.indexOf(city);
      return i === -1 ? 99 : i;
    };
    return [...locationsDetail].sort((a, b) => rank(a.city) - rank(b.city));
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
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-200 pb-12">
          <h1 className="text-[12vw] md:text-[8vw] font-black tracking-[-0.05em] leading-[0.85] text-[#111] uppercase font-oswald">
            Our
            <br />
            Locations.
          </h1>
          <p className="text-[11px] font-medium text-[#888] max-w-xs md:text-right mt-8 md:mt-0 leading-relaxed tracking-wide">
            Singapore HQ at 7A Cuff Road, Chennai at Habibullah Road T.Nagar,
            Karaikudi at Ananda Nagar — plus destination weddings in Malaysia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {ordered.map((loc, idx) => (
            <motion.div
              key={loc.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              onClick={() => onLocationSelect(loc.slug)}
              className="group cursor-pointer border border-gray-200 hover:border-[#111] transition-colors duration-300 p-8 md:p-12 flex flex-col gap-6"
            >
              <span className="text-[10px] text-[#888] font-bold tracking-widest uppercase flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#ddd] block" />
                0{idx + 1} &mdash; {loc.city}
              </span>
              <h2 className="text-[7vw] md:text-[2.5vw] font-bold leading-[0.95] tracking-[-0.03em] uppercase font-oswald text-[#111] group-hover:text-[#555] transition-colors duration-300">
                {loc.h1}
              </h2>
              <p className="text-[11px] text-[#666] leading-[1.8] tracking-wide">
                {loc.address}
              </p>
              <p className="text-[11px] font-bold text-[#111] tracking-wide">
                {loc.phone}
              </p>
              <div className="mt-2 flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-[#111] group-hover:underline underline-offset-4">
                View Studio <span className="text-[12px]">&rarr;</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
