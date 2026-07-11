'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';
import filmsDatabase from '@/data/films.json';
import { homeFilms } from '@/data/home_films';
import DecryptedText from '@/components/DecryptedText';
import { fallbackGallery, fallbackReviews, fallbackAwards, defaultCrewList, FilmData } from '@/data/fallbacks';

export default function FilmDetailPage() {
  const params = useParams();
  const filmId = params?.id as string;

  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [isTrailerMuted, setIsTrailerMuted] = useState(false);
  const trailerVideoRef = useRef<HTMLVideoElement>(null);

  // Retrieve basic info from homeFilms catalog
  const baseInfo = homeFilms.find((f) => f.id === filmId);
  
  // Retrieve detailed info from films.json database
  const details = (filmsDatabase as unknown as Record<string, Partial<FilmData>>)[filmId];

  // Dispatch active film to Navbar on mount and scroll back to top
  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (filmId) {
      window.dispatchEvent(new CustomEvent('elephant-active-film', { detail: filmId }));
    }
  }, [filmId]);

  if (!baseInfo) {
    return (
      <div className="flex h-screen items-center justify-center bg-elephant-ivory text-elephant-black">
        <div className="text-center space-y-4">
          <p className="font-serif text-2xl italic">Film Case Study not found</p>
          <Link href="/work" className="font-mono text-xs font-bold underline text-elephant-red">
            RETURN TO CATALOGUE
          </Link>
        </div>
      </div>
    );
  }

  // Find adjacent film to show as "Next Project" footer preview
  const currentIdx = homeFilms.findIndex((f) => f.id === filmId);
  const nextIdx = (currentIdx + 1) % homeFilms.length;
  const nextFilm = homeFilms[nextIdx];

  // Resolve assets with clean default fallbacks
  const heroImage = details?.hero_image || baseInfo.stillImage;
  const directorImage = details?.director_image || heroImage;
  const trailerUrl = details?.trailer_url ?? '';
  const galleryStills = details?.gallery_images && details.gallery_images.length > 0 ? details.gallery_images : fallbackGallery;
  const reviewsList = details?.reviews && details.reviews.length > 0 ? details.reviews : fallbackReviews;
  const awardsList = details?.awards && details.awards.length > 0 ? details.awards : fallbackAwards;
  
  // Clean up crew lists
  const crewList = details?.credits && details.credits.length > 0 
    ? details.credits 
    : defaultCrewList(baseInfo.director);

  const handleOpenTrailer = () => {
    setIsPlayingTrailer(true);
  };

  const handleCloseTrailer = () => {
    setIsPlayingTrailer(false);
    if (trailerVideoRef.current) {
      trailerVideoRef.current.pause();
    }
  };

  return (
    <div className="min-h-screen bg-elephant-ivory text-[#000000] select-none">
      
      {/* 1. Cinematic Split Hero Header */}
      <section className="min-h-screen w-screen flex items-center justify-center bg-[#000000] px-4 sm:px-6 md:px-12 relative pt-20 pb-6">
        
        {/* Floating Card Frame styled as a Movie Ticket stub */}
        <div 
          className="relative w-full max-w-7xl h-auto sm:h-[82vh] overflow-hidden bg-[#FAF6EE] shadow-2xl flex flex-col justify-end p-5 sm:p-8 md:p-12 text-[#000000]"
          style={{ 
            clipPath: 'url(#ticketMaskLarge)',
            background: 'radial-gradient(circle at 15% 25%, rgba(139, 90, 43, 0.08) 0%, transparent 45%), radial-gradient(circle at 85% 75%, rgba(101, 67, 33, 0.1) 0%, transparent 40%), #FAF6EE',
          }}
        >
          
          {/* Gritty Vintage Paper Texture Overlay (Fiber Grain & Stains) */}
          <div 
            className="absolute inset-0 opacity-[0.07] mix-blend-multiply pointer-events-none z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />

          {/* Left Perforated Torn Ticket Edge (Black "bite" circles) */}
          <div className="absolute -left-1 top-4 bottom-4 w-2 z-30 flex flex-col justify-between pointer-events-none">
            {Array.from({ length: 42 }).map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#000000]" />
            ))}
          </div>

          {/* Right Perforated Torn Ticket Edge (Black "bite" circles) */}
          <div className="absolute -right-1.5 top-4 bottom-4 w-2 z-30 flex flex-col justify-between pointer-events-none">
            {Array.from({ length: 42 }).map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#000000]" />
            ))}
          </div>

          {/* Luxury Crimson Ticket SVG Border Outline */}
          <div className="absolute inset-0 pointer-events-none z-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M 0,3 A 3,3 0 0,0 3,0 L 67,0 A 3,4 0 0,0 73,0 L 97,0 A 3,3 0 0,0 100,3 L 100,97 A 3,3 0 0,0 97,100 L 73,100 A 3,4 0 0,0 67,100 L 3,100 A 3,3 0 0,0 0,97 Z"
                fill="none"
                stroke="var(--color-elephant-red)"
                strokeWidth="0.25"
                vectorEffect="non-scaling-stroke"
                className="opacity-75"
              />
              <path
                d="M 1.5,4 A 1.5,1.5 0 0,0 4,1.5 L 66,1.5 A 3,4 0 0,0 74,1.5 L 95.5,1.5 A 1.5,1.5 0 0,0 98.5,4 L 98.5,96 A 1.5,1.5 0 0,0 95.5,98.5 L 74,98.5 A 3,4 0 0,0 66,98.5 L 4,98.5 A 1.5,1.5 0 0,0 1.5,96 Z"
                fill="none"
                stroke="var(--color-elephant-red)"
                strokeWidth="0.1"
                vectorEffect="non-scaling-stroke"
                className="opacity-40"
              />
            </svg>
          </div>

          {/* Vertical Crimson Tear Perforated Divider */}
          <div className="hidden lg:block absolute left-[70%] top-4 bottom-4 border-l border-dashed border-elephant-red/30 z-20 pointer-events-none" />

          {/* Vertical Ticket Serial Codes on outer edges */}
          <div className="absolute top-1/2 -translate-y-1/2 left-3.5 z-20 hidden md:block select-none pointer-events-none">
            <span className="font-mono text-[7px] text-[#000000]/30 tracking-[0.35em] font-bold uppercase block rotate-90 origin-left whitespace-nowrap translate-x-2">
              ADMIT ONE • № {baseInfo.year}-009
            </span>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-3.5 z-20 hidden md:block select-none pointer-events-none">
            <span className="font-mono text-[7px] text-[#000000]/30 tracking-[0.35em] font-bold uppercase block -rotate-90 origin-right whitespace-nowrap -translate-x-2">
              ELEPHANT PRODUCTIONS
            </span>
          </div>

          {/* Ticket Barcode Stamp in the right stub */}
          <div className="absolute bottom-8 left-[73%] z-20 hidden lg:block opacity-35 text-[#000000] pointer-events-none">
            <svg className="h-6 w-16" fill="currentColor" viewBox="0 0 40 20">
              <rect x="0" y="2" width="2" height="16" />
              <rect x="4" y="2" width="1" height="16" />
              <rect x="7" y="2" width="3" height="16" />
              <rect x="12" y="2" width="1" height="16" />
              <rect x="15" y="2" width="2" height="16" />
              <rect x="19" y="2" width="4" height="16" />
              <rect x="25" y="2" width="1" height="16" />
              <rect x="28" y="2" width="2" height="16" />
              <rect x="32" y="2" width="1" height="16" />
              <rect x="35" y="2" width="3" height="16" />
            </svg>
          </div>

          {/* Main Content or Video Player */}
          {!isPlayingTrailer ? (
            <>
              {/* Still Background Image inside the card boundary with light vintage blending */}
              <div className="absolute inset-0 opacity-15 pointer-events-none z-0 mix-blend-multiply">
                <Image
                  src={heroImage}
                  alt={baseInfo.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 100vw"
                  className="object-cover grayscale contrast-125"
                />
              </div>

              {/* Main Grid inside the card boundary */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10 w-full text-elephant-black">
                
                {/* Left Column: Title & Lined Metadata Table (6 cols) */}
                <div className="lg:col-span-6 space-y-6 lg:pr-8">
                  
                  {/* Top Laurels / Festival badges */}
                  {baseInfo.awardLaurel && (
                    <div className="flex items-center gap-3">
                      {baseInfo.awardLogo && (
                        <Image
                          src={baseInfo.awardLogo}
                          alt="Festival Logo"
                          width={40}
                          height={32}
                          className="h-8 w-auto object-contain"
                        />
                      )}
                      <span className="font-mono text-[8px] font-bold tracking-widest text-elephant-red">
                        {baseInfo.year} {"//"} {baseInfo.awardLaurel.toUpperCase()}
                      </span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <span className="font-mono text-[8px] font-bold tracking-widest text-[#000000]/50 uppercase block">
                      {baseInfo.category}
                    </span>
                    <h1 className="font-serif text-3xl md:text-5xl font-extrabold tracking-wide uppercase leading-tight text-elephant-black">
                      <DecryptedText text={baseInfo.title} />
                    </h1>
                  </div>

                  {/* Lined Metadata Table */}
                  <div className="border-t border-[#000000]/25 pt-4 space-y-2 text-[10px] font-mono max-w-sm">
                    <div className="flex justify-between py-1.5 border-b border-[#000000]/10">
                      <span className="text-[#000000]/55">DIRECTOR</span>
                      <span className="font-semibold uppercase">{baseInfo.director}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#000000]/10">
                      <span className="text-[#000000]/55">YEAR</span>
                      <span className="font-semibold">{baseInfo.year}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#000000]/10">
                      <span className="text-[#000000]/55">CATEGORY</span>
                      <span className="font-semibold uppercase">{baseInfo.category}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Stacked Critic Reviews (6 cols) */}
                <div className="lg:col-span-6 space-y-5 lg:pl-12">
                  <div className="border-b border-[#000000]/25 pb-2">
                    <span className="font-mono text-[8px] font-bold tracking-widest text-[#000000]/50 uppercase block">
                      PRESS REVIEWS
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {reviewsList.slice(0, 3).map((review, idx) => (
                      <div key={idx} className="space-y-1 border-b border-[#000000]/5 pb-2.5 last:border-0">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[8px] font-bold tracking-widest text-elephant-red uppercase">
                            {review.source}
                          </span>
                          <div className="flex gap-1 text-[8px] text-[#000000] tracking-[0.3em]">
                            ★ ★ ★ ★ ★
                          </div>
                        </div>
                        <p className="font-serif text-xs italic font-light text-[#000000]/80 leading-relaxed uppercase">
                          &ldquo;{review.text}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Watch CTA Ticket Button (Bottom Right) */}
              {trailerUrl && (
                <div className="absolute bottom-6 right-6 md:right-12 z-20 pointer-events-auto">
                  <button
                    onClick={handleOpenTrailer}
                    className="flex h-10 bg-elephant-black text-elephant-ivory border border-[#000000]/15 rounded shadow-lg items-center px-6 hover:bg-[#111111] transition-all hover:translate-y-[-1px]"
                    style={{ clipPath: 'url(#ticketMaskLarge)' }}
                    data-cursor-text="PLAY"
                  >
                    <span className="font-mono text-[9px] font-bold tracking-widest mr-2">
                      WATCH
                    </span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="currentColor" 
                      viewBox="0 0 16 16" 
                      className="h-3 w-3"
                    >
                      <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 z-40 bg-[#000000] flex items-center justify-center">
              <video
                ref={trailerVideoRef}
                className="w-full h-full object-contain"
                src={trailerUrl}
                autoPlay
                controls
                playsInline
              />
              <button
                onClick={handleCloseTrailer}
                className="absolute top-6 right-6 z-50 font-mono text-[10px] font-bold tracking-widest text-[#000000] hover:text-elephant-red bg-[#FAF6EE] px-4 py-2 rounded-full border border-[#000000]/10 shadow-sm"
              >
                CLOSE
              </button>
            </div>
          )}

        </div>

      </section>

      {/* 2. Detailed Crew Table section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#000000]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Director Profile */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative aspect-[3/4.2] w-full max-w-[280px] rounded-t-full overflow-hidden border border-elephant-black/10 bg-elephant-black/5 shadow-md">
              <Image
                src={directorImage}
                alt="Director Profile Still"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover"
              />
            </div>
            
            <div className="space-y-1">
              <span className="font-mono text-[8px] font-bold tracking-widest text-elephant-red uppercase block">
                DIRECTED BY
              </span>
              <h3 className="font-serif text-2xl font-semibold text-elephant-black leading-tight uppercase">
                {baseInfo.director}
              </h3>
            </div>
          </div>

          {/* Right: Main credits table */}
          <div className="lg:col-span-8 space-y-6">
            <div className="border-b border-[#000000]/10 pb-4">
              <h4 className="font-mono text-[9px] font-bold tracking-widest text-[#000000]/40 uppercase">
                MAIN CREW & CREDITS
              </h4>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {crewList.map((item, idx) => (
                <div key={idx} className="flex flex-col border-b border-[#000000]/5 pb-3">
                  <span className="font-mono text-[8px] text-[#000000]/40 uppercase">
                    {item.role}
                  </span>
                  <span className="font-sans text-sm font-semibold text-[#000000] mt-0.5 uppercase">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Director's Cut Gallery strip */}
      <section className="py-16 border-t border-[#000000]/10">
        <div className="px-6 md:px-12 mb-6 max-w-7xl mx-auto">
          <span className="font-mono text-[9px] font-bold tracking-widest text-elephant-red uppercase block">
            STILL CATALOGUE
          </span>
          <h2 className="font-serif text-3xl font-semibold tracking-wide text-[#000000] mt-1 uppercase">
            Director&apos;s Cut Gallery
          </h2>
        </div>

        {/* Draggable Gallery Row */}
        <div className="w-full overflow-x-auto py-4 mask-fade-x-1">
          <motion.div
            className="flex gap-6 px-6 md:px-12 w-max"
            drag="x"
            dragConstraints={{ left: -1200, right: 0 }}
            data-cursor-text="DRAG"
          >
            {galleryStills.map((still, idx) => (
              <div
                key={idx}
                className="relative w-[280px] md:w-[360px] aspect-[4/3] rounded-lg overflow-hidden border border-[#000000]/5 bg-elephant-black/10 shadow-sm"
              >
                <Image
                  src={still}
                  alt={`Gallery Still ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 280px, 360px"
                  className="object-cover pointer-events-none"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Next Project preview */}
      <section className="border-t border-[#000000]/10 bg-elephant-black/5 hover:bg-[#000000] transition-colors duration-500 group select-none">
        <Link 
          href={`/films/${nextFilm.id}`}
          className="flex flex-col items-center justify-center py-24 text-center px-6"
          data-cursor-text="NEXT"
        >
          <span className="font-mono text-[9px] font-bold tracking-widest text-elephant-red uppercase group-hover:text-elephant-red/80 transition-colors">
            NEXT ACT
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-semibold tracking-wide text-[#000000] mt-2 group-hover:text-elephant-ivory transition-colors leading-none uppercase">
            {nextFilm.title}
          </h2>
          <span className="font-sans text-[10px] text-[#000000]/45 mt-3 block group-hover:text-elephant-ivory/50 transition-colors uppercase">
            {nextFilm.category} | {nextFilm.year}
          </span>
        </Link>
      </section>

      {/* Shared Footer component */}
      <Footer />

    </div>
  );
}
