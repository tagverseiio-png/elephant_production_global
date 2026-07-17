'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import { publicApi, Film } from '@/lib/public-api';
import { navLinks, legalLinks, socialLinks } from '@/data/contact';

/* ──────────────────────────────────────────────
   Ticket dimensions (px):
   W = 340, headerH = 103
   Perforation line at 70% width = 238px
   ────────────────────────────────────────────── */
const TW_DESKTOP = 340;  // ticket width on desktop
const TW_MOBILE  = 260;  // ticket width on mobile
const HEADER_H = 103; // header height (closed ticket)
const PERF_X = 238;   // 70% perforation line

// Path defining true punched-out notch cutouts in the ticket paper
const HEADER_CLIP_PATH = `path("M 9,0 L 229,0 A 9,9 0 0,0 247,0 L 331,0 A 9,9 0 0,0 340,9 L 340,94 A 9,9 0 0,0 331,103 L 247,103 A 9,9 0 0,0 229,103 L 9,103 A 9,9 0 0,0 0,94 L 0,9 A 9,9 0 0,0 9,0 Z")`;
const MOBILE_SQUARE_CLIP_PATH = `path("M 8,0 L 52,0 A 8,8 0 0,0 60,8 L 60,52 A 8,8 0 0,0 52,60 L 8,60 A 8,8 0 0,0 0,52 L 0,8 A 8,8 0 0,0 8,0 Z")`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [TW, setTW] = useState(TW_DESKTOP);
  const pathname = usePathname();
  const router = useRouter();

  const [activeFilmId, setActiveFilmId] = useState<string | null>(
    pathname?.startsWith('/films/') ? (pathname.split('/').pop() || null) : null
  );
  const [isTicketDropdownOpen, setIsTicketDropdownOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(pathname !== '/' && !pathname?.startsWith('/admin'));
  const [films, setFilms] = useState<Film[]>([]);
  const [filmsLoaded, setFilmsLoaded] = useState(false);

  useEffect(() => {
    publicApi.films.list()
      .then(setFilms)
      .catch(console.error)
      .finally(() => setFilmsLoaded(true));
  }, []);

  const navFilms = films.map(film => ({
    id: film.id,
    title: film.title,
    category: film.category,
    year: film.year,
    image: film.stillImage
  }));

  useEffect(() => {
    const updateTW = () => setTW(window.innerWidth < 640 ? TW_MOBILE : TW_DESKTOP);
    updateTW();
    window.addEventListener('resize', updateTW);
    return () => window.removeEventListener('resize', updateTW);
  }, []);

  useEffect(() => {
    setShowNavbar(pathname !== '/' && !pathname?.startsWith('/admin'));
  }, [pathname]);

  // Sync activeFilmId when pathname changes
  useEffect(() => {
    if (pathname?.startsWith('/films/')) {
      setActiveFilmId(pathname.split('/').pop() || null);
    } else {
      setActiveFilmId(null);
    }
  }, [pathname]);

  useEffect(() => {
    const handlePreloaderComplete = () => setShowNavbar(true);
    window.addEventListener('elephant-preloader-complete', handlePreloaderComplete);
    return () => window.removeEventListener('elephant-preloader-complete', handlePreloaderComplete);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => setActiveFilmId((e as CustomEvent).detail);
    window.addEventListener('elephant-active-film', handler);
    return () => window.removeEventListener('elephant-active-film', handler);
  }, []);

  const closeAll = () => { setIsOpen(false); setIsTicketDropdownOpen(false); };
  const activeFilm = navFilms.find(f => f.id === activeFilmId) || navFilms[0];

  if (!filmsLoaded) {
    return (
      <div className="fixed top-0 left-0 z-[100] px-6 py-6 md:px-10 mix-blend-difference select-none pointer-events-none">
        <Link href="/" className="pointer-events-auto text-white flex flex-col justify-center" aria-label="Home">
          <img src="/logo.png" alt="Elephant Film Production" style={{ height: 'clamp(80px, 10vw, 140px)', width: 'auto', objectFit: 'contain' }} />
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* ── Backdrop (cream wash like elephantproductions.com) ── */}
      <AnimatePresence>
        {(isOpen || isTicketDropdownOpen) && (
          <motion.div
            className="fixed inset-0 z-[80] pointer-events-auto"
            style={{ backgroundColor: isOpen ? 'rgba(250,247,238,0.85)' : 'rgba(0,0,0,0.4)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeAll}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNavbar && (
          <>
            {/* ── ELEPHANT Logo (top-left, mix-blend-difference) ── */}
            <motion.div
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="fixed top-0 left-0 z-[100] px-6 py-6 md:px-10 mix-blend-difference select-none pointer-events-none"
            >
              <Link href="/" onClick={closeAll} className="pointer-events-auto text-white flex flex-col justify-center" aria-label="Home">
                <img src="/logo.png" alt="Elephant Film Production" style={{ height: 'clamp(80px, 10vw, 140px)', width: 'auto', objectFit: 'contain' }} />
              </Link>
            </motion.div>

            {/* ── Ticket Widget (Desktop) & Square Hamburger (Mobile) ── */}
            <motion.div
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              data-cursor="hide"
              className="fixed top-5 right-5 sm:top-6 sm:right-6 z-[100] select-none pointer-events-none flex flex-col items-end"
            >
              
              {/* MOBILE: Square Hamburger Button (hidden on sm+) */}
              <div className="sm:hidden pointer-events-auto relative">
                <div
                  className="bg-[#FAF7EE] shadow-xl flex items-center justify-center cursor-pointer hover:bg-[#FAF7EE]/90 transition-colors"
                  style={{
                    width: 60,
                    height: 60,
                    clipPath: MOBILE_SQUARE_CLIP_PATH,
                  }}
                  onClick={() => { setIsOpen(prev => !prev); setIsTicketDropdownOpen(false); }}
                >
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <span
                      className="absolute h-[2px] w-6 bg-black transition-all duration-500 origin-center"
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'translateY(-7px)' }}
                    />
                    <span
                      className="absolute h-[2px] w-6 bg-black transition-all duration-500 origin-center"
                      style={{ opacity: isOpen ? 0 : 1, transform: isOpen ? 'scaleX(0)' : 'translateY(0)' }}
                    />
                    <span
                      className="absolute h-[2px] w-6 bg-black transition-all duration-500 origin-center"
                      style={{ transform: isOpen ? 'rotate(-45deg)' : 'translateY(7px)' }}
                    />
                  </div>
                </div>
              </div>

              {/* DESKTOP: Full Ticket Widget (hidden on mobile) */}
              <div className="hidden sm:block pointer-events-auto relative" style={{ width: TW }}>
                <div
                  className="relative overflow-hidden bg-[#FAF7EE] shadow-xl"
                  style={{
                    width: TW,
                    height: HEADER_H,
                    clipPath: HEADER_CLIP_PATH,
                  }}
                >
                  {/* ── Dashed vertical perforation line ── */}
                  <div className="absolute top-0 bottom-0 pointer-events-none z-10" style={{ left: PERF_X, borderLeft: '1.5px dashed rgba(0,0,0,0.25)' }} />

                  {/* ── Content layer ── */}
                  <div className="relative z-20 flex h-full w-full">
                    
                    {/* Left 70% — film info */}
                    <div className="h-full overflow-hidden" style={{ width: PERF_X }}>
                      <div className="flex flex-col h-full w-full justify-between">
                        {/* Title row */}
                        <button
                          type="button"
                          onClick={() => { if (!isOpen) setIsTicketDropdownOpen(prev => !prev); }}
                          className="flex items-center gap-2.5 px-4 h-[71px] w-full text-left cursor-pointer hover:bg-black/5 transition-colors border-0 outline-none bg-transparent"
                        >
                          <img src={activeFilm.image} alt={activeFilm.title} className="h-8 w-10 object-cover rounded-[4px] border border-black/10 shrink-0" />
                          <span className="font-sans font-extrabold tracking-wider text-[11px] text-black truncate uppercase leading-tight flex-1">
                            {activeFilm.title}
                          </span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 8" className="w-3 h-2 shrink-0 text-black" style={{ transform: isTicketDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                            <path stroke="currentColor" strokeWidth="1.5" d="m1 1 5.086 5.086a2 2 0 0 0 2.828 0L14 1" />
                          </svg>
                        </button>

                        {/* Sub-bar: CATEGORY | YEAR | MIN */}
                        <div className="flex w-full h-[32px] border-t border-black/20">
                          <div className="flex-1 flex items-center justify-center border-r border-black/20">
                            <span className="font-mono text-[8px] font-bold tracking-[0.15em] text-black/70 uppercase truncate px-1">{activeFilm.category}</span>
                          </div>
                          <div className="flex-1 flex items-center justify-center border-r border-black/20">
                            <span className="font-mono text-[8px] font-bold tracking-[0.15em] text-black/70 uppercase truncate px-1">{activeFilm.year}</span>
                          </div>
                          <div className="flex-1 flex items-center justify-center">
                            <span className="font-mono text-[8px] font-bold tracking-[0.15em] text-black/70 uppercase truncate px-1">—</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right 30% — hamburger / X toggle */}
                    <button
                      type="button"
                      onClick={() => { setIsOpen(prev => !prev); setIsTicketDropdownOpen(false); }}
                      className="h-full flex items-center justify-center cursor-pointer bg-transparent border-0 outline-none hover:bg-black/5 transition-colors"
                      style={{ width: TW - PERF_X }}
                      aria-label="Toggle Menu"
                    >
                      <div className="relative w-6 h-6 flex items-center justify-center">
                        <span className="absolute h-[2px] w-6 bg-black transition-all duration-500 origin-center" style={{ transform: isOpen ? 'rotate(45deg)' : 'translateY(-7px)' }} />
                        <span className="absolute h-[2px] w-6 bg-black transition-all duration-500 origin-center" style={{ opacity: isOpen ? 0 : 1, transform: isOpen ? 'scaleX(0)' : 'translateY(0)' }} />
                        <span className="absolute h-[2px] w-6 bg-black transition-all duration-500 origin-center" style={{ transform: isOpen ? 'rotate(-45deg)' : 'translateY(7px)' }} />
                      </div>
                    </button>
                  </div>
                </div>
              </div>

                {/* ────── MENU DRAWER (full screen on mobile, dropdown on desktop) ────── */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <>
                      {/* Mobile: full-screen overlay */}
                      <motion.div
                        className="sm:hidden fixed inset-0 z-[200] flex flex-col pointer-events-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                      >
                        {/* Dark backdrop behind the card */}
                        <div className="absolute inset-0 bg-black/80" onClick={closeAll} />

                        {/* Cream card */}
                        <motion.div
                          className="relative z-10 m-4 mt-24 bg-[#FAF7EE] text-black overflow-hidden"
                          style={{ borderRadius: '12px' }}
                          initial={{ y: 40, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 40, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {/* Main nav links */}
                          <div className="px-6 pt-8 pb-4 flex flex-col gap-1">
                            {navLinks.map((item) => {
                              const isActive = pathname === item.href;
                              return (
                                <div key={item.href} className="flex items-baseline gap-3">
                                  <span className="font-mono text-[10px] text-black/40 font-semibold tracking-wider w-6 shrink-0">
                                    {item.num}
                                  </span>
                                  <Link
                                    href={item.href}
                                    onClick={closeAll}
                                    className={`font-sans font-black text-[40px] tracking-[0.04em] leading-[1.2] transition-colors hover:opacity-60 text-black uppercase ${isActive ? 'opacity-50' : ''}`}
                                  >
                                    {item.label}
                                  </Link>
                                </div>
                              );
                            })}
                          </div>

                          {/* Dashed separator */}
                          <div className="mx-4" style={{ borderTop: '1.5px dashed rgba(0,0,0,0.2)' }} />

                          {/* Secondary links */}
                          <div className="px-6 py-4 flex justify-start gap-8 text-[10px] font-mono font-bold text-black/60 tracking-[0.15em]">
                            {legalLinks.map((item) => (
                              <Link key={item.href} href={item.href} onClick={closeAll} className="hover:text-black transition-colors">{item.label}</Link>
                            ))}
                          </div>

                          {/* Dashed separator */}
                          <div className="mx-4" style={{ borderTop: '1.5px dashed rgba(0,0,0,0.2)' }} />

                          {/* Social icons */}
                          <div className="px-6 py-5 flex gap-6 items-center">
                            {socialLinks.map((social) => {
                              const isIG = social.label === 'IG';
                              const isFB = social.label === 'FB';
                              const isLN = social.label === 'LN';
                              return (
                                <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="text-black hover:opacity-60 transition-opacity">
                                  {isIG && (
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                  )}
                                  {isFB && (
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                  )}
                                  {isLN && (
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.86 3.39-1.86 3.63 0 4.3 2.39 4.3 5.5v6.25z"/></svg>
                                  )}
                                </a>
                              );
                            })}
                          </div>

                          {/* Dashed separator */}
                          <div className="mx-4" style={{ borderTop: '1.5px dashed rgba(0,0,0,0.2)' }} />

                          {/* Copyright */}
                          <div className="px-6 py-4 font-mono text-[9px] text-black/50 font-bold uppercase tracking-[0.15em]">
                            ©{new Date().getFullYear()}. ELEPHANT PRODUCTIONS.
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Desktop: compact dropdown from ticket widget */}
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                        className="hidden sm:block overflow-hidden relative bg-[#FAF7EE] text-black mt-[-1px] pointer-events-auto"
                        style={{
                          width: TW,
                          clipPath: `path("M 0,0 L 229,0 A 9,9 0 0,0 247,0 L 340,0 L 340,calc(100% - 9px) A 9,9 0 0,0 331,100% L 9,100% A 9,9 0 0,0 0,calc(100% - 9px) Z")`,
                        }}
                      >
                        <div className="absolute w-full pointer-events-none z-10" style={{ top: 0, borderTop: '1.5px dashed rgba(0,0,0,0.25)' }} />
                        <div className="absolute top-0 bottom-0 pointer-events-none z-10" style={{ left: PERF_X, borderLeft: '1.5px dashed rgba(0,0,0,0.25)' }} />
                        <div className="relative z-20 px-6 pt-8 pb-6 flex flex-col gap-5">
                          <div className="flex flex-col gap-2">
                            {navLinks.map((item) => {
                              const isActive = pathname === item.href;
                              return (
                                <div key={item.href} className="flex items-baseline gap-3">
                                  <span className="font-mono text-[10px] text-black/40 font-semibold tracking-wider">{item.num}</span>
                                  <Link href={item.href} onClick={closeAll} className={`font-sans font-black text-[24px] sm:text-[28px] tracking-[0.08em] leading-[1.5] transition-colors hover:opacity-60 text-black ${isActive ? 'opacity-60' : ''}`}>
                                    {item.label}
                                  </Link>
                                </div>
                              );
                            })}
                          </div>
                          <div style={{ borderTop: '1.5px dashed rgba(0,0,0,0.2)' }} />
                          <div className="flex justify-start gap-6 text-[10px] font-mono font-bold text-black/60 tracking-[0.15em]">
                            {legalLinks.map((item) => (
                              <Link key={item.href} href={item.href} onClick={closeAll} className="hover:text-black transition-colors">{item.label}</Link>
                            ))}
                          </div>
                          <div style={{ borderTop: '1.5px dashed rgba(0,0,0,0.2)' }} />
                          <div className="flex gap-5 items-center">
                            {socialLinks.map((social) => {
                              const isIG = social.label === 'IG';
                              const isFB = social.label === 'FB';
                              const isLN = social.label === 'LN';
                              return (
                                <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="text-black hover:opacity-60 transition-opacity">
                                  {isIG && (
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                  )}
                                  {isFB && (
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                  )}
                                  {isLN && (
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.86 3.39-1.86 3.63 0 4.3 2.39 4.3 5.5v6.25z"/></svg>
                                  )}
                                </a>
                              );
                            })}
                          </div>
                          <div className="font-mono text-[9px] text-black/50 font-bold uppercase tracking-[0.15em]">
                            ©{new Date().getFullYear()}. ELEPHANT PRODUCTIONS.
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

                {/* ────── FILM DROPDOWN ────── */}
                <AnimatePresence>
                  {isTicketDropdownOpen && !isOpen && (
                    <motion.div
                      className="absolute left-0 bg-[#FAF7EE] border border-black/15 text-black z-50 pointer-events-auto overflow-hidden rounded-b-lg shadow-lg"
                      style={{ top: HEADER_H, width: PERF_X }}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
                    >
                      <div className="w-full divide-y divide-black/10">
                        {navFilms.map((film) => {
                          const isSelected = activeFilm.id === film.id;
                          return (
                            <button
                              key={film.id}
                              type="button"
                              onClick={() => {
                                setIsTicketDropdownOpen(false);
                                router.push(`/films/${film.id}`);
                              }}
                              className={`w-full text-left px-3 py-2 hover:bg-black/5 flex items-center gap-2 transition-colors border-0 outline-none cursor-pointer ${isSelected ? 'bg-black/5' : ''}`}
                            >
                              <img src={film.image} alt={film.title} className="h-5 w-7 object-cover rounded-sm border border-black/10 shrink-0" />
                              <span className="font-sans font-extrabold text-[10px] tracking-wider text-black uppercase truncate flex-1">
                                {film.title}
                              </span>
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
