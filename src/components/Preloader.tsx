'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { playClick, playHover } from '@/utils/audio';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [showEnter, setShowEnter] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const proximity = useMotionValue(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showEnter) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const btnX = rect.left + rect.width / 2;
      const btnY = rect.top + rect.height / 2;
      const dx = e.clientX - btnX;
      const dy = e.clientY - btnY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const maxDistance = 300;
      const minDistance = 30;
      if (distance > maxDistance) {
        proximity.set(0);
      } else if (distance < minDistance) {
        proximity.set(1);
      } else {
        const factor = (maxDistance - distance) / (maxDistance - minDistance);
        proximity.set(factor);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showEnter, proximity]);

  const boxShadow = useTransform(proximity, (p) => {
    const glowStrength = p * 20;
    const glowOpacity = p * 0.45;
    return p > 0 
      ? `0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 0 ${glowStrength}px rgba(255, 255, 255, ${glowOpacity})`
      : `0 10px 25px -5px rgba(0, 0, 0, 0.25)`;
  });

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-8, 8]), springConfig);

  const glareX = useSpring(useTransform(tiltX, [-0.5, 0.5], [10, 90]), springConfig);
  const glareY = useSpring(useTransform(tiltY, [-0.5, 0.5], [10, 90]), springConfig);

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(x);
    tiltY.set(y);
  };

  const handleButtonMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255, 255, 255, 0.75) 0%, transparent 60%)`
  );

  useEffect(() => {
    // Show enter button after a short delay or when video ends
    const timer = setTimeout(() => {
      setShowEnter(true);
    }, 2500); // Intro video is around 3-4s, show enter button early so users aren't blocked

    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnded = () => {
    setShowEnter(true);
  };

  const handleEnterClick = () => {
    playClick();
    sessionStorage.setItem('elephant_skip_intro', 'true');
    window.dispatchEvent(new CustomEvent('elephant-preloader-complete'));
    onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-elephant-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] as const } }}
    >
      <div className="relative h-full w-full overflow-hidden">
        {/* Solid Black Background */}
        <div className="absolute inset-0 z-0 bg-black" />

        {/* Large Intro Logo */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <motion.img 
            src="/logo.png"
            alt="Elephant"
            className="w-[60vw] sm:w-[40vw] max-w-2xl object-contain drop-shadow-2xl"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          />
        </div>

        {/* Centered Enter Button Overlay */}
        <AnimatePresence>
          {showEnter && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-end pb-16 bg-elephant-black/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                ref={buttonRef}
                onClick={handleEnterClick}
                onMouseEnter={() => {
                  playHover();
                  setIsHovered(true);
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                  handleButtonMouseLeave();
                }}
                onMouseMove={handleButtonMouseMove}
                className="group relative flex h-14 w-52 items-center justify-between px-6"
                style={{ 
                  clipPath: 'url(#preloaderTicketMask)',
                  boxShadow,
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  backgroundColor: isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0)',
                  color: isHovered ? '#000000' : '#FFFFFF',
                }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.03 }}
                data-cursor-text="ENTER"
              >
                {/* Dynamic Glare Effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay opacity-45"
                  style={{ background: glareBg }}
                />

                {/* Ticket SVG Border Outline */}
                <div className="absolute inset-0 pointer-events-none z-20">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.path
                      d="M 0,3 A 3,3 0 0,1 3,0 L 97,0 A 3,3 0 0,1 100,3 L 100,43 A 4,4 0 0,0 100,57 L 100,97 A 3,3 0 0,1 97,100 L 3,100 A 3,3 0 0,1 0,97 L 0,57 A 4,4 0 0,0 0,43 Z"
                      fill="none"
                      animate={{
                        stroke: isHovered ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.35)'
                      }}
                      transition={{ duration: 0.2 }}
                      strokeWidth="0.5"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
                
                {/* Left side: Enter Text */}
                <motion.span
                  animate={{ color: isHovered ? '#000000' : '#FFFFFF' }}
                  transition={{ duration: 0.2 }}
                  className="font-mono text-xs font-black tracking-widest uppercase z-10"
                >
                  ENTER
                </motion.span>

                {/* Vertical Tear-off Dashed Line */}
                <motion.div
                  animate={{
                    borderColor: isHovered ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.3)'
                  }}
                  transition={{ duration: 0.2 }}
                  className="h-8 border-r border-dashed mx-2 z-10"
                />

                {/* Right side: Vector Barcode & ID stub */}
                <div className="flex items-center gap-2 z-10">
                  <motion.svg
                    animate={{
                      color: isHovered ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.75)'
                    }}
                    transition={{ duration: 0.2 }}
                    className="h-5 w-10 opacity-75"
                    fill="currentColor"
                    viewBox="0 0 40 20"
                  >
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
                  </motion.svg>
                  <motion.span
                    animate={{
                      color: isHovered ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.45)'
                    }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-[7px] font-bold rotate-90 origin-center translate-x-1"
                  >
                    004
                  </motion.span>
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Local SVG clip path for the preloader ticket button */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <clipPath id="preloaderTicketMask" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.03 A 0.03,0.03 0 0,0 0.03,0 L 0.97,0 A 0.03,0.03 0 0,0 1,0.03 L 1,0.43 A 0.04,0.04 0 0,0 1,0.57 L 1,0.97 A 0.03,0.03 0 0,0 0.97,1 L 0.03,1 A 0.03,0.03 0 0,0 0,0.97 L 0,0.57 A 0.04,0.04 0 0,0 0,0.43 Z" />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
}
