'use client';

import React, { useState, useEffect } from 'react';
import { motion, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import DecryptedText from '@/components/DecryptedText';
import { publicApi, Collaborator, Film } from '@/lib/public-api';
import { aboutDescription, aboutCategories, aboutTaglines, whyUs, services } from '@/data/contact';
import { useScrollProgress } from '@/components/ScrollContext';
export default function AboutPage() {
  const [isLive, setIsLive] = useState(false);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const [collabLoading, setCollabLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      if (host.includes('elephantproductions.com') || host.includes('webflow.io')) {
        setIsLive(true);
      }
    }
    Promise.all([
      publicApi.collaborators.list(),
      publicApi.films.list(),
    ]).then(([collabs, filmData]) => {
      setCollaborators(collabs);
      setFilms(filmData);
    }).catch(console.error)
    .finally(() => setCollabLoading(false));
  }, []);

  const galleryImages = films.flatMap(f => f.gallery_images?.length ? f.gallery_images : (f.stillImage ? [f.stillImage] : []));

  const scrollProgress = useScrollProgress();

  // Parallax translation mapping values for staircase text lines (Desktop percentages)
  const xLine1 = useTransform(scrollProgress!, [0, 1], ["0%", "30%"]);
  const xLine2 = useTransform(scrollProgress!, [0, 1], ["10%", "50%"]);
  const xLine3 = useTransform(scrollProgress!, [0, 1], ["5%", "40%"]);
  const xLine4 = useTransform(scrollProgress!, [0, 1], ["15%", "50%"]);

  // Parallax translation mapping values for text categories to prevent collisions
  const xTelevision = useTransform(scrollProgress!, [0, 1], ["0%", "-5%"]);
  const xFilms = useTransform(scrollProgress!, [0, 1], ["0%", "5%"]);
  const xDocumentary = useTransform(scrollProgress!, [0, 1], ["0%", "8%"]);

  // Parallax translation mapping values for bottom ELEPHANT block and staircase
  const xElephant = useTransform(scrollProgress!, [0, 1], ["-5%", "5%"]);
  const xAna = useTransform(scrollProgress!, [0, 1], ["0%", "10%"]);
  const xFreud = useTransform(scrollProgress!, [0, 1], ["5%", "15%"]);
  const xKafka = useTransform(scrollProgress!, [0, 1], ["-5%", "5%"]);

  return (
    <div className="min-h-screen bg-[#000000] text-elephant-ivory select-none">
      
      {/* 2. Gothic Arch Centerpiece Section ("FILM PRODUCTION HOUSE") */}
      <section className="relative pt-36 pb-20 bg-elephant-black/25 overflow-hidden">
        {/* Section Top Border Line Animation */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-elephant-ivory/10 origin-center"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Left Arch (3 cols) */}
          <motion.div
            className="hidden lg:flex lg:col-span-3 justify-start"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div 
              className="relative w-full max-w-[200px] aspect-[1/2.7] border border-dashed border-elephant-ivory/20 bg-elephant-ivory/5 shadow-2xl p-1 overflow-hidden"
              style={{ clipPath: 'url(#gothicArch)' }}
            >
              <Image
                src="/media/wedding1/DSC03084_websize.jpg"
                alt="Arch scene left"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale brightness-85 contrast-105"
                style={{ clipPath: 'url(#gothicArch)' }}
              />
            </div>
          </motion.div>

          {/* Lined Center Text block (6 cols) */}
          <div className="col-span-1 lg:col-span-6 py-16 px-6 md:px-12 relative flex flex-col justify-between min-h-[460px]">
            {/* Outer Surrounding Dotted/Dashed Border Box */}
            <motion.div
              className="absolute inset-0 border border-dashed border-elephant-ivory/20 rounded-2xl pointer-events-none"
              initial={{ scaleX: 0, scaleY: 0.9, opacity: 0 }}
              whileInView={{ scaleX: 1, scaleY: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            />

            {/* Top Text */}
            <motion.span
              className="font-mono text-[9px] font-bold tracking-widest text-elephant-red uppercase block text-center z-10"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              ELEPHANT PRODUCTIONS IS A
            </motion.span>
            
            {/* Center Header text and 5 layout lines */}
            <div className="relative py-12 my-2 w-full text-center">
              {/* 5 Horizontal Grid Lines spanning 100% of the box */}
              <div className="absolute inset-y-0 left-0 right-0 py-10 flex flex-col justify-between pointer-events-none">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <motion.div
                    key={idx}
                    className="h-px w-full bg-elephant-ivory/10 origin-center"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1], delay: 0.3 + idx * 0.08 }}
                  />
                ))}
              </div>
              
              <h2 className="relative z-10 font-serif text-3xl md:text-5xl lg:text-6xl font-medium tracking-widest text-elephant-ivory uppercase leading-[1.25]">
                <DecryptedText text="FILM PRODUCTION" delay={300} />
                <br />
                <DecryptedText text="HOUSE" delay={700} />
              </h2>
            </div>

            {/* Bottom Text */}
            <motion.p
              className="font-mono text-[9px] font-bold tracking-widest text-elephant-ivory/60 uppercase text-center z-10"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              DEDICATED TO TRANSFORMING STORIES INTO TIMELESS VISUAL EXPERIENCES
            </motion.p>

            {/* Down arrow circle button overlapping bottom border */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-25 flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full border border-elephant-ivory/20 bg-[#000000] text-elephant-ivory shadow-lg cursor-pointer animate-bounce-soft"
              >
                ↓
              </div>
            </motion.div>
          </div>

          {/* Right Arch (3 cols) */}
          <motion.div
            className="hidden lg:flex lg:col-span-3 justify-end"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div 
              className="relative w-full max-w-[200px] aspect-[1/2.7] border border-dashed border-elephant-ivory/20 bg-elephant-ivory/5 shadow-2xl p-1 overflow-hidden"
              style={{ clipPath: 'url(#gothicArch)' }}
            >
              <Image
                src="/media/wedding2/untitled-20_websize.jpg"
                alt="Arch scene right"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale brightness-85 contrast-105"
                style={{ clipPath: 'url(#gothicArch)' }}
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* Typography Section (Screenshots 1 & 2) */}
      <section className="about-type-comp border-t border-elephant-ivory/10">
        
        {/* Top Staircase Film Titles (Screenshot 1) */}
        <div className="about-struct-tx px-6 md:px-12 max-w-7xl mx-auto w-full">
          {aboutCategories.staircase.map((cat, idx) => {
            const xStyles = [xLine1, xLine2, xLine3, xLine4];
            const classNames = ['about-title-tx-1', 'about-title-tx-2', 'about-title-tx-3', 'about-title-tx-4'];
            return (
              <motion.div
                key={cat}
                className={classNames[idx]}
                style={{ x: xStyles[idx] }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              >
                {cat}
              </motion.div>
            );
          })}
        </div>

        {/* Small text description lines (Screenshot 1 center/right) */}
        <div className="about-sm-text">
          <div className="about-small-text-wrap space-y-2">
            {aboutDescription.map((line, idx) => (
              <motion.div 
                key={idx}
                className="about-small-text-line"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
              >
                <span>{line[0]}</span>
                <span>{line[1]}</span>
                <span>{line[2]}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Major Category Blocks (Screenshot 2 Top) */}
        <div className="about-md-text">
          <div className="div-block-12">
            <div className="div-block-11">
              <motion.div
                style={{ x: xTelevision }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              >
                {aboutCategories.middle[0]}
              </motion.div>
              <motion.div
                style={{ x: xFilms }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              >
                {aboutCategories.middle[1]}
              </motion.div>
            </div>
            
            <div className="div-block-11 pl-0 md:pl-20">
              <motion.div 
                className="_5-line"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
              />
              <motion.div
                style={{ x: xDocumentary }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              >
                {aboutCategories.middle[2]}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Big ELEPHANT block with rightside film list & metadata (Screenshot 2 bottom) */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col gap-12 items-center relative overflow-hidden">
          {/* ELEPHANT Massive Logo text */}
          <div className="w-full flex justify-center lg:justify-start">
            <motion.h2 
              className="text-block-9 select-none"
              style={{ x: xElephant }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              ELEPHANT
            </motion.h2>
          </div>

          {/* Right side Film list and small coordinate structural text */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 lg:pl-12">
            {/* Film list */}
            <div className="about-struct-tx items-center lg:items-start">
              {aboutCategories.bottom.map((cat, idx) => {
                const xStyles = [xAna, xFreud, xKafka];
                const classNames = ['about-title-tx-1', 'about-title-tx-6', 'about-title-tx-5'];
                return (
                  <motion.div
                    key={cat}
                    className={classNames[idx]}
                    style={{ x: xStyles[idx] }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 + idx * 0.1 }}
                  >
                    {cat}
                  </motion.div>
                );
              })}
            </div>

            {/* Small coordinate block */}
            <motion.div 
              className="about-small-struct text-center lg:text-left"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
              {aboutTaglines.map((tag, i) => (
                <div key={i}>{tag}</div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Who We Are Section */}
      <section className="py-20 px-6 md:px-12 border-t border-elephant-ivory/10 bg-[#000000]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Ticket Section Header */}
          <div className="flex justify-center mb-10">
            <motion.div 
              className="bg-[#FAF7EF] text-[#000000] font-mono text-[9px] font-bold tracking-widest px-6 py-2 rounded shadow-sm uppercase"
              style={{ clipPath: 'url(#ticketMaskLarge)' }}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              OUR PORTFOLIO
            </motion.div>
          </div>

          {/* Why Choose Us & Services Grid */}
          <div className="grid grid-cols-1 gap-12">
            
            {/* Why Choose Us */}
            <div className="border border-dashed border-elephant-ivory/20 bg-[#000000] rounded-xl p-8 md:p-12 flex flex-col gap-6 items-start shadow-md">
              <div>
                <motion.span 
                  className="font-mono text-[8px] font-bold tracking-widest text-elephant-red uppercase block"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  WHY US
                </motion.span>
                <h3 className="font-serif text-3xl md:text-5xl font-extrabold uppercase tracking-widest leading-[1] text-elephant-ivory mt-2 mb-6">
                  <DecryptedText text="Why Choose" delay={200} /><br/>
                  <DecryptedText text="Elephant Productions?" delay={400} />
                </h3>
              </div>
              
              <ul className="space-y-4 font-sans text-sm md:text-base text-elephant-ivory/80 leading-relaxed list-none">
                {whyUs.map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  >
                    <span className="text-elephant-red mr-3 mt-0.5">•</span> {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Our Services */}
            <div className="border border-dashed border-elephant-ivory/20 bg-[#000000] rounded-xl p-8 md:p-12 flex flex-col gap-6 items-start shadow-md">
              <div>
                <motion.span 
                  className="font-mono text-[8px] font-bold tracking-widest text-elephant-red uppercase block"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  EXPERTISE
                </motion.span>
                <h3 className="font-serif text-3xl md:text-5xl font-extrabold uppercase tracking-widest leading-[1] text-elephant-ivory mt-2 mb-4">
                  <DecryptedText text="Our Services" delay={300} />
                </h3>
                <p className="font-sans text-sm md:text-base text-elephant-ivory/70 leading-relaxed mb-6">
                  We offer a complete range of photography and videography services, including:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 font-sans text-sm md:text-base text-elephant-ivory/80 leading-relaxed w-full">
                {services.map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + (i % 5) * 0.05 }}
                  >
                    <span className="text-elephant-red mr-3 mt-0.5">•</span> {item}
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Collaborations Section ("FESTIVAL RECOGNITION" - Missing Section Match) */}
      <section className="py-20 px-6 md:px-12 border-t border-elephant-ivory/10 bg-elephant-black/25">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex justify-center mb-10">
            <motion.div 
              className="bg-[#FAF7EF] text-[#000000] font-mono text-[9px] font-bold tracking-widest px-6 py-2 rounded shadow-sm uppercase"
              style={{ clipPath: 'url(#ticketMaskLarge)' }}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              FESTIVAL RECOGNITION
            </motion.div>
          </div>

          {/* Collaborators Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {collaborators.map((collab, idx) => (
              <div 
                key={idx}
                className="border border-dashed border-elephant-ivory/20 bg-[#000000] rounded-lg p-6 flex flex-col justify-between aspect-[4/3] text-center shadow-md relative group hover:border-elephant-red/40 transition-colors"
              >
                <motion.span 
                  className="font-mono text-[8px] text-elephant-red uppercase tracking-widest block mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.8 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  {collab.type}
                </motion.span>
                
                <h3 className="font-serif text-lg md:text-xl font-extrabold uppercase tracking-widest text-elephant-ivory py-4 border-y border-elephant-ivory/5 my-2 break-words hyphens-auto">
                  <DecryptedText text={collab.name} delay={150 * idx} />
                </h3>

                <motion.span 
                  className="font-mono text-[8px] text-elephant-ivory/30 uppercase tracking-widest block mt-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 + 0.2 }}
                >
                  OFFICIAL SELECTION
                </motion.span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Spherical Collage Grid Section (Image 5) */}
      <section className="relative w-full overflow-hidden bg-transparent border-t border-elephant-ivory/10">
        {isLive ? (
          // On the live Webflow site, keep this section transparent and sized, 
          // allowing Webflow's background WebGL sphere canvas to shine through.
          <div className="h-[650px] w-full bg-transparent animate-pulse" />
        ) : (
          // Fallback stills grid for local development
          <div className="py-20 bg-[#000000]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
              <span className="font-mono text-[9px] font-bold tracking-widest text-elephant-red uppercase block">
                COLLABORATIONS STiLLS (LOCAL DEV FALLBACK)
              </span>
            </div>
            
            {/* Spherical skewed grid */}
            <div className="flex justify-center items-center py-6 overflow-x-auto mask-fade-x-1">
              <div 
                className="grid grid-cols-6 gap-3 shrink-0 w-[960px] md:w-[1200px]"
                style={{
                  transform: 'perspective(800px) rotateY(-5deg) rotateX(2deg)',
                }}
              >
                {(galleryImages.length > 0 ? galleryImages : films.map(f => f.stillImage).filter(Boolean)).slice(0, 18).map((src, idx) => (
                  <motion.div
                    key={idx}
                    className="coin-fill-container relative aspect-square bg-elephant-ivory/5 rounded-md overflow-hidden border border-elephant-ivory/10 shadow-md group"
                    whileHover={{ scale: 1.04, zIndex: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Grayscale Base Image */}
                    <Image
                      src={src}
                      alt={`Collage Still ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 33vw, 200px"
                      className="object-cover grayscale brightness-95"
                    />

                    {/* Color Overlay (Coin Fill) */}
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 33vw, 200px"
                      className="coin-fill-color object-cover brightness-95"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 7. Cinematic "Our Films" Banner (Screenshot 3 / cta-frame) */}
      <section className="relative w-full h-[65vh] overflow-hidden flex flex-col justify-center items-center text-center bg-elephant-black border-t border-elephant-ivory/10">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/assets/6761a2bf91a62d459886fa28_cta-frame.avif"
            alt="CTA Frame Backdrop"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#000000]/40" />
        </div>

        <div className="relative z-10 space-y-6">
          <h2 className="font-serif text-5xl md:text-7xl font-extrabold tracking-widest uppercase text-elephant-ivory">
            <DecryptedText text="OUR PORTFOLIO" />
          </h2>
          
          <div className="flex justify-center">
            <Link
              href="/work"
              className="flex h-10 bg-[#FAF7EF] border border-[#000000]/15 rounded shadow-lg items-center px-6 hover:bg-[#FAF7EF]/90 transition-colors text-[#000000]"
              style={{ clipPath: 'url(#ticketMaskLarge)' }}
              data-cursor-text="WORK"
            >
              <span className="font-mono text-[9px] font-bold tracking-widest mr-2">
                EXPLORE
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 11 10"
                className="h-3 w-3"
              >
                <path
                  fill="currentColor"
                  d="M4.481.005a6.65 6.65 0 0 1 6.46 4.659c.078.229.08.479-.003.706C10.302 7.105 8.318 10 4.48 10V8.39c.941.127 2.922-.257 4.442-2.603H0V4.208h8.938c-.756-1.229-2.216-2.78-4.457-2.78V.006Z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Shared Footer component */}
      <Footer />

    </div>
  );
}
