'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { servicesDetail } from '@/lib/data';
import { useRegionContext } from '@/components/site/region-context';

interface ServicesPageProps {
  onServiceSelect: (slug: string) => void;
}

// IN viewers see Chennai wedding first, MY viewers see pre-wedding/destination first.
const REGION_SERVICE_ORDER: Record<string, string[]> = {
  SG: [
    'wedding-singapore',
    'pre-wedding',
    'maternity',
    'baby-newborn',
    'corporate',
    'wedding-chennai-karaikudi',
  ],
  IN: [
    'wedding-chennai-karaikudi',
    'baby-newborn',
    'maternity',
    'pre-wedding',
    'wedding-singapore',
    'corporate',
  ],
  MY: [
    'pre-wedding',
    'wedding-singapore',
    'maternity',
    'baby-newborn',
    'corporate',
    'wedding-chennai-karaikudi',
  ],
};

export default function ServicesPage({ onServiceSelect }: ServicesPageProps) {
  const { region } = useRegionContext();
  const ordered = useMemo(() => {
    const order = REGION_SERVICE_ORDER[region] ?? REGION_SERVICE_ORDER.SG;
    return [...servicesDetail].sort(
      (a, b) => order.indexOf(a.slug) - order.indexOf(b.slug)
    );
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
            Signature
            <br />
            Services.
          </h1>
          <p className="text-[11px] font-medium text-[#888] max-w-xs md:text-right mt-8 md:mt-0 leading-relaxed tracking-wide">
            We don&apos;t just take photos. We document legacy. Indian
            Weddings, Pre-Wedding, Maternity, Baby, Family &amp; Corporate in
            Singapore, Chennai, Karaikudi &amp; Malaysia.
          </p>
        </div>

        <div className="flex flex-col">
          {ordered.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                onClick={() => onServiceSelect(service.slug)}
                className={`group cursor-pointer flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 md:gap-16 items-center py-16 border-b border-gray-100 last:border-0`}
              >
                <div className="w-full md:w-[55%] overflow-hidden bg-gray-100 aspect-[4/3] md:aspect-[16/10] relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.img}
                    alt={`${service.title} by Elephant Production`}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                    style={{ filter: 'grayscale(20%)' }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <div className="w-full md:w-[45%] flex flex-col items-start px-4 md:px-0">
                  <span className="text-[10px] text-[#888] font-bold tracking-widest uppercase mb-6 flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-[#ddd] block" />
                    0{idx + 1} &mdash; {service.title}
                  </span>
                  <h2 className="text-[8vw] md:text-[3.5vw] font-bold leading-[0.95] tracking-[-0.03em] uppercase font-oswald text-[#111] group-hover:text-[#555] transition-colors duration-300">
                    {service.h1}
                  </h2>
                  <div className="mt-8 flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-[#111] group-hover:underline underline-offset-4">
                    View Service <span className="text-[12px]">&rarr;</span>
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
