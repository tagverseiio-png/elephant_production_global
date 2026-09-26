'use client';

import { processBg } from '@/lib/data';

export default function ProcessSection() {
  return (
    <section className="w-full relative h-screen min-h-[700px] overflow-hidden flex flex-col justify-center bg-[#111]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={processBg}
        alt="Elephant Production team consultation for Indian wedding photography in Singapore and Chennai"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        style={{ filter: 'grayscale(40%)' }}
      />

      {/* Top Labels */}
      <div className="absolute top-8 left-6 right-6 md:top-12 md:left-12 md:right-12 flex justify-between text-white text-[10px] font-medium z-10 items-start tracking-wide">
        <span className="max-w-[150px] leading-relaxed drop-shadow-md">
          How does booking Elephant Production work? Consult to delivery in 4-6
          weeks.
        </span>
        <span className="hidden md:block drop-shadow-md">
          From first idea to final execution
        </span>
        <span className="font-bold drop-shadow-md text-xs">(06)</span>
      </div>

      {/* Stacked White Cards */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full mt-12">
        <div className="bg-white w-[260px] md:w-[320px] py-4 shadow-lg text-center font-bold text-lg md:text-xl tracking-tight text-[#111] z-10 transform translate-y-6">
          Consult &amp; Proposal
        </div>
        <div className="bg-white w-[280px] md:w-[340px] py-4 shadow-lg text-center font-bold text-lg md:text-xl tracking-tight text-[#111] z-20 transform translate-y-3">
          Shoot — Candid + Traditional
        </div>
        <div className="bg-white w-[300px] md:w-[360px] p-8 shadow-2xl z-30 flex flex-col text-left">
          <h3 className="font-bold text-xl md:text-2xl mb-6 tracking-tight text-[#111]">
            Edit &amp; Deliver
          </h3>
          <p className="text-[10px] text-[#666] leading-[1.6] mb-6 font-medium tracking-wide">
            WhatsApp us your date, venue, function. We send curated package +
            timeline. Our team captures candid + traditional, color graded,
            cinematic, skin-tone perfect.
          </p>
          <p className="text-[10px] text-[#111] font-bold leading-[1.6] tracking-wide">
            Online gallery + album + film in 4-6 weeks. On-time delivery, no
            hidden costs.
          </p>
        </div>
      </div>
    </section>
  );
}
