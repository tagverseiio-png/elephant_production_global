'use client';

import { motion } from 'framer-motion';

const SECTIONS: { h: string; b: string[] }[] = [
  {
    h: '1. Who we are',
    b: [
      'Elephant Production is operated by THE ELEPHANT PRODUCTION (SG UEN: 53444987E), 7A Cuff Road, Little India, Singapore 209718, and ELEPHANT PRODUCTION CHENNAI PRIVATE LIMITED, Habibullah Road, T.Nagar, Chennai 600017. Contact us at hello@elephantproduction.com — Singapore/Malaysia +65 93515143, Chennai/Karaikudi +91 8012248366.',
    ],
  },
  {
    h: '2. What we collect',
    b: [
      'Booking inquiries: your name, email, phone, event date, venue and anything you share about your function.',
      'Shoot deliverables: the photos and films we create for you under your booking.',
      'Basic site data: device, browser and pages visited, used only to keep the site working and improve it.',
    ],
  },
  {
    h: '3. How we use it',
    b: [
      'To respond to inquiries, prepare proposals and manage your booking.',
      'To deliver your gallery, album and film, and coordinate shoot logistics.',
      'To showcase selected work in our portfolio and socials only with your consent — you can opt out anytime.',
    ],
  },
  {
    h: '4. Sharing',
    b: [
      'We never sell your personal data. We share it only with service providers who help us deliver (e.g. gallery hosting, album printing labs) and where required by law.',
    ],
  },
  {
    h: '5. Cookies',
    b: [
      'This site uses minimal functional cookies and, where enabled, basic privacy-friendly analytics. You can block cookies in your browser settings; the site will still work.',
    ],
  },
  {
    h: '6. Retention',
    b: [
      'Inquiry records are kept while your booking is active and for a reasonable period afterwards for support and accounts. Delivered galleries are archived so we can help with reprints and recovery requests.',
    ],
  },
  {
    h: '7. Your rights',
    b: [
      'You may ask for access, correction or deletion of your personal data at hello@elephantproduction.com. We handle requests in line with Singapore\u2019s PDPA for Singapore/Malaysia bookings and India\u2019s DPDP Act for India bookings.',
    ],
  },
];

export default function PrivacyPage() {
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
          Privacy
          <br />
          Policy.
        </h1>
        <p className="text-[11px] font-medium text-[#888] leading-relaxed tracking-wide mb-16">
          Last updated: September 2026. Short version — your details are used
          only to run your booking, never sold, and you can ask us to correct
          or delete them anytime.
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
