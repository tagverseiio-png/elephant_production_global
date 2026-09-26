'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesList } from '@/lib/data';
import { useRegionContext } from '@/components/site/region-context';

// Index → service detail slug. Wedding resolves by viewer region;
// Family has no detail page so it opens the services index (empty slug).
const INDEX_TO_SLUG: Record<number, string> = {
  0: 'wedding',
  1: 'pre-wedding',
  2: 'maternity',
  3: 'baby-newborn',
  4: '',
  5: 'corporate',
};

export default function ServicesSection({
  onServiceSelect,
}: {
  onServiceSelect?: (slug: string) => void;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { region } = useRegionContext();

  return (
    <section className="w-full pt-16 pb-32 flex flex-col relative bg-white border-t border-gray-200">
      {/* Top Labels */}
      <div className="w-full px-6 md:px-12 flex justify-between text-[10px] text-[#888] font-medium mb-16 items-start tracking-wide">
        <span className="w-1/3 pr-4 max-w-[280px] leading-relaxed">
          We don&apos;t just take photos. We document legacy. Indian Weddings,
          Pre-Wedding, Maternity, Baby, Family &amp; Corporate in Singapore,
          Chennai, Karaikudi &amp; Malaysia.
        </span>
        <span className="w-1/3 text-center hidden md:block">
          Explore our signature services that shape every project.
        </span>
        <span className="w-1/3 text-right font-bold text-[#111]">(04)</span>
      </div>

      {/* Services List */}
      <div
        className="w-full flex flex-col"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {servicesList.map((service, idx) => {
          const isActive = hoveredIndex === idx;
          const serviceDescriptions: Record<string, string> = {
            'Wedding Photography & Videography':
              'Candid emotions, cinematic highlights, traditions, laughter and tears. From Tamil Brahmin weddings in Singapore to Chettinad weddings in Karaikudi. Indian, Punjabi, Muslim & Christian weddings.',
            'Pre-Wedding Photoshoots':
              'Destination concepts in Maldives, KLCC Malaysia, Singapore Marina and Chennai beaches. Themed, studio or outdoor.',
            'Maternity Photography':
              'Soft, elegant, motherhood glow. Studio comfort + natural light. Maternity photographer in Singapore & Chennai.',
            'Baby & Newborn Photoshoots':
              'Patient, safe, warm setups for newborns first 15 days. Timeless baby milestones in Chennai & Singapore.',
            'Family Portraits':
              'Generational portraits that capture bond and personality in Singapore, Chennai & Karaikudi.',
            'Corporate & Event Coverage':
              'Conferences, product launches, brand shoots. Polished, punctual, reliable. 48-hour delivery for corporate clients.',
          };
          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onClick={() => {
                if (!onServiceSelect) return;
                const mapped = INDEX_TO_SLUG[idx] ?? '';
                if (mapped === 'wedding') {
                  onServiceSelect(
                    region === 'IN'
                      ? 'wedding-chennai-karaikudi'
                      : 'wedding-singapore'
                  );
                } else {
                  onServiceSelect(mapped);
                }
              }}
              className={`w-full relative group cursor-pointer transition-colors duration-200 py-4 md:py-6 flex justify-center items-center ${
                isActive ? 'bg-[#111111]' : 'bg-transparent'
              }`}
            >
              <h2
                className={`text-[6.5vw] md:text-[5vw] font-bold tracking-[-0.04em] leading-[1.1] text-center transition-colors duration-200 relative z-10 ${
                  isActive ? 'text-white' : 'text-[#111111]'
                }`}
              >
                {service.title}
              </h2>
              <p className="sr-only">
                {serviceDescriptions[service.title] ?? service.title}
              </p>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate: 3 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-[10%] md:right-[15%] top-1/2 -translate-y-1/2 z-20 pointer-events-none origin-center w-[150px] md:w-[220px] shadow-2xl"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.img}
                      alt={`${service.title} in Singapore, Chennai, Karaikudi by Elephant Production`}
                      className="w-full h-auto object-cover"
                      style={{ filter: 'grayscale(30%)' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
