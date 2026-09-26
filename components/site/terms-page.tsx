'use client';

import { motion } from 'framer-motion';

const SECTIONS: { h: string; b: string[] }[] = [
  {
    h: '1. Who you are booking with',
    b: [
      'Singapore and Malaysia bookings are with THE ELEPHANT PRODUCTION (SG UEN: 53444987E), 7A Cuff Road, Little India, Singapore 209718. India bookings (Chennai, Karaikudi) are with ELEPHANT PRODUCTION CHENNAI PRIVATE LIMITED, Habibullah Road, T.Nagar, Chennai 600017.',
    ],
  },
  {
    h: '2. Booking & payments',
    b: [
      'Your date is blocked only after you accept our proposal and pay the booking advance. The balance follows the schedule in your proposal and is due before delivery of the final gallery, album and film.',
      'Packages are customized by hours, functions and deliverables — what is included for your date is exactly what your signed proposal lists.',
    ],
  },
  {
    h: '3. What is included',
    b: [
      'Coverage hours, candid + traditional photography, cinematic film, same-day edit where offered, and premium albums as per your package. Standard delivery is an online gallery plus album and film within 4-6 weeks of your last function.',
    ],
  },
  {
    h: '4. Your responsibilities',
    b: [
      'Share accurate dates, venues and function schedules, and arrange venue or temple/church permissions for photography where needed. Please let us know about restrictions, muhurtham timings or customs we should plan around.',
    ],
  },
  {
    h: '5. Creative & usage rights',
    b: [
      'Copyright in the photos and films stays with Elephant Production. You receive a personal-use license to share, print and display your images. Commercial or vendor use needs our prior written okay.',
      'We may feature selected work in our portfolio and socials only with your consent — tell us anytime if you prefer we do not.',
    ],
  },
  {
    h: '6. Delays & events beyond control',
    b: [
      'We deliver on time and keep you updated. If delay or disruption comes from events outside our control (weather, venue issues, travel disruption, illness), we will reschedule or adjust delivery fairly and keep you informed.',
    ],
  },
  {
    h: '7. Liability',
    b: [
      'If something goes wrong on our side, our liability is limited to the fees you paid for the affected booking. Please see our Cancellation & Refunds page for date changes and refunds.',
    ],
  },
  {
    h: '8. Governing terms',
    b: [
      'Singapore/Malaysia bookings follow Singapore law; India bookings follow Indian law. Questions? Write to hello@elephantproduction.com — Singapore/Malaysia +65 93515143, Chennai/Karaikudi +91 8012248366.',
    ],
  },
];

export default function TermsPage() {
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
          Terms of
          <br />
          Service.
        </h1>
        <p className="text-[11px] font-medium text-[#888] leading-relaxed tracking-wide mb-16">
          Last updated: September 2026. The plain version — your proposal is
          the contract: date blocked on advance, delivery in 4-6 weeks, no
          hidden costs.
        </p>

        <div className="flex flex-col">
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
      </div>
    </motion.div>
  );
}
