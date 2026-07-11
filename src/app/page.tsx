'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { homeFilms as films } from '@/data/home_films';

const LaurelWreath = ({ text }: { text: string }) => (
  <div className="flex flex-col items-center justify-center text-center text-white/95 max-w-[150px] select-none">
    <svg width="34" height="30" viewBox="0 0 44 40" fill="none" className="opacity-90 mb-1" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 8C10 12 10 24 18 32M32 8C34 12 34 24 26 32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 12C4 14 3 18 6 22M38 12C40 14 41 18 38 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="22" cy="18" r="1.5" fill="currentColor" />
    </svg>
    <span className="text-[6px] tracking-[0.25em] font-bold uppercase leading-tight">{text}</span>
  </div>
);

const FilmCard = ({ film, index }: { film: typeof films[0]; index: number }) => (
  <div
    id={`film-card-wrapper-${index}`}
    className="film-card-wrapper w-full h-[75vh] sm:h-[80vh] md:h-[85vh] shrink-0 flex items-center justify-center snap-center px-4 md:px-8"
  >
    {/* Inner Card Container - will-change added for absolute GPU hardware rendering speed */}
    <div
      id={`film-card-inner-${index}`}
      className="film-card-inner relative w-full h-full max-w-[1600px] aspect-[16/9] overflow-hidden flex flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-20"
      style={{
        clipPath: 'url(#smoothHandDrawnClip)',
        backgroundColor: '#070707',
        willChange: 'transform, opacity',
        transform: 'translate3d(0,0,0) scale(1)'
      }}
    >
      {/* Background imagery with cinematic gradient layer */}
      <div className="absolute inset-0 select-none pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={film.stillImage} alt={film.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/25 to-black/90" />
      </div>

      <div className="relative z-10 flex justify-between items-start">
        <div className="flex items-start gap-4">
          <LaurelWreath text={film.awardLaurel || '2026 AWARD WINNER'} />
        </div>

        {/* High-contrast star ratings matching the screenshots */}
        <div className="hidden md:flex flex-col gap-4 items-end max-w-[280px]">
          {film.reviews.slice(0, 3).map((review, i) => (
            <div key={i} className="flex flex-col items-end text-right text-white">
              <div className="text-[6px] tracking-[0.35em] text-amber-400/90 mb-0.5">★★★★★</div>
              <span className="text-[6px] tracking-[0.25em] font-bold text-white/50 block mb-1">
                {review.source}
              </span>
              <h3 className="text-[10px] font-medium tracking-tight italic leading-snug text-white/90">
                {review.text}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex items-end justify-between">
        <div className="flex flex-col gap-2 max-w-[70%]">
          <span className="text-[8px] tracking-[0.35em] font-semibold uppercase text-white/60">
            {film.category}
          </span>
          <h2 className="text-white text-[24px] sm:text-[38px] md:text-[46px] font-black tracking-tighter leading-[0.85] uppercase">
            {film.title}
          </h2>

          {/* Metadata table separator */}
          <div className="flex flex-col w-[180px] sm:w-[240px] md:w-[290px] border-t border-white/20 mt-3 pt-2">
            {[
              { label: 'DIRECTOR', value: film.director },
              { label: 'YEAR', value: film.year },
              { label: 'CATEGORY', value: film.category }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-1 border-b border-white/5 last:border-b-0">
                <span className="text-[7px] tracking-[0.2em] text-white/40 font-bold uppercase">
                  {item.label}
                </span>
                <span className="text-[8px] tracking-[0.1em] text-white/90 font-medium uppercase">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Explore CTA styling with ticket shape border */}
        <div className="mb-1 shrink-0">
          <Link href={`/films/${film.id}`} className="flex items-center gap-3 px-5 py-2.5 sm:px-6 sm:py-3 border border-white/25 hover:border-white hover:bg-white/10 transition-colors cursor-pointer group rounded-[4px]">
            <span className="text-[7px] tracking-[0.3em] font-bold uppercase text-white">EXPLORE</span>
            <svg className="transform group-hover:translate-x-1 transition-transform" width="10" height="8" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1L11 5M11 5L7 9M11 5H1" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScroll, setActiveScroll] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rAFRef = useRef<number | null>(null);

  // We loop 5 copies of the film sequence to ensure absolute scroll buffer in both directions
  const loopedFilms = [
    ...films, // Set 0
    ...films, // Set 1
    ...films, // Set 2 (Center Anchor)
    ...films, // Set 3
    ...films  // Set 4
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const N = films.length;

    // Initializes loading spot accurately in the center array sequence
    const initializePosition = () => {
      if (!container) return;
      const children = container.children;
      if (children.length < N * 5) return;

      const firstCard = children[0] as HTMLElement;
      const middleCard = children[N * 2] as HTMLElement; // Start of Set 2

      if (firstCard && middleCard) {
        const targetScroll = middleCard.offsetTop - firstCard.offsetTop;
        container.style.scrollBehavior = 'auto';
        container.scrollTop = targetScroll;
        container.style.scrollBehavior = 'smooth';
      }
    };

    // Run positioning once the component finishes loading
    setTimeout(() => {
      initializePosition();
      window.dispatchEvent(new Event('elephant-preloader-complete'));
    }, 50);

    const handleScroll = () => {
      if (!container) return;
      // Cancel any outstanding animation frame to prevent frame bundling
      if (rAFRef.current) {
        cancelAnimationFrame(rAFRef.current);
      }

      rAFRef.current = requestAnimationFrame(() => {
        const children = container.children;
        if (children.length < N * 5) return;

        const firstCard = children[0] as HTMLElement;
        const secondSetCard = children[N] as HTMLElement;      // Start of Set 1
        const fourthSetCard = children[N * 3] as HTMLElement;  // Start of Set 3

        const cycleHeight = secondSetCard.offsetTop - firstCard.offsetTop;

        // Teleports scrolling seamlessly when borders are bypassed
        if (container.scrollTop < secondSetCard.offsetTop) {
          container.style.scrollBehavior = 'auto';
          container.scrollTop += cycleHeight * 2;
          container.style.scrollBehavior = 'smooth';
          return;
        }
        else if (container.scrollTop > fourthSetCard.offsetTop) {
          container.style.scrollBehavior = 'auto';
          container.scrollTop -= cycleHeight * 2;
          container.style.scrollBehavior = 'smooth';
          return;
        }
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', initializePosition);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', initializePosition);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, []);

  return (
    <div className="bg-[#030303] min-h-screen w-full relative overflow-hidden font-sans select-none">

      {/* Custom responsive hand-drawn clip path with soft corners & subtle irregular sides */}
      <svg className="absolute w-0 h-0">
        <defs>
          <clipPath id="smoothHandDrawnClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.03,0.05 
                     C 0.25,0.042 0.75,0.038 0.97,0.05 
                     C 0.98,0.08 0.98,0.12 0.975,0.18 
                     C 0.97,0.45 0.98,0.55 0.972,0.82 
                     C 0.97,0.92 0.92,0.97 0.82,0.965 
                     C 0.55,0.958 0.45,0.972 0.18,0.965 
                     C 0.08,0.97 0.03,0.92 0.028,0.82 
                     C 0.035,0.55 0.025,0.45 0.03,0.18 
                     C 0.03,0.12 0.025,0.08 0.03,0.05 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Subtle vignettes to gracefully hide cards when transitioning */}
      <div className="fixed top-0 left-0 w-full h-[12vh] bg-gradient-to-b from-black via-black/80 to-transparent z-40 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-full h-[12vh] bg-gradient-to-t from-black via-black/80 to-transparent z-40 pointer-events-none" />



      {/* Dynamic looping roller container with tight card footprint */}
      <div
        ref={containerRef}
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth flex flex-col gap-[1.5vh] py-[6vh] no-scrollbar"
        style={{ scrollbarWidth: 'none' }}
      >
        {loopedFilms.map((film, index) => (
          <FilmCard key={`${film.id}-${index}`} film={film} index={index} />
        ))}
      </div>
    </div>
  );
};

export default App;
