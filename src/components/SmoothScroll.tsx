'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import VirtualScroll from 'virtual-scroll';
import { useMotionValue } from 'framer-motion';
import { ScrollProgressContext } from './ScrollContext';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const targetY = useRef(0);
  const currentY = useRef(0);
  const rafRef = useRef<number>(0);
  const pathname = usePathname();
  const scrollProgress = useMotionValue(0);

  const disableScroll = pathname === '/work' || pathname === '/';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (disableScroll) {
      currentY.current = 0;
      targetY.current = 0;
      scrollProgress.set(0);
      if (contentRef.current) {
        contentRef.current.style.transform = '';
      }
      return;
    }

    const scroller = new VirtualScroll({
      mouseMultiplier: 0.9,
      touchMultiplier: 2.0,
      firefoxMultiplier: 15,
      preventTouch: false
    });

    scroller.on((e) => {
      const limit = contentRef.current ? contentRef.current.scrollHeight - window.innerHeight : 0;
      targetY.current = Math.min(Math.max(targetY.current - e.deltaY, 0), limit);
      startLoop();
    });

    let isLooping = false;

    const update = () => {
      currentY.current = currentY.current + (targetY.current - currentY.current) * 0.08;

      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, ${-currentY.current}px, 0)`;

        const limit = contentRef.current.scrollHeight - window.innerHeight;
        scrollProgress.set(limit > 0 ? currentY.current / limit : 0);
      }

      if (Math.abs(targetY.current - currentY.current) < 0.05) {
        currentY.current = targetY.current;
        if (contentRef.current) {
          contentRef.current.style.transform = `translate3d(0, ${-currentY.current}px, 0)`;

          const limit = contentRef.current.scrollHeight - window.innerHeight;
          scrollProgress.set(limit > 0 ? currentY.current / limit : 0);
        }
        isLooping = false;
        return;
      }

      rafRef.current = requestAnimationFrame(update);
    };

    function startLoop() {
      if (isLooping) return;
      isLooping = true;
      rafRef.current = requestAnimationFrame(update);
    }

    return () => {
      scroller.destroy();
      cancelAnimationFrame(rafRef.current);
      isLooping = false;
    };
  }, [disableScroll, pathname, scrollProgress]);

  // On page navigation, snap scroll back to top
  useEffect(() => {
    targetY.current = 0;
    currentY.current = 0;
    scrollProgress.set(0);
    if (contentRef.current) {
      contentRef.current.style.transform = 'translate3d(0, 0px, 0)';
    }
  }, [pathname, scrollProgress]);

  return (
    <ScrollProgressContext.Provider value={scrollProgress}>
      <div className={`fixed inset-0 w-screen h-screen ${disableScroll ? 'overflow-y-auto overflow-x-hidden' : 'overflow-hidden'}`}>
        <div ref={contentRef} className={`w-full${disableScroll ? '' : ' will-change-transform'}`}>
          {children}
        </div>
      </div>
    </ScrollProgressContext.Provider>
  );
}
