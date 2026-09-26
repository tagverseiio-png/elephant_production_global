'use client';

import { useState, useEffect } from 'react';
import type { Region } from '@/lib/region';
import { useRegionContext } from '@/components/site/region-context';
import logo from '@/components/assets/logo.png';

type Page =
  | 'home'
  | 'about'
  | 'services'
  | 'service-detail'
  | 'locations'
  | 'location-detail'
  | 'faq'
  | 'work'
  | 'work-detail'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'cancellation';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const { region, setRegion } = useRegionContext();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-6 md:px-12 py-6 md:py-8 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none transition-all duration-500 ${
        scrolled ? 'py-4 md:py-5' : ''
      }`}
    >
      <div
        onClick={() => onNavigate('home')}
        className="tracking-[-0.02em] pointer-events-auto cursor-pointer hover:opacity-70 transition-opacity"
      >
        <img className="w-28 md:w-26" src={logo.src} alt="Logo" />
      </div>
      <div className="flex gap-4 md:gap-8 text-[11px] uppercase tracking-[0.05em] font-medium pointer-events-auto items-center">
        <button
          onClick={() => onNavigate('about')}
          className={`hover:opacity-60 transition-opacity hidden md:block ${
            currentPage === 'about' ? 'opacity-100' : 'opacity-60'
          }`}
        >
          About
        </button>
        <button
          onClick={() => onNavigate('services')}
          className={`hover:opacity-60 transition-opacity ${
            currentPage === 'services' || currentPage === 'service-detail'
              ? 'opacity-100'
              : 'opacity-60'
          }`}
        >
          Services
        </button>
        <button
          onClick={() => onNavigate('locations')}
          className={`hover:opacity-60 transition-opacity hidden md:block ${
            currentPage === 'locations' || currentPage === 'location-detail'
              ? 'opacity-100'
              : 'opacity-60'
          }`}
        >
          Studios
        </button>
        <button
          onClick={() => onNavigate('work')}
          className={`hover:opacity-60 transition-opacity ${
            currentPage === 'work' || currentPage === 'work-detail'
              ? 'opacity-100'
              : 'opacity-60'
          }`}
        >
          Work
        </button>
        <button
          onClick={() => onNavigate('faq')}
          className={`hover:opacity-60 transition-opacity hidden md:block ${
            currentPage === 'faq' ? 'opacity-100' : 'opacity-60'
          }`}
        >
          FAQ
        </button>
        <button
          onClick={() => onNavigate('contact')}
          className={`hover:opacity-60 transition-opacity ${
            currentPage === 'contact' ? 'opacity-100' : 'opacity-60'
          }`}
        >
          Contact
        </button>
        <span className="hidden sm:flex items-center gap-2 opacity-60">
          <span className="w-4 h-[1px] bg-white/40" />
          {(Object.keys({ SG: 1, IN: 1, MY: 1 }) as Region[]).map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              aria-pressed={region === r}
              title={r === 'SG' ? 'Singapore' : r === 'IN' ? 'India — Chennai' : 'Malaysia'}
              className={`hover:opacity-100 transition-opacity ${
                region === r ? 'opacity-100 underline underline-offset-4' : 'opacity-60'
              }`}
            >
              {r}
            </button>
          ))}
        </span>
      </div>
    </nav>
  );
}
