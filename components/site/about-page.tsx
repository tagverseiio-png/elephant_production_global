'use client';

import { motion } from 'framer-motion';
import { REGION_META } from '@/lib/region';
import { useRegionContext } from '@/components/site/region-context';

export default function AboutPage() {
  const { region } = useRegionContext();
  const meta = REGION_META[region];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen pt-32 pb-32 bg-white"
    >
      <div className="px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-200 pb-12">
          <h1 className="text-[12vw] md:text-[7vw] font-black tracking-[-0.05em] leading-[0.85] text-[#111] uppercase font-oswald">
            Every Moment
            <br />
            Deserves Beauty.
          </h1>
          <p className="text-[11px] font-medium text-[#888] max-w-xs md:text-right mt-8 md:mt-0 leading-relaxed tracking-wide">
            {meta.heroLead}. {meta.homeBase}. Call {meta.phone}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          <div className="col-span-1 md:col-span-7 flex flex-col gap-6">
            <h2 className="text-xl md:text-3xl leading-[1.5] tracking-tight font-medium text-[#111]">
              What began as a passion for storytelling through the lens in
              Little India, Singapore, grew into THE ELEPHANT PRODUCTION,
              registered on 08 Jan 2022 at 7 Cuff Road #02-01, Singapore
              209718.
            </h2>
            <p className="text-[12px] md:text-sm text-[#666] leading-[1.9] tracking-wide">
              In 2025 we expanded as ELEPHANT PRODUCTION CHENNAI PRIVATE
              LIMITED at Old No.148/7, New No.30/2, Habibullah Road, T.Nagar,
              Chennai 600017. Today we operate from Singapore: 7A Cuff Road,
              Little India, Singapore 209718 | +65 93515143 / +65 83505914,
              Chennai: Habibullah Road, T.Nagar, Chennai, Karaikudi: Ananda
              Nagar, Alagappapuram, Karaikudi | +91 8012248366, and Malaysia:
              destination wedding coverage in Kuala Lumpur, Penang, Langkawi —
              no physical office, on-request destination team.
            </p>
            <p className="text-[12px] md:text-sm text-[#666] leading-[1.9] tracking-wide">
              Our mission is simple: fresh creative eye, technical precision,
              genuine care for the people in front of our lens. What is
              Elephant Production? A professional photography and videography
              service that accommodates to your needs — Indian Wedding, Punjabi
              Wedding, Indian Muslim Wedding, ROM &amp; Reception, Christian
              Wedding, Destination Weddings, plus Pre-Wedding, Maternity, Baby
              Photoshoot, Family and Corporate shoots across Singapore &amp;
              India.
            </p>
          </div>
          <div className="col-span-1 md:col-span-4 md:col-start-9 flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-[11px] tracking-wide">
              <span className="text-[9px] uppercase tracking-widest font-bold text-[#111]">
                Singapore HQ
              </span>
              <span className="text-[#666]">
                7A Cuff Road #02-01, Little India, Singapore 209718
              </span>
              <span className="text-[#666]">+65 93515143 / +65 83505914</span>
            </div>
            <div className="flex flex-col gap-2 text-[11px] tracking-wide">
              <span className="text-[9px] uppercase tracking-widest font-bold text-[#111]">
                Chennai Studio
              </span>
              <span className="text-[#666]">
                Old No.148/7, New No.30/2, Habibullah Road, T.Nagar, Chennai
                600017
              </span>
            </div>
            <div className="flex flex-col gap-2 text-[11px] tracking-wide">
              <span className="text-[9px] uppercase tracking-widest font-bold text-[#111]">
                Karaikudi Studio
              </span>
              <span className="text-[#666]">
                Ananda Nagar, Alagappapuram, Karaikudi
              </span>
              <span className="text-[#666]">+91 8012248366</span>
            </div>
            <div className="flex flex-col gap-2 text-[11px] tracking-wide">
              <span className="text-[9px] uppercase tracking-widest font-bold text-[#111]">
                Malaysia
              </span>
              <span className="text-[#666]">
                Destination bookings via Singapore HQ — KL, Penang, Johor
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#111] mb-8">
            Why choose us for your Indian wedding in Singapore &amp; Chennai?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              {
                t: 'Culture Understood',
                d: 'We shoot Punjabi, Tamil, Malayali, Telugu, Muslim, Christian weddings natively. We know rituals.',
              },
              {
                t: 'One Team, Two Countries',
                d: 'Same editing style, same quality in Singapore, Chennai and Karaikudi.',
              },
              {
                t: 'Sony Cinematic Team',
                d: 'Team Elephant Production shoots on Sony for true skin tones.',
              },
              {
                t: '4.9 Rated',
                d: '"Very professional team, friendly too. Album and photos turned out very nice" — Verified Review.',
              },
              {
                t: 'Transparent Process',
                d: 'No hidden costs. On-time delivery, online gallery + album + film in 4-6 weeks.',
              },
            ].map((item) => (
              <div key={item.t} className="flex flex-col gap-3">
                <span className="text-sm font-bold text-[#111] tracking-tight">
                  {item.t}
                </span>
                <span className="text-[11px] text-[#666] leading-[1.8] tracking-wide">
                  {item.d}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
