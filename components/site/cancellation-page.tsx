'use client';

import { motion } from 'framer-motion';

const SECTIONS: { h: string; b: string[] }[] = [
  {
    h: '1. Booking advance',
    b: [
      'The booking advance blocks your date and turns away other inquiries, so it is non-refundable. Any amount paid above the advance follows the slabs below.',
    ],
  },
  {
    h: '2. Cancellation slabs',
    b: [
      'More than 60 days before the event: we refund everything paid above the booking advance.',
      '30-60 days before the event: 50% of the package fee is payable; anything paid above that is refunded.',
      'Less than 30 days before the event: the full package fee is payable as your team and date were fully reserved.',
    ],
  },
  {
    h: '3. Rescheduling',
    b: [
      'One date change is free with 30+ days notice, subject to availability — your payments move to the new date. Destination bookings: travel already ticketed or booked cannot be refunded, only adjusted where the vendor allows.',
    ],
  },
  {
    h: '4. If we cancel',
    b: [
      'If we ever cannot cover your date and cannot arrange an equivalent Team Elephant Production crew you accept, we refund everything you paid — including the advance.',
    ],
  },
  {
    h: '5. How refunds work',
    b: [
      'Approved refunds go back to the original payment method within 7-14 business days. To request, email hello@elephantproduction.com with your name, event date and booking reference.',
    ],
  },
];

export default function CancellationPage({ onContact }: { onContact: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen pt-32 pb-32 bg-white"
    >
      <div className="px-6 md:px-12 max-w-4xl">
        <span className="text-[10px] text-[#888] font-bold tracking-widest uppercase flex items-center gap-4 mb-8">
          <span className="w-8 h-[1px] bg-[#ddd] block" />
          Legal
        </span>
        <h1 className="text-[12vw] md:text-[6vw] font-black tracking-[-0.05em] leading-[0.9] text-[#111] uppercase font-oswald mb-6">
          Cancellation
          <br />
          & Refunds.
        </h1>
        <p className="text-[11px] font-medium text-[#888] leading-relaxed tracking-wide mb-16">
          Last updated: September 2026. Short version — the advance is
          non-refundable because your date is blocked; everything else follows
          fair slabs, and one reschedule is free.
        </p>

        <div className="flex flex-col mb-16">
          {SECTIONS.map((s) => (
            <div
              key={s.h}
              className="border-t border-gray-200 py-8 last:border-b"
            >
              <h2 className="text-base md:text-xl font-bold tracking-tight text-[#111] mb-4">
                {s.h}
              </h2>
              {s.b.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="text-[12px] md:text-sm text-[#666] leading-[1.9] tracking-wide mb-3 last:mb-0"
                >
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="bg-[#111] text-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] uppercase tracking-widest font-bold text-white/60">
              Need to move your date?
            </span>
            <span className="text-xl md:text-2xl font-bold tracking-tight">
              Talk to us before cancelling.
            </span>
            <span className="text-[11px] text-white/70 leading-[1.8]">
              Rescheduling is free with 30+ days notice, subject to
              availability.
            </span>
          </div>
          <button
            onClick={onContact}
            className="bg-white text-[#111] px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:px-12 transition-all duration-500 shrink-0"
          >
            Contact Us &rarr;
          </button>
        </div>
      </div>
    </motion.div>
  );
}
