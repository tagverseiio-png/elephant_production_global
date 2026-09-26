'use client';

import {
  REGION_HOME_LOCATIONS,
  REGION_LOCATION_ORDER,
  REGION_META,
} from '@/lib/region';
import { useRegionContext } from '@/components/site/region-context';
import logo from '@/components/assets/logo.png';

export default function GlobalPresenceSection() {
  const { region } = useRegionContext();
  const order = REGION_LOCATION_ORDER[region];
  const meta = REGION_META[region];
  const [first, second, third, fourth] = order;
  const homeLocs = REGION_HOME_LOCATIONS[region];
  const renderLoc = (loc: string) =>
    homeLocs.includes(loc) ? (
      <span className="text-[#111111] font-bold">{loc}</span>
    ) : (
      <>{loc}</>
    );
  return (
    <section className="w-full py-32 relative bg-white border-t border-gray-100 overflow-hidden">
      {/* Geometric watermark */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.04]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L100,100 M100,0 L0,100 M50,0 L50,100 M0,50 L100,50"
            stroke="#000"
            strokeWidth="0.1"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="#000"
            strokeWidth="0.1"
          />
          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            fill="none"
            stroke="#000"
            strokeWidth="0.1"
            transform="rotate(45 50 50)"
          />
        </svg>
      </div>

      <div className="w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 relative z-10 gap-y-12">
        {/* Left Column */}
        <div className="col-span-1 md:col-span-4 flex flex-col justify-between h-full min-h-[300px]">
          <div className="flex justify-between w-full md:w-[80%] text-[10px] font-bold text-[#111]">
            <span>(05)</span>
            <span className="text-[#888] font-medium tracking-wide font-normal">
              Global Presence
            </span>
          </div>
          <div className="mt-16 mb-8 md:my-auto">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-black rounded-full flex flex-col items-center justify-center text-white shadow-xl">
              <img className="w-28 md:w-26" src={logo.src} alt="Logo" />
            </div>
          </div>
          <span className="text-[9px] text-[#888] font-medium leading-relaxed max-w-[160px] tracking-wide">
            {first} • {second} •
            <br />
            {third} • {fourth}
          </span>
        </div>

        {/* Right Column — region-first order + location-based bold, same UI */}
        <div className="col-span-1 md:col-span-8 flex flex-col justify-center">
          <h2 className="text-[8vw] md:text-[5vw] font-medium leading-[1.05] text-[#999] tracking-[-0.04em]">
            {renderLoc(first)} / {renderLoc(second)} <br />
            {renderLoc(third)} /{renderLoc(fourth)} / <br />
            Destination /{' '}
            <span className="text-[#111111] font-bold">Weddings</span> <br />
            / Studio
          </h2>
          <p className="text-[10px] text-[#888] font-medium leading-[1.8] max-w-md mt-16 tracking-wide">
            {meta.homeBase}. {meta.contactIntro} Singapore HQ at 7A Cuff Road,
            Little India, Chennai at Habibullah Road, T.Nagar, Karaikudi at
            Ananda Nagar, Alagappapuram. Destination coverage in Kuala Lumpur,
            Malaysia.
          </p>
        </div>
      </div>
    </section>
  );
}
