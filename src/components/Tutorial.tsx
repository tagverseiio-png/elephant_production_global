'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TutorialProps {
  onDismiss: () => void;
}

export default function Tutorial({ onDismiss }: TutorialProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[990] flex items-center justify-center bg-elephant-black/90 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative flex max-w-4xl w-full flex-col items-center md:flex-row md:items-stretch gap-8 rounded-2xl border border-elephant-ivory/10 bg-elephant-black p-6 md:p-10">
        
        {/* Tutorial Video Player */}
        <div className="relative flex-1 aspect-video md:aspect-auto rounded-lg overflow-hidden border border-elephant-ivory/10 bg-black">
          <video
            className="h-full w-full object-cover"
            src="/assets/tutorial-final.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Tutorial Instructions Text */}
        <div className="flex flex-1 flex-col justify-between gap-6">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl italic tracking-wide text-elephant-ivory">
              Cinematic Navigation
            </h3>
            
            <ul className="space-y-4">
              {[
                { label: 'DRAG', text: 'Hold and drag to navigate the content' },
                { label: 'SCROLL', text: 'Scroll mouse wheel to glide through the films' },
                { label: 'QUICK NAV', text: 'Click on the left dots/ticket to quick-jump to films' },
                { label: 'MENU', text: 'Use the right hamburger for sitemap, about & contact' },
                { label: 'EXPLORE', text: 'Click explore to view case studies, trailers & reviews' }
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                >
                  <span className="mt-1 flex h-4 w-16 shrink-0 items-center justify-center rounded border border-elephant-red/40 bg-elephant-red/5 font-sans text-[8px] font-bold tracking-widest text-elephant-red">
                    {item.label}
                  </span>
                  <p className="font-sans text-xs text-elephant-ivory/80 leading-relaxed">
                    {item.text}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.button
            onClick={onDismiss}
            className="w-full rounded border border-elephant-ivory/20 bg-elephant-ivory px-6 py-3 font-sans text-xs font-bold tracking-widest text-elephant-black transition-all hover:bg-transparent hover:text-elephant-ivory hover:border-elephant-ivory"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-cursor-text="CLOSE"
          >
            DISMISS GUIDE
          </motion.button>
        </div>

      </div>
    </motion.div>
  );
}
