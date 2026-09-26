'use client';

import { REGION_LOCATION_ORDER, REGION_META } from '@/lib/region';
import { useRegionContext } from '@/components/site/region-context';
import footer from '@/components/assets/footer-transparent.png';

const STUDIO_LABELS: Record<string, string> = {
  Singapore: 'Singapore — 7A Cuff Road',
  Chennai: 'Chennai — T.Nagar',
  Karaikudi: 'Karaikudi — Ananda Nagar',
  Malaysia: 'Malaysia — Destination',
};

export default function Footer({
  onNavigate,
}: {
  onNavigate?: (
    page:
      | 'locations'
      | 'contact'
      | 'faq'
      | 'services'
      | 'privacy'
      | 'terms'
      | 'cancellation'
  ) => void;
}) {
  const { region } = useRegionContext();
  const order = REGION_LOCATION_ORDER[region];
  const meta = REGION_META[region];
  return (
    <footer className="w-full bg-black text-white pt-32 pb-8 px-6 md:px-12 flex flex-col relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 border-b border-[#333] pb-24 mb-8">
        <div className="col-span-1 md:col-span-8 flex flex-col justify-start items-start gap-12">
          {/* Logo - properly sized */}
          <img
            className="w-64 md:w-80 object-contain"
            src={footer.src}
            alt="Logo"
          />
          <a
            href="mailto:hello@elephantproduction.com"
            className="text-xl md:text-3xl lg:text-4xl font-medium tracking-tight border-b border-[#555] pb-2 hover:text-[#888] hover:border-[#888] transition-all duration-300 inline-block"
          >
            hello@elephantproduction.com
          </a>
        </div>

        <div className="col-span-1 md:col-span-2 flex flex-col gap-4 text-[10px] tracking-[0.2em] uppercase text-[#666] font-medium mt-4 md:mt-0">
          <span className="text-white font-bold mb-4 flex items-center gap-4">
            <span className="w-6 h-[1px] bg-white block" /> Studios
          </span>
          {order.map((loc) => (
            <span
              key={loc}
              onClick={() => onNavigate?.('locations')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {STUDIO_LABELS[loc]}
            </span>
          ))}
          <span className="text-[#555] normal-case tracking-normal">
            {meta.phone}
          </span>
        </div>

        <div className="col-span-1 md:col-span-2 flex flex-col gap-4 text-[10px] tracking-[0.2em] uppercase text-[#666] font-medium mt-4 md:mt-0">
          <span className="text-white font-bold mb-4 flex items-center gap-4">
            <span className="w-6 h-[1px] bg-white block" /> Socials
          </span>
          <a
            href="https://www.instagram.com/elephantproduction_sg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Vimeo
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Pinterest
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Facebook
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-[9px] text-[#555] uppercase tracking-[0.2em] font-bold gap-6 md:gap-0">
        <span>
          &copy; 2022-{new Date().getFullYear()} Elephant Production | THE
          ELEPHANT PRODUCTION UEN 53444987E Singapore | ELEPHANT PRODUCTION
          CHENNAI PRIVATE LIMITED
        </span>
        <div className="flex gap-8">
          <button
            onClick={() => onNavigate?.('privacy')}
            className="hover:text-white transition-colors uppercase tracking-[0.2em]"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onNavigate?.('terms')}
            className="hover:text-white transition-colors uppercase tracking-[0.2em]"
          >
            Terms of Service
          </button>
          <button
            onClick={() => onNavigate?.('cancellation')}
            className="hover:text-white transition-colors uppercase tracking-[0.2em]"
          >
            Cancellation & Refunds
          </button>
        </div>
      </div>
      <p className="mt-6 text-[9px] text-[#444] leading-relaxed tracking-wide max-w-4xl">
        Photography Videography Pre Wedding Indian Wedding Maternity Baby
        Corporate Family Photographer in Singapore Chennai Karaikudi Malaysia
        Destination Wedding. Singapore: 7A Cuff Road, Little India +65 93515143
        | Chennai: Habibullah Road, T.Nagar | Karaikudi: Ananda Nagar
        Alagappapuram +91 8012248366 | Malaysia bookings via Singapore HQ.
      </p>
    </footer>
  );
}
