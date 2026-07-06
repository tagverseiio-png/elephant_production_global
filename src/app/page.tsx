'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import Preloader from '@/components/Preloader';
import { homeFilms, HomeFilm } from '@/data/home_films';

type TicketCardProps = {
  film: HomeFilm;
  isCurrentlySelected: boolean;
  reviews: HomeFilm['reviews'];
};

// --- COMPONENTS ---

function TicketCard({ film, isCurrentlySelected, reviews }: TicketCardProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    show: { 
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div 
      className="group relative w-full h-full text-[#FAF7EE] select-none" 
      style={{ clipPath: 'url(#ticketMaskLarge)' }}
    >
      
      {/* Background Image Layer */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden will-change-transform"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={isCurrentlySelected ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 bg-black" />
        <img 
          src={film.stillImage}
          alt={film.title}
          loading="lazy" decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-70 pointer-events-none"
        />
        {/* gradient: darker at top for reviews, darker at bottom for title */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/85" />
      </motion.div>

      {/* Left Perforated Torn Ticket Edge */}
      <div className="absolute -left-1 top-4 bottom-4 w-2 z-20 flex flex-col justify-between pointer-events-none">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full bg-black" />
        ))}
      </div>

      {/* Right Perforated Torn Ticket Edge */}
      <div className="absolute -right-1.5 top-4 bottom-4 w-2 z-20 flex flex-col justify-between pointer-events-none">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full bg-black" />
        ))}
      </div>

      {/* ── FOREGROUND CONTENT ── */}
      <motion.div 
        className="relative z-10 w-full h-full flex flex-col justify-between p-5 sm:p-8 md:p-12 lg:p-16"
        variants={containerVariants}
        initial="hidden"
        animate={isCurrentlySelected ? "show" : "hidden"}
      >
        
        {/* ── TOP: Reviews (2-col grid on mobile, hidden on desktop replaced by side stack) ── */}
        <div className="w-full">
          {/* Mobile: show 2 reviews side by side at top */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            {reviews.slice(0, 2).map((review, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col gap-1">
                <div className="flex gap-0.5 text-[10px] text-[#FAF7EE] tracking-[0.2em]">
                  ★ ★ ★ ★ ★
                </div>
                <span className="font-mono text-[7px] font-bold tracking-[0.2em] text-[#FAF7EE]/60 uppercase">
                  {review.source}
                </span>
                <p className="font-serif italic text-sm leading-tight text-[#FAF7EE] uppercase tracking-wide">
                  {review.text.replace(/^"|"$/g, '')}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Desktop: festival tag top-left + reviews top-right */}
          <div className="hidden sm:flex justify-between items-start">
            <motion.div variants={itemVariants} className="space-y-1 max-w-xs">
              <div className="font-serif text-3xl md:text-4xl font-normal text-[#FAF7EE]">
                {film.awardYear || film.year}
              </div>
              <div className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-[#FAF7EE]/70 uppercase leading-snug max-w-[180px]">
                {film.awardLaurel || 'NATIONAL COMPETITION OF DOCAVIV'}
              </div>
              {film.awardLogo && (
                <img loading="lazy" decoding="async" src={film.awardLogo} alt="Festival logo" className="h-6 w-auto object-contain opacity-80 brightness-200 mt-2" />
              )}
            </motion.div>
            <div className="flex flex-col items-end gap-5 text-right max-w-[300px] pt-2">
              {reviews.slice(0, 2).map((review, i) => (
                <motion.div key={i} variants={itemVariants} className="flex flex-col items-end gap-1">
                  <div className="flex gap-1 text-[11px] text-[#FAF7EE] tracking-[0.3em]">★ ★ ★ ★ ★</div>
                  <span className="font-mono text-[8px] font-bold tracking-[0.25em] text-[#FAF7EE]/60 uppercase mt-0.5">{review.source}</span>
                  <p className="font-serif italic text-base md:text-lg leading-tight text-[#FAF7EE] uppercase tracking-wide mt-0.5">
                    "{review.text.replace(/^"|"$/g, '')}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM SECTION ── */}
        <div className="w-full flex flex-col gap-4">
          
          {/* Category + Title */}
          <div>
            <motion.span variants={itemVariants} className="font-serif text-[10px] sm:text-[11px] tracking-[0.3em] text-[#FAF7EE] uppercase block mb-1">
              {film.category}
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-sans font-black text-[clamp(2.5rem,10vw,5rem)] sm:text-5xl md:text-6xl lg:text-[80px] tracking-tight uppercase leading-[0.88] text-[#FAF7EE]">
              {film.title}
            </motion.h2>
          </div>

          {/* Metadata Table */}
          <motion.div variants={itemVariants} className="w-full sm:w-[300px]">
            <div className="border-t border-b border-[#FAF7EE]/30 text-[9px] sm:text-[11px] font-mono">
              <div className="flex justify-between items-center py-1.5 sm:py-2.5 border-b border-[#FAF7EE]/30">
                <span className="text-[#FAF7EE]/60 tracking-[0.25em] uppercase">DIRECTOR</span>
                <span className="font-bold tracking-wider text-[#FAF7EE] uppercase text-right">{film.director}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 sm:py-2.5 border-b border-[#FAF7EE]/30">
                <span className="text-[#FAF7EE]/60 tracking-[0.25em] uppercase">YEAR</span>
                <span className="font-bold tracking-wider text-[#FAF7EE] text-right">{film.year}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 sm:py-2.5">
                <span className="text-[#FAF7EE]/60 tracking-[0.25em] uppercase">CATEGORY</span>
                <span className="font-bold tracking-wider text-[#FAF7EE] uppercase text-right">{film.category}</span>
              </div>
            </div>
          </motion.div>

          {/* EXPLORE button — full width ticket style on mobile, pill on desktop */}
          <motion.div variants={itemVariants} className="w-full sm:w-auto sm:self-end">
            <Link
              href={`/films/${film.id}`}
              className="sm:hidden flex items-center justify-between w-full h-12 px-5 text-black bg-[#FAF7EE] relative"
              style={{ clipPath: 'url(#preloaderTicketMask)' }}
            >
              <span className="font-sans text-[11px] font-black tracking-[0.25em] uppercase">EXPLORE</span>
              <div className="h-7 border-r border-dashed border-black/30 mx-2" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href={`/films/${film.id}`}
              className="hidden sm:flex h-11 px-5 items-center justify-between text-[#FAF7EE] border border-[#FAF7EE]/60 rounded-full bg-transparent hover:bg-[#FAF7EE] hover:text-black transition-all duration-300 gap-4"
            >
              <span className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase">EXPLORE</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>

        </div>

      </motion.div>
    </div>
  );
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(homeFilms.length - 1);
  const [scrollDuration, setScrollDuration] = useState(0.25); // Fast snappy duration for the one-by-one shuffle
  const isScrolling = useRef(false);

  // Intro rapid one-by-one scroll animation
  useEffect(() => {
    if (isLoaded) {
      isScrolling.current = true;
      let currentStep = homeFilms.length - 1;
      
      // Wait 1 full second for the Preloader to completely fade out
      const timer = setTimeout(() => {
        const playNext = () => {
          currentStep--;
          
          if (currentStep > 0) {
            setCurrentIndex(currentStep);
            setTimeout(playNext, 280); // 280ms per project for a fast one-by-one effect
          } else {
            // Final step to 0: make it a slow, smooth landing
            setScrollDuration(1.2); 
            setCurrentIndex(0);
            
            // Unlock scrolling after the final animation finishes
            setTimeout(() => {
              isScrolling.current = false;
            }, 1500);
          }
        };
        
        playNext();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  // Smooth full-page scroll locking logic
  useEffect(() => {
    if (!isLoaded) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Prevent all native scrolling
      if (isScrolling.current) return;

      if (e.deltaY > 30) {
        if (currentIndex < homeFilms.length - 1) {
          isScrolling.current = true;
          setCurrentIndex(prev => prev + 1);
          setTimeout(() => { isScrolling.current = false; }, 1200);
        }
      } else if (e.deltaY < -30) {
        if (currentIndex > 0) {
          isScrolling.current = true;
          setCurrentIndex(prev => prev - 1);
          setTimeout(() => { isScrolling.current = false; }, 1200);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;

      const touchEndY = e.touches[0].clientY;
      const delta = touchStartY - touchEndY;

      if (delta > 40) {
        if (currentIndex < homeFilms.length - 1) {
          isScrolling.current = true;
          setCurrentIndex(prev => prev + 1);
          setTimeout(() => { isScrolling.current = false; }, 1200);
        }
      } else if (delta < -40) {
        if (currentIndex > 0) {
          isScrolling.current = true;
          setCurrentIndex(prev => prev - 1);
          setTimeout(() => { isScrolling.current = false; }, 1200);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [currentIndex, isLoaded]);

  return (
    <>
      <AnimatePresence>
        {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>
      <div className="w-screen h-[100dvh] overflow-hidden bg-black text-[#FAF7EE] relative">
      <motion.div 
        className="w-full h-full flex flex-col will-change-transform"
        animate={{ y: `-${currentIndex * 100}dvh` }}
        transition={{ duration: scrollDuration, ease: [0.16, 1, 0.3, 1] }} // Dynamic duration
      >
        {homeFilms.map((film, idx) => (
          <section
            key={film.id}
            className="w-screen h-[100dvh] shrink-0 flex items-center justify-center px-2 py-4"
          >
            <motion.div 
              className="w-[96vw] sm:w-[94vw] h-full max-w-[1800px] max-h-[75vh] sm:max-h-[70vh] will-change-transform"
              animate={{ 
                scale: currentIndex === idx ? 1 : 0.85,
                opacity: currentIndex === idx ? 1 : 0.2
              }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <TicketCard
                film={film}
                isCurrentlySelected={currentIndex === idx}
                reviews={film.reviews}
              />
            </motion.div>
          </section>
        ))}
      </motion.div>

      {/* Pagination indicators */}
      <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 sm:gap-3 z-50 mix-blend-difference">
        {homeFilms.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (!isScrolling.current) {
                isScrolling.current = true;
                setCurrentIndex(idx);
                setTimeout(() => { isScrolling.current = false; }, 1200);
              }
            }}
            className="group py-2 flex items-center justify-center outline-none"
          >
            <div 
              className={`w-1.5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full ${
                currentIndex === idx ? 'h-8 bg-white' : 'h-1.5 bg-white/30 group-hover:bg-white/60 group-hover:h-3'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
    </>
  );
}
