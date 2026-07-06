'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { homeFilms } from '@/data/home_films';
import DecryptedText from '@/components/DecryptedText';
import { SmartVideo } from '@/components/SmartVideo';
import { stillsGrid } from '@/data/stills';

export default function WorkPage() {
  const [viewMode, setViewMode] = useState<'poster' | 'footage'>('footage');
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // LERP Scrolling States
  const [visualX, setVisualX] = useState(0);
  const targetX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const dragStartTargetX = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [cardWidth, setCardWidth] = useState(450); // Snapping step width
  const [trackOffset, setTrackOffset] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Dynamic card step calculation based on viewMode
  const handleResize = useCallback(() => {
    let width = 450;
    if (viewMode === 'footage') {
      width = window.innerWidth < 768 ? 320 : 450;
    } else {
      width = window.innerWidth < 768 ? 200 : 260; // narrower step width for stills grid columns
    }
    setCardWidth(width);
    
    const paddingLeft = window.innerWidth * 0.12; // 12vw
    const offset = window.innerWidth / 2 - paddingLeft - width / 2;
    setTrackOffset(offset);
  }, [viewMode]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Adjust scroll positions on viewMode changes to prevent catalog jumping
  const handleToggleMode = (mode: 'poster' | 'footage') => {
    const oldWidth = cardWidth;
    let newWidth = 450;
    if (mode === 'footage') {
      newWidth = window.innerWidth < 768 ? 320 : 450;
    } else {
      newWidth = window.innerWidth < 768 ? 200 : 260;
    }
    
    setViewMode(mode);
    setCardWidth(newWidth);
    
    const ratio = newWidth / oldWidth;
    targetX.current = targetX.current * ratio;
    currentX.current = currentX.current * ratio;
    setVisualX(currentX.current);
    
    const paddingLeft = window.innerWidth * 0.12;
    const offset = window.innerWidth / 2 - paddingLeft - newWidth / 2;
    setTrackOffset(offset);
  };

  // Sync activeIndex and dispatch event to update Navbar ticket drop-down
  useEffect(() => {
    const computedIndex = Math.min(
      Math.max(Math.round(-currentX.current / cardWidth), 0),
      homeFilms.length - 1
    );
    if (computedIndex !== activeIndex) {
      setActiveIndex(computedIndex);
      // Dispatch active film change to Navbar
      const film = homeFilms[computedIndex];
      if (film) {
        window.dispatchEvent(new CustomEvent('elephant-active-film', { detail: film.id }));
      }
    }
  }, [visualX, cardWidth, activeIndex]);

  // Dispatch initial active film on mount
  useEffect(() => {
    if (homeFilms[0]) {
      window.dispatchEvent(new CustomEvent('elephant-active-film', { detail: homeFilms[0].id }));
    }
  }, []);

  // Easing tick loop (LERP)
  useEffect(() => {
    let animationFrameId: number;

    const tick = () => {
      if (!isDragging.current) {
        currentX.current = currentX.current + (targetX.current - currentX.current) * 0.08;
        if (Math.abs(targetX.current - currentX.current) < 0.1) {
          currentX.current = targetX.current;
        }
        setVisualX(currentX.current);
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const maxScroll = -(homeFilms.length - 1) * cardWidth;

  const snapToNearestCard = useCallback(() => {
    let snapped = Math.round(targetX.current / cardWidth) * cardWidth;
    snapped = Math.min(Math.max(snapped, maxScroll), 0);
    targetX.current = snapped;
  }, [cardWidth, maxScroll]);

  // Mouse wheel horizontal scroller
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scrollSpeed = 0.95;
      targetX.current = Math.min(
        Math.max(targetX.current - e.deltaY * scrollSpeed, maxScroll - 150),
        150
      );

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        snapToNearestCard();
      }, 150);
    };

    const sliderEl = sliderRef.current;
    if (sliderEl) {
      sliderEl.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (sliderEl) {
        sliderEl.removeEventListener('wheel', handleWheel);
      }
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [maxScroll, snapToNearestCard]);

  // Pointer/Touch Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    dragStartTargetX.current = targetX.current;
    if (sliderRef.current) {
      sliderRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - dragStartX.current;
    if (Math.abs(deltaX) > 5) {
      hasDragged.current = true;
    }
    const dragMultiplier = 1.25;
    let nextTarget = dragStartTargetX.current + deltaX * dragMultiplier;
    
    // Resistance boundary checks
    if (nextTarget > 0) {
      nextTarget = nextTarget * 0.3;
    } else if (nextTarget < maxScroll) {
      nextTarget = maxScroll + (nextTarget - maxScroll) * 0.3;
    }

    targetX.current = nextTarget;
    currentX.current = nextTarget;
    setVisualX(nextTarget);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (sliderRef.current) {
      sliderRef.current.releasePointerCapture(e.pointerId);
    }
    snapToNearestCard();
  };

  const progress = maxScroll !== 0 ? Math.min(Math.max(visualX / maxScroll, 0), 1) : 0;
  const activeFilm = homeFilms[activeIndex];

  return (
    <div data-page="work" className="pw h-screen work relative select-none">
      
      {/* Background grain noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 2. work-edge top (Toggle Switcher) */}
      <div data-cursor="hide" className="absolute top-20 sm:top-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-auto">
        <div data-work="toggleWrapper" className={`toggle-switch-cont`}>
          <ul data-work="toggle" role="list" className="list w-list-unstyled">
            
            {/* Footage view switch */}
            <li className="work-toggle-w">
              <button
                onClick={() => handleToggleMode('footage')}
                data-work="toggle"
                className={`work-toggle ${viewMode === 'footage' ? 'active-mode' : 'inactive'}`}
                aria-label="Footage View Mode"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50" width="100%" className="switch-svg">
                  <g fill="currentColor" fillRule="evenodd" clipPath="url(#clip0_2988_5785)" clipRule="evenodd">
                    <path d="M17.939 13.492v22.687c0 .483.39.873.873.873h12.302c.482 0 .873-.39.873-.873V13.492a.873.873 0 0 0-.873-.873H18.812a.873.873 0 0 0-.873.873Zm-2.62 22.687a3.493 3.493 0 0 0 3.493 3.493h12.302a3.493 3.493 0 0 0 3.492-3.493V13.492a3.493 3.493 0 0 0-3.492-3.493H18.812a3.493 3.493 0 0 0-3.493 3.493v22.687ZM1.62 17.94v13.786c0 .482.39.873.873.873H8.86c.482 0 .873-.39.873-.873V17.941a.873.873 0 0 0-.873-.874H2.493a.873.873 0 0 0-.874.873ZM-1 31.727a3.492 3.492 0 0 0 3.493 3.493H8.86a3.493 3.493 0 0 0 3.493-3.493V17.941a3.493 3.493 0 0 0-3.493-3.493H2.493A3.493 3.493 0 0 0-1 17.94v13.786ZM48.307 17.94v13.786a.873.873 0 0 1-.873.873h-6.367a.873.873 0 0 1-.873-.873V17.941c0-.483.39-.874.873-.874h6.367c.482 0 .873.391.873.873Zm2.62 13.786a3.493 3.493 0 0 1-3.493 3.493h-6.367a3.493 3.493 0 0 1-3.493-3.493V17.941a3.493 3.493 0 0 1 3.493-3.493h6.367a3.493 3.493 0 0 1 3.493 3.492v13.786Z"></path>
                  </g>
                </svg>
              </button>
            </li>
            
            {/* Poster view switch */}
            <li className="work-toggle-w">
              <button
                onClick={() => handleToggleMode('poster')}
                data-work="toggle"
                className={`work-toggle ${viewMode === 'poster' ? 'active-mode' : 'inactive'}`}
                aria-label="Poster View Mode"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50" width="100%" className="switch-svg">
                  <path fill="currentColor" fillRule="evenodd" d="M15.605 29.522v6.986c0 .482.39.873.873.873h6.985c.482 0 .873-.391.873-.873v-6.986a.873.873 0 0 0-.873-.873h-6.985a.873.873 0 0 0-.873.873Zm-2.62 6.986A3.493 3.493 0 0 0 16.478 40h6.985a3.493 3.493 0 0 0 3.492-3.492v-6.986a3.493 3.493 0 0 0-3.492-3.492h-6.985a3.492 3.492 0 0 0-3.493 3.492v6.986ZM33.068 29.522v6.986c0 .482.39.873.873.873h6.985c.482 0 .873-.391.873-.873v-6.986a.873.873 0 0 0-.873-.873H33.94a.873.873 0 0 0-.873.873Zm-2.62 6.986A3.493 3.493 0 0 0 33.941 40h6.985a3.493 3.493 0 0 0 3.492-3.492v-6.986a3.493 3.493 0 0 0-3.492-3.492H33.94a3.493 3.493 0 0 0-3.493 3.492v6.986ZM17.35 12.057v6.986c0 .482-.39.873-.873.873H9.492a.873.873 0 0 1-.873-.873v-6.986c0-.482.39-.873.873-.873h6.985c.482 0 .873.391.873.873Zm2.62 6.986a3.493 3.493 0 0 1-3.493 3.492H9.492A3.493 3.493 0 0 1 6 19.043v-6.986a3.493 3.493 0 0 1 3.492-3.492h6.985a3.492 3.492 0 0 1 3.493 3.492v6.986ZM26.082 12.057v6.986c0 .482.391.873.873.873h6.986a.873.873 0 0 0 .873-.873v-6.986a.873.873 0 0 0-.873-.873h-6.986a.873.873 0 0 0-.873.873Zm-2.62 6.986a3.493 3.493 0 0 0 3.493 3.492h6.986a3.493 3.493 0 0 0 3.492-3.492v-6.986a3.492 3.492 0 0 0-3.492-3.492h-6.986a3.493 3.493 0 0 0-3.492 3.492v6.986Z" clipRule="evenodd"></path>
                </svg>
              </button>
            </li>
            
          </ul>
          
          {/* Background pill selector block */}
          <div className={`abs trig-bg ${viewMode === 'footage' ? 'footage-pos' : 'poster-pos'}`} />
          
          {/* Switch label text */}
          <div className="toggle-switch-w">
            <div className="toggle-switch">
              <div className="switch-bg"></div>
              <div className="div-block-47">
                <div className="switch-alt-tx">
                  <div className={`swap-tx ${viewMode === 'poster' ? 'poster-active' : ''}`}>FOOTAGE</div>
                  <div className={`swap-tx ${viewMode === 'poster' ? 'poster-active' : ''}`}>POSTER</div>
                </div>
                <div className="mode-label">MODE</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* 5. work-vert-line (Center vertical line) */}
      <div className="work-vert-line"></div>

      {/* 3. work-roll (Draggable horizontal slider) */}
      <div
        ref={sliderRef}
        className="work-roll select-none cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        data-cursor-text="DRAG"
      >
        {viewMode === 'footage' ? (
          // Footage View Mode: Vertical film cards slider
          <div
            className="flex h-full items-center justify-start px-[12vw] will-change-transform"
            style={{
              transform: `translate3d(${visualX + trackOffset}px, 0px, 0px)`
            }}
          >
            {homeFilms.map((film, index) => {
              const isSelected = index === activeIndex;
              const cardVisualOffset = visualX + index * cardWidth;
              const parallaxX = cardVisualOffset * -0.15;
              
              return (
                <motion.div
                  key={film.id}
                  className="group relative flex flex-col justify-center shrink-0 w-[300px] sm:w-[360px] md:w-[410px] h-[54vh] sm:h-[72vh] mx-[12px] sm:mx-[18px] select-none pointer-events-auto cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={{
                    scale: isSelected ? 1 : 0.9,
                    opacity: isSelected ? 1 : 0.4,
                  }}
                  onClick={(e) => {
                    if (!hasDragged.current) {
                      router.push(`/films/${film.id}`);
                    }
                  }}
                  whileHover={{ y: -15, opacity: 1, scale: isSelected ? 1.02 : 0.95 }}
                  transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] as const }}
                >
                  {/* Poster Frame image container */}
                  <div className="relative w-full h-[50%] sm:h-[58%] rounded-xl overflow-hidden border border-elephant-ivory/10 bg-elephant-ivory/5 shadow-2xl transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.1)]">
                    <motion.div
                      className="h-full w-[130%] absolute -left-[15%]"
                      style={{ x: parallaxX }}
                    >
                      {/* Background static still image */}
                      <img
                        loading="lazy" decoding="async"
                        src={film.stillImage}
                        alt={film.title}
                        className={`absolute inset-0 h-full w-full object-cover pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${isSelected ? '-translate-y-full' : 'translate-y-0 group-hover:-translate-y-full'}`}
                      />

                      {/* Loop preview video overlay slides in from bottom like a card slot */}
                      <SmartVideo
                        className={`absolute inset-0 h-full w-full object-cover pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${isSelected ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`}
                        src={film.trailerVideo}
                        isPlaying={isSelected || hoveredIndex === index}
                      />
                    </motion.div>


                    {/* Top Left rating badge laurels overlay */}
                    {film.awardLaurel && (
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#000000]/80 px-2.5 py-1 rounded backdrop-blur-[2px] border border-elephant-ivory/10">
                        {film.awardLogo && (
                          <img
                            loading="lazy" decoding="async"
                            src={film.awardLogo}
                            alt="Award Logo"
                            className="h-4 w-auto object-contain invert brightness-0"
                          />
                        )}
                        <span className="font-sans text-[8px] font-semibold tracking-wider text-elephant-ivory uppercase">
                          {film.awardLaurel}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Lined Detail table metadata block */}
                  <div className="mt-5 sm:mt-6 flex-1 flex flex-col justify-start gap-3 sm:justify-between text-center sm:text-left">
                    <div>
                      <span className="font-mono text-[9px] font-bold tracking-widest text-elephant-red uppercase block transition-colors duration-300 group-hover:text-elephant-ivory">
                        {film.category}
                      </span>
                      <h2 className="font-serif text-[28px] sm:text-3xl font-semibold tracking-wide text-elephant-ivory mt-1 leading-[1.1] uppercase break-words">
                        {isSelected ? (
                          <DecryptedText text={film.title} speed={25} />
                        ) : (
                          film.title
                        )}
                      </h2>
                    </div>

                    {/* Lined Metadata Table Grid */}
                    <div className="border-t border-elephant-ivory/15 pt-2 mt-2 sm:mt-4 space-y-1 text-[10px] font-mono opacity-80 group-hover:opacity-100 transition-opacity duration-300 text-left">
                      <div className="flex justify-between py-1 border-b border-elephant-ivory/5">
                        <span className="text-elephant-ivory/40 uppercase">YEAR</span>
                        <span className="font-semibold">{film.year}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-elephant-ivory/5">
                        <span className="text-elephant-ivory/40 uppercase">LOCATION</span>
                        <span className="font-semibold">TEL AVIV</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-elephant-ivory/5">
                        <span className="text-elephant-ivory/40 uppercase">CATEGORY</span>
                        <span className="font-semibold uppercase">{film.category}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          // Poster View Mode: Two independent rows scrolling in opposite directions
          <div className="flex flex-col gap-8 justify-center h-full w-full pointer-events-auto">
            {/* Top Row Stills (scrolls forward) */}
            <div className="overflow-hidden flex items-center w-full">
              <div
                className="flex will-change-transform"
                style={{
                  transform: `translate3d(${visualX + trackOffset}px, 0px, 0px)`
                }}
              >
                <div style={{ width: '12vw' }} className="shrink-0" />
                {Array.from({ length: 9 }).map((_, colIdx) => {
                  const isSelected = colIdx === activeIndex;
                  const topStill = stillsGrid[colIdx];
                  
                  return (
                    <motion.div
                      key={colIdx}
                      className="group relative rounded-xl overflow-hidden border border-elephant-ivory/10 bg-elephant-ivory/5 shadow-lg mx-3 shrink-0 cursor-pointer"
                      style={{
                        width: `${cardWidth - 24}px`,
                        height: `${cardWidth - 24}px`
                      }}
                      animate={{
                        scale: isSelected ? 1.02 : 0.88,
                        opacity: isSelected ? 1 : 0.35,
                      }}
                      whileHover={{ scale: 1.05, opacity: 1, zIndex: 10 }}
                      transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
                      onClick={(e) => {
                        const targetFilm = homeFilms[colIdx % homeFilms.length];
                        if (targetFilm && !hasDragged.current) {
                          router.push(`/films/${targetFilm.id}`);
                        }
                      }}
                    >
                      <img
                        loading="lazy" decoding="async"
                        src={topStill}
                        alt=""
                        className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 ${
                          isSelected ? 'grayscale-0' : 'grayscale'
                        }`}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Row Stills (scrolls backward) */}
            <div className="overflow-hidden flex items-center w-full">
              <div
                className="flex will-change-transform"
                style={{
                  transform: `translate3d(${(maxScroll - visualX) + trackOffset + cardWidth / 2}px, 0px, 0px)`
                }}
              >
                <div style={{ width: '12vw' }} className="shrink-0" />
                {Array.from({ length: 9 }).map((_, colIdx) => {
                  const row2ActiveIndex = Math.min(
                    Math.max(Math.round(-(maxScroll - visualX) / cardWidth - 0.5), 0),
                    8
                  );
                  const isSelected = colIdx === row2ActiveIndex;
                  const bottomStill = stillsGrid[colIdx + 9];
                  
                  return (
                    <motion.div
                      key={colIdx}
                      className="group relative rounded-xl overflow-hidden border border-elephant-ivory/10 bg-elephant-ivory/5 shadow-lg mx-3 shrink-0 cursor-pointer"
                      style={{
                        width: `${cardWidth - 24}px`,
                        height: `${cardWidth - 24}px`
                      }}
                      animate={{
                        scale: isSelected ? 1.02 : 0.88,
                        opacity: isSelected ? 1 : 0.35,
                      }}
                      whileHover={{ scale: 1.05, opacity: 1, zIndex: 10 }}
                      transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
                      onClick={(e) => {
                        const targetFilm = homeFilms[(colIdx + 2) % homeFilms.length];
                        if (targetFilm && !hasDragged.current) {
                          router.push(`/films/${targetFilm.id}`);
                        }
                      }}
                    >
                      <img
                        loading="lazy" decoding="async"
                        src={bottomStill}
                        alt=""
                        className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 ${
                          isSelected ? 'grayscale-0' : 'grayscale'
                        }`}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. work-edge bottom (Ruler + Explore) */}
      <div data-slider="additionaltrigger" data-cursor="hide" className="work-edge bottom pointer-events-none">
        
        {/* Left Side: Active Film Info (for Poster Mode only, to balance structure) */}
        <div className="w-48 shrink-0 flex items-center gap-3 order-3 sm:order-none">
          <AnimatePresence>
            {viewMode === 'poster' && (
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-10 w-10 rounded border border-elephant-ivory/10 overflow-hidden shrink-0">
                  <img
                    src={activeFilm.stillImage}
                    alt=""
                    className="h-full w-full object-cover animate-pulse"
                  />
                </div>
                <div>
                  <span className="font-mono text-[7px] font-bold tracking-widest text-elephant-red uppercase block">
                    {activeFilm.category}
                  </span>
                  <h2 className="font-serif text-lg font-bold tracking-wider text-elephant-ivory uppercase leading-none mt-0.5 whitespace-nowrap">
                    {activeFilm.title}
                  </h2>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center: Measuring Tape Ruler Scroll indicator */}
        <div className="pointer-events-auto flex flex-col items-center gap-2 select-none order-2 sm:order-none">
          <div className="relative flex items-end justify-between h-6 w-56 border-b border-elephant-ivory/15 pb-1">
            {Array.from({ length: 21 }).map((_, idx) => {
              const isMajor = idx % 5 === 0;
              return (
                <div
                  key={idx}
                  className={`w-px bg-elephant-ivory transition-opacity duration-300 ${
                    isMajor ? 'h-3.5 opacity-60' : 'h-1.5 opacity-25'
                  }`}
                />
              );
            })}

            <div
              className="absolute bottom-1 h-1.5 w-7 rounded-full bg-elephant-red shadow-[0_0_8px_rgba(255,0,0,0.6)] transition-all duration-100 ease-out z-10"
              style={{
                left: `${progress * (224 - 28)}px`
              }}
            />
          </div>

          <div className="font-mono text-[9px] text-elephant-ivory/30 tracking-widest uppercase">
            0{activeIndex + 1} {"//"} 0{homeFilms.length}
          </div>
        </div>

        {/* Right Side: Explore button */}
        <div className="pointer-events-auto shrink-0 sm:w-48 flex justify-center sm:justify-end order-1 sm:order-none">
          <Link
            href={`/films/${activeFilm.id}`}
            className="flex items-center h-[46px] bg-[#FAF7EE] text-black relative hover:bg-[#FAF7EE]/90 transition-colors shadow-lg"
            style={{ clipPath: 'url(#ticketMaskLarge)' }}
          >
            <span className="font-sans text-[10px] font-black tracking-[0.25em] uppercase px-5">EXPLORE</span>
            <div className="h-7 border-r border-dashed border-black/30" />
            <div className="px-5 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </Link>
        </div>

      </div>

    </div>
  );
}
