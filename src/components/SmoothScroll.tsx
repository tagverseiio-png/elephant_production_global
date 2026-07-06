'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import VirtualScroll from 'virtual-scroll';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const targetY = useRef(0);
  const currentY = useRef(0);
  const pathname = usePathname();

  const disableScroll = pathname === '/work' || pathname === '/';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scroller = new VirtualScroll({
      mouseMultiplier: 0.9,
      touchMultiplier: 2.0,
      firefoxMultiplier: 15,
      preventTouch: false
    });

    scroller.on((e) => {
      if (disableScroll) return;

      const limit = contentRef.current ? contentRef.current.scrollHeight - window.innerHeight : 0;
      targetY.current = Math.min(Math.max(targetY.current - e.deltaY, 0), limit);
    });

    let animationFrameId: number;

    const update = () => {
      if (disableScroll) {
        currentY.current = 0;
        targetY.current = 0;
        if (contentRef.current) {
          contentRef.current.style.transform = 'translate3d(0, 0px, 0)';
        }
      } else {
        currentY.current = currentY.current + (targetY.current - currentY.current) * 0.08;
        if (Math.abs(targetY.current - currentY.current) < 0.05) {
          currentY.current = targetY.current;
        }

        if (contentRef.current) {
          contentRef.current.style.transform = `translate3d(0, ${-currentY.current}px, 0)`;
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      scroller.destroy();
      cancelAnimationFrame(animationFrameId);
    };
  }, [disableScroll, pathname]);

  // On page navigation, snap scroll back to top
  useEffect(() => {
    targetY.current = 0;
    currentY.current = 0;
    if (contentRef.current) {
      contentRef.current.style.transform = 'translate3d(0, 0px, 0)';
    }
  }, [pathname]);

  return (
    <div className={`fixed inset-0 w-screen h-screen ${disableScroll ? 'overflow-y-auto overflow-x-hidden' : 'overflow-hidden'}`}>
      <div ref={contentRef} className="w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
