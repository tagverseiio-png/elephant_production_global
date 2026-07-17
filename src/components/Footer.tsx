'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { footerSitemap, footerTags, socialLinks, legalLinks, emails } from '@/data/contact';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="bg-elephant-black text-elephant-ivory px-6 md:px-12 py-16 mt-20 border-t border-elephant-ivory/10 select-none">
      
      {/* 1. Large Top Footer Banner (Production / Documentary / Film TV) */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-elephant-ivory/10 pb-12 mb-12 gap-6">
        <img 
          src="/logo.png" 
          alt="Elephant Productions" 
          className="h-16 md:h-20 w-auto object-contain opacity-40 invert brightness-0" 
        />
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {footerTags.map((item) => (
            <span key={item} className="font-mono text-[9px] font-bold tracking-widest text-elephant-ivory/80">
              {"//"} {item}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Middle Footer: Newsletter and Sitemap grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        
        {/* Newsletter subscription form (6 cols) */}
        <div className="md:col-span-6 space-y-4">
          <h3 className="font-serif text-xl italic text-elephant-ivory/90">
            Stay up to date with our releases
          </h3>
          {subscribed ? (
            <div className="flex items-center gap-3 border-b border-elephant-ivory/20 pb-2 max-w-md w-full">
              {/* Checkmark icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-elephant-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="font-mono text-[10px] font-bold tracking-widest text-elephant-ivory/70 uppercase">
                You&apos;re subscribed. Thank you.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex max-w-md w-full gap-2 border-b border-elephant-ivory/20 pb-2">
              <input
                type="email"
                placeholder="Your email address"
                required
                className="flex-1 bg-transparent px-2 py-1.5 font-sans text-xs text-elephant-ivory outline-none placeholder:text-elephant-ivory/30"
              />
              <button
                type="submit"
                className="font-mono text-[10px] font-bold tracking-widest text-elephant-red hover:text-elephant-ivory transition-colors"
                data-cursor-text="SUBMIT"
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>

        {/* Sitemap list (3 cols) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-mono text-[9px] font-bold tracking-widest text-elephant-ivory/40 uppercase">
            SITEMAP
          </h4>
          <ul className="space-y-2">
            {footerSitemap.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-serif text-sm font-medium text-elephant-ivory/80 hover:text-elephant-red hover:italic hover:translate-x-1 inline-block transition-all"
                  data-cursor="hover"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact links (3 cols) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-mono text-[9px] font-bold tracking-widest text-elephant-ivory/40 uppercase">
            CONTACT US
          </h4>
          <div className="space-y-3">
            {emails.map((email) => (
              <div key={email.label}>
                <span className="font-mono text-[8px] text-elephant-ivory/50 block">{email.label}</span>
                <a href={`mailto:${email.address}?subject=Website%20Inquiry`} className="font-sans text-xs font-semibold text-elephant-ivory hover:text-elephant-red underline" data-cursor="hover">
                  {email.address.toUpperCase()}
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. Bottom Footer: Socials and Legal Links */}
      <div className="flex flex-col md:flex-row items-center justify-between border-t border-elephant-ivory/10 pt-8 text-[10px] font-mono text-elephant-ivory/40 gap-6 md:gap-4 text-center md:text-left">
        <div className="flex gap-4">
          <span className="text-elephant-ivory/50">Follow us:</span>
          {socialLinks.map((social) => (
            <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-elephant-ivory" data-cursor="hover" aria-label={`Follow us on ${social.label}`}>{social.label}</a>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
          <span>© {new Date().getFullYear()} Elephant. All Rights Reserved.</span>
          <span className="hidden md:inline">•</span>
          <div className="flex items-center justify-center gap-2">
            {legalLinks.map((item, idx) => (
              <React.Fragment key={item.href}>
                {idx > 0 && <span>•</span>}
                <Link href={item.href} className="hover:text-elephant-ivory" data-cursor="hover">{item.label.charAt(0) + item.label.slice(1).toLowerCase()}</Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
