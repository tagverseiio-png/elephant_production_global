'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import DecryptedText from '@/components/DecryptedText';
import { SmartVideo } from '@/components/SmartVideo';
import { publicApi, Film } from '@/lib/public-api';

export default function WorkPage() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'poster' | 'footage'>('footage');
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    publicApi.films.list()
      .then(setFilms)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const targetX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);
  const isAnimating = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const dragStartTargetX = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const footageTrackRef = useRef<HTMLDivElement>(null);
  const posterTopRef = useRef<HTMLDivElement>(null);
  const posterBottomRef = useRef<HTMLDivElement>(null);

  const [cardWidth, setCardWidth] = useState(450);
  const [trackOffset, setTrackOffset] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleResize = useCallback(() => {
    let width = 450;
    if (viewMode === 'footage') {
      width = window.innerWidth < 768 ? 320 : 450;
    } else {
      width = window.innerWidth < 768 ? 200 : 260;
    }
    setCardWidth(width);

    const paddingLeft = window.innerWidth * 0.12;
    const offset = window.innerWidth / 2 - paddingLeft - width / 2;
    setTrackOffset(offset);
  }, [viewMode]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const handleToggleMode = (mode: 'poster' | 'footage') => {
    const oldWidth = cardWidth;
    let newWidth = 450;
    if (mode === 'footage') {
      newWidth = window.innerWidth < 768 ? 320 : 450;
    } else {
      newWidth = window.innerWidth < 768 ? 200 : 260;
    }

    const ratio = newWidth / oldWidth;
    targetX.current = targetX.current * ratio;

    setViewMode(mode);
    setCardWidth(newWidth);

    const paddingLeft = window.innerWidth * 0.12;
    const offset = window.innerWidth / 2 - paddingLeft - newWidth / 2;
    setTrackOffset(offset);
  };

  const maxScroll = -(films.length - 1) * cardWidth;
  const startLoopFn = useRef<() => void>(() => {});

  function applyTransform() {
    const x = currentX.current;
    const offset = x + trackOffset;
    if (viewMode === 'footage') {
      if (footageTrackRef.current) {
        footageTrackRef.current.style.transform = `translate3d(${offset}px, 0px, 0px)`;
      }
    } else {
      if (posterTopRef.current) {
        posterTopRef.current.style.transform = `translate3d(${offset}px, 0px, 0px)`;
      }
      if (posterBottomRef.current) {
        posterBottomRef.current.style.transform = `translate3d(${(maxScroll - x) + trackOffset + cardWidth / 2}px, 0px, 0px)`;
      }
    }
  }

  function syncState() {
    const vx = currentX.current;
    const idx = Math.min(Math.max(Math.round(-vx / cardWidth), 0), films.length - 1);
    if (idx !== activeIndex) {
      setActiveIndex(idx);
      const film = films[idx];
      if (film) window.dispatchEvent(new CustomEvent('elephant-active-film', { detail: film.id }));
    }
  }

  const snapToNearestCard = useCallback(() => {
    const snapped = Math.min(Math.max(Math.round(targetX.current / cardWidth) * cardWidth, maxScroll), 0);
    targetX.current = snapped;
    startLoopFn.current();
  }, [cardWidth, maxScroll]);

  // Mouse wheel
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetX.current = Math.min(Math.max(targetX.current - e.deltaY * 0.95, maxScroll - 150), 150);
      startLoopFn.current();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => { snapToNearestCard(); }, 150);
    };

    const sliderEl = sliderRef.current;
    if (sliderEl) {
      sliderEl.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (sliderEl) sliderEl.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [maxScroll, snapToNearestCard]);

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    dragStartTargetX.current = targetX.current;
    startLoopFn.current();
    if (sliderRef.current) sliderRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - dragStartX.current;
    if (Math.abs(deltaX) > 5) hasDragged.current = true;
    let nextTarget = dragStartTargetX.current + deltaX * 1.25;
    if (nextTarget > 0) {
      nextTarget = nextTarget * 0.3;
    } else if (nextTarget < maxScroll) {
      nextTarget = maxScroll + (nextTarget - maxScroll) * 0.3;
    }
    targetX.current = nextTarget;
    currentX.current = nextTarget;
    applyTransform();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (sliderRef.current) sliderRef.current.releasePointerCapture(e.pointerId);
    snapToNearestCard();
    startLoopFn.current();
  };

  // Key handlers
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isDragging.current) return;
    if (e.key === 'ArrowRight') {
      targetX.current = Math.max(targetX.current - cardWidth, maxScroll);
      startLoopFn.current();
      snapToNearestCard();
    } else if (e.key === 'ArrowLeft') {
      targetX.current = Math.min(targetX.current + cardWidth, 0);
      startLoopFn.current();
      snapToNearestCard();
    }
  };

  // LERP tick — only runs while animating (drag, wheel, snap)
  useEffect(() => {
    let rafId: number;

    function tick() {
      currentX.current = currentX.current + (targetX.current - currentX.current) * 0.08;

      if (Math.abs(targetX.current - currentX.current) < 0.1) {
        currentX.current = targetX.current;
        isAnimating.current = false;
        applyTransform();
        syncState();
        return;
      }

      applyTransform();
      syncState();
      rafId = requestAnimationFrame(tick);
    }

    startLoopFn.current = () => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      tick();
    };

    return () => {
      cancelAnimationFrame(rafId);
      isAnimating.current = false;
    };
  }, [viewMode, cardWidth, trackOffset]);

  // Dispatch initial active film
  useEffect(() => {
    if (films[0]) {
      window.dispatchEvent(new CustomEvent('elephant-active-film', { detail: films[0].id }));
    }
  }, []);

  const progress = maxScroll !== 0 ? Math.min(Math.max(currentX.current / maxScroll, 0), 1) : 0;
  const activeFilm = films[activeIndex];

  if (loading) {
    return (
      <div className="bg-[#030303] h-screen w-full flex items-center justify-center">
        <div className="text-white/50 font-mono text-[10px] tracking-widest">LOADING...</div>
      </div>
    );
  }

  return (
    <div
      data-page="work"
      className="pw h-screen work relative select-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Film gallery — use arrow keys to navigate"
    >

      {/* Background grain noise texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Toggle Switcher */}
      <div data-cursor="hide" className="absolute top-20 sm:top-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-auto">
        <div data-work="toggleWrapper" className="toggle-switch-cont">
          <ul data-work="toggle" role="list" className="list w-list-unstyled">

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
          <div className={`abs trig-bg ${viewMode === 'footage' ? 'footage-pos' : 'poster-pos'}`} />
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

      <div className="work-vert-line"></div>

      {/* Draggable horizontal slider */}
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
          <div
            ref={footageTrackRef}
            className="flex h-full items-center justify-start px-[12vw] will-change-transform"
          >
            {films.map((film, index) => {
              const isSelected = index === activeIndex;
              const cardVisualOffset = currentX.current + index * cardWidth;
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
                  <div className="relative w-full h-[50%] sm:h-[58%] rounded-xl overflow-hidden border border-elephant-ivory/10 bg-elephant-ivory/5 shadow-2xl transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.1)]">
                    <motion.div
                      className="h-full w-[130%] absolute -left-[15%]"
                      style={{ x: parallaxX }}
                    >
                      <Image
                        src={film.stillImage}
                        alt={film.title}
                        fill
                        priority={isSelected}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={`object-cover pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
                          film.trailerVideo
                            ? isSelected ? '-translate-y-full' : 'translate-y-0 group-hover:-translate-y-full'
                            : 'translate-y-0'
                        }`}
                      />

                      {film.trailerVideo && (
                        <SmartVideo
                          className={`absolute inset-0 h-full w-full object-cover pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${isSelected ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`}
                          src={film.trailerVideo}
                          isPlaying={isSelected || hoveredIndex === index}
                        />
                      )}
                    </motion.div>

                    {film.awardLaurel && (
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#000000]/80 px-2.5 py-1 rounded backdrop-blur-[2px] border border-elephant-ivory/10">
                        {film.awardLogo && (
                          <Image
                            src={film.awardLogo}
                            alt="Award Logo"
                            width={40}
                            height={16}
                            className="h-4 w-auto object-contain invert brightness-0"
                          />
                        )}
                        <span className="font-sans text-[8px] font-semibold tracking-wider text-elephant-ivory uppercase">
                          {film.awardLaurel}
                        </span>
                      </div>
                    )}
                  </div>

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
          <div className="flex flex-col gap-8 justify-center h-full w-full pointer-events-auto">
            <div className="overflow-hidden flex items-center w-full">
              <div
                ref={posterTopRef}
                className="flex will-change-transform"
              >
                <div style={{ width: '12vw' }} className="shrink-0" />
                {Array.from({ length: 9 }).map((_, colIdx) => {
                  const isSelected = colIdx === activeIndex;
                  const topStill = films[colIdx % films.length]?.stillImage;

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
                        const targetFilm = films[colIdx % films.length];
                        if (targetFilm && !hasDragged.current) {
                          router.push(`/films/${targetFilm.id}`);
                        }
                      }}
                    >
                      <Image
                        src={topStill}
                        alt={films[colIdx % films.length]?.title ?? `Film still ${colIdx + 1}`}
                        fill
                        sizes="(max-width: 768px) 250px, 300px"
                        className={`object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 ${
                          isSelected ? 'grayscale-0' : 'grayscale'
                        }`}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="overflow-hidden flex items-center w-full">
              <div
                ref={posterBottomRef}
                className="flex will-change-transform"
              >
                <div style={{ width: '12vw' }} className="shrink-0" />
                {Array.from({ length: 9 }).map((_, colIdx) => {
                  const row2ActiveIndex = Math.min(
                    Math.max(Math.round(-(maxScroll - currentX.current) / cardWidth - 0.5), 0),
                    8
                  );
                  const isSelected = colIdx === row2ActiveIndex;
                  const bottomStill = films[(colIdx + 2) % films.length]?.stillImage;

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
                        const targetFilm = films[(colIdx + 2) % films.length];
                        if (targetFilm && !hasDragged.current) {
                          router.push(`/films/${targetFilm.id}`);
                        }
                      }}
                    >
                      <Image
                        src={bottomStill}
                        alt={films[(colIdx + 2) % films.length]?.title ?? `Film still ${colIdx + 10}`}
                        fill
                        sizes="(max-width: 768px) 250px, 300px"
                        className={`object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 ${
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

      {/* Bottom ruler + explore */}
      <div data-slider="additionaltrigger" data-cursor="hide" className="work-edge bottom pointer-events-none">

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
                <div className="relative h-10 w-10 rounded border border-elephant-ivory/10 overflow-hidden shrink-0">
                  <Image
                    src={activeFilm.stillImage}
                    alt={activeFilm.title}
                    fill
                    sizes="40px"
                    className="object-cover"
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
            0{activeIndex + 1} {"//"} 0{films.length}
          </div>
        </div>

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
