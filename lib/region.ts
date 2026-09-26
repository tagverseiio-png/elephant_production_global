'use client';

export type Region = 'SG' | 'IN' | 'MY';

export const REGIONS: Region[] = ['SG', 'IN', 'MY'];

const STORAGE_KEY = 'ep-region';

export function detectRegionFromTimezone(): Region | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
    if (tz === 'Asia/Singapore') return 'SG';
    if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') return 'IN';
    if (tz === 'Asia/Kuala_Lumpur' || tz === 'Asia/Kuching') return 'MY';
    return null;
  } catch {
    return null;
  }
}

function countryCodeToRegion(code: string | null | undefined): Region | null {
  if (!code) return null;
  const c = code.toUpperCase();
  if (c === 'SG') return 'SG';
  if (c === 'IN') return 'IN';
  if (c === 'MY') return 'MY';
  return null;
}

export async function fetchRegionFromIP(
  signal?: AbortSignal
): Promise<Region | null> {
  // Free, keyless, CORS-enabled. Timeout-guarded so UI never blocks.
  try {
    const res = await fetch('https://ipwho.is/', { signal });
    if (!res.ok) return null;
    const data = await res.json();
    return countryCodeToRegion(data?.country_code);
  } catch {
    return null;
  }
}

export function getStoredRegion(): Region | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'SG' || v === 'IN' || v === 'MY' ? v : null;
  } catch {
    return null;
  }
}

export function storeRegion(r: Region) {
  try {
    localStorage.setItem(STORAGE_KEY, r);
  } catch {
    // ignore
  }
}

// Region-first ordering: viewer's home base always comes first.
export const REGION_LOCATION_ORDER: Record<Region, string[]> = {
  SG: ['Singapore', 'Chennai', 'Karaikudi', 'Malaysia'],
  IN: ['Chennai', 'Karaikudi', 'Singapore', 'Malaysia'],
  MY: ['Malaysia', 'Singapore', 'Chennai', 'Karaikudi'],
};

// Which location(s) get bold highlight per viewer region.
export const REGION_HOME_LOCATIONS: Record<Region, string[]> = {
  SG: ['Singapore'],
  IN: ['Chennai', 'Karaikudi'],
  MY: ['Malaysia'],
};

export const REGION_META: Record<
  Region,
  {
    label: string;
    homeBase: string;
    phone: string;
    address: string;
    heroLead: string;
    contactIntro: string;
  }
> = {
  SG: {
    label: 'Singapore',
    homeBase: 'Singapore HQ — 7A Cuff Road, Little India',
    phone: '+65 93515143 / +65 83505914',
    address: '7A Cuff Road #02-01, Little India, Singapore 209718',
    heroLead: 'Singapore-based studio — also in Chennai, Karaikudi & Malaysia',
    contactIntro:
      'Visiting from Singapore? Our HQ at 7A Cuff Road, Little India is 2 minutes from Serangoon Road. Call +65 93515143.',
  },
  IN: {
    label: 'Chennai',
    homeBase: 'Chennai — Habibullah Road, T.Nagar + Karaikudi',
    phone: '+91 8012248366',
    address:
      'Old No.148/7, New No.30/2, Habibullah Road, T.Nagar, Chennai 600017',
    heroLead: 'Chennai-based team — also in Singapore, Karaikudi & Malaysia',
    contactIntro:
      'Visiting from India? Meet us in Chennai at Habibullah Road, T.Nagar or Karaikudi at Ananda Nagar. Call +91 8012248366.',
  },
  MY: {
    label: 'Malaysia',
    homeBase: 'Malaysia destination — via Singapore HQ',
    phone: '+65 93515143',
    address: 'Destination coverage in Kuala Lumpur, Penang, Johor & Langkawi',
    heroLead: 'Malaysia destination weddings — via Singapore HQ + Chennai team',
    contactIntro:
      'Visiting from Malaysia? Our Singapore team travels to KL, Penang & Johor for weddings & pre-wedding at KLCC. Book via +65 93515143.',
  },
};
