'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { carouselImages } from '@/lib/data';
import { REGION_LOCATION_ORDER, REGION_META } from '@/lib/region';
import { useRegionContext } from '@/components/site/region-context';

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { region } = useRegionContext();
  const locationOrder = REGION_LOCATION_ORDER[region];
  const meta = REGION_META[region];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    pos0: {
      left: '0%',
      x: '-80%',
      scale: 0.6,
      rotateY: 35,
      z: -150,
      opacity: 0.2,
      filter: 'blur(4px)',
      zIndex: 10,
    },
    pos1: {
      left: '15%',
      x: '-60%',
      scale: 0.8,
      rotateY: 20,
      z: -50,
      opacity: 0.8,
      filter: 'blur(1px)',
      zIndex: 20,
    },
    pos2: {
      left: '50%',
      x: '-50%',
      scale: 1,
      rotateY: 0,
      z: 50,
      opacity: 1,
      filter: 'blur(0px)',
      zIndex: 30,
    },
    pos3: {
      left: '85%',
      x: '-40%',
      scale: 0.8,
      rotateY: -20,
      z: -50,
      opacity: 0.8,
      filter: 'blur(1px)',
      zIndex: 20,
    },
    pos4: {
      left: '100%',
      x: '-20%',
      scale: 0.6,
      rotateY: -35,
      z: -150,
      opacity: 0.2,
      filter: 'blur(4px)',
      zIndex: 10,
    },
  };

  return (
    <section className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center select-none">


      {/* Top Right Text */}
      <div className="absolute top-12 md:top-24 right-6 md:right-12 flex flex-col items-end gap-1 text-[8px] md:text-[10px] uppercase tracking-[0.3em] z-20 text-[#666]">
        <span>Since</span>
        <span>2022</span>
        <div className="w-8 h-[1px] bg-[#111] mt-2" />
      </div>

      {/* Middle Left Main Typography */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col z-20">
        {/* SEO sub-H1 + trust bar — visually hidden, content only */}
        <p className="sr-only">
          Turning Real Emotions Into Visuals That Last A Lifetime. {meta.heroLead}.
          We are Elephant Production - a Singapore-registered photography &amp;
          videography studio [UEN 53444987E] based at 7A Cuff Road, Little
          India, with studios in Chennai - T.Nagar and Karaikudi - Ananda
          Nagar. Serving destination weddings in Kuala Lumpur, Malaysia. Since
          2022 | 500+ Weddings | Singapore • Chennai • Karaikudi • Malaysia.
          Indian Wedding, Punjabi Wedding, Pre-Wedding, Maternity, Baby
          Photoshoot, Family &amp; Corporate.
        </p>
      </div>


      {/* Center 3D Stacked Carousel */}
      <div
        className="absolute inset-0 w-full h-full flex items-center justify-center z-10 pointer-events-none perspective-1000"
      >
        <div className="relative w-full max-w-[1200px] h-[50vh] md:h-[60vh] flex items-center justify-center preserve-3d">
          {carouselImages.map((img, i) => {
            const position =
              (i - currentIndex + carouselImages.length) %
              carouselImages.length;
            return (
              <motion.div
                key={i}
                initial={false}
                animate={`pos${position}`}
                variants={variants}
                transition={{ duration: 1.2, ease: [0.4, 0.0, 0.2, 1] }}
                className={`absolute w-[60%] md:w-[40%] aspect-[4/5] md:aspect-[3/4] rounded-sm overflow-hidden shadow-2xl ${
                  position === 2 ? 'ring-1 ring-black/5' : ''
                }`}
                style={{ transformOrigin: 'center center' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`Elephant Production - wedding photographer Singapore, Chennai, Karaikudi - Gallery ${i}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
