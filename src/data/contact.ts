export interface Office {
  label: string;
  flag: string;
  location: string;
  phone: string;
  tel: string;
}

export const offices: Office[] = [
  { label: 'HEAD OFFICE', flag: '🇸🇬', location: 'Singapore', phone: '+65 9351 5143', tel: '+6593515143' },
  { label: 'BRANCH', flag: '🇮🇳', location: 'Chennai', phone: '+91 90030 71700', tel: '+919003071700' },
  { label: 'BRANCH', flag: '🇮🇳', location: 'Karaikudi', phone: '+91 80122 48366', tel: '+918012248366' },
];

export const whyUs: string[] = [
  'Cinematic storytelling with a creative vision',
  'Professional photography and filmmaking team',
  'Premium editing and color grading',
  'Wedding, corporate, commercial, and event specialists',
  'Personalized experience for every client',
  'Trusted by clients across Singapore and India',
];

export const services: string[] = [
  'Pre-Wedding Shoots',
  'Wedding Photography & Cinematography',
  'Engagement & Reception Coverage',
  'Traditional Ceremonies',
  'Corporate Photography & Films',
  'Brand Commercials & Advertisements',
  'Event Coverage',
  'Portfolio & Fashion Shoots',
  'Maternity Photography',
  'Baby Shower Photography',
  'Family Portraits',
  'Lifestyle Photography',
  'Birthday Celebrations',
  'Anniversary Shoots',
  'Gender Reveal Events',
  'Henna Night Coverage',
  'Church Weddings',
  'Muslim Weddings',
  'North Indian Weddings',
  'Punjabi Weddings',
  'Tamil Weddings',
  'ROM Ceremonies',
  'Puberty Ceremony',
  'Thalipadayal Ceremony',
  'Documentary Films',
  'Music Videos',
  'Short Films',
  'TV & Digital Content Production',
];

export const aboutDescription: string[][] = [
  ['Elephant Productions is a creative film production house ', 'dedicated to transforming stories ', 'into timeless visual experiences.'],
  ['From intimate celebrations to large-scale productions, ', 'we believe every frame should evoke emotion, ', 'preserve memories, and leave a lasting impact.'],
  ['With our head office in Singapore and creative teams ', 'operating in Chennai and Karaikudi, ', 'we proudly serve clients across Singapore and India,'],
  ['delivering world-class photography, cinematography, ', 'and visual storytelling. ', ''],
];

export const aboutCategories: { staircase: string[]; middle: string[]; bottom: string[] } = {
  staircase: ['PRE-WEDDINGS', 'WEDDINGS', 'CORPORATE', 'EVENTS'],
  middle: ['PREWEDDING', 'PORTFOLIO', 'CEREMONIES'],
  bottom: ['MATERNITY', 'FAMILY', 'LIFESTYLE'],
};

export const aboutTaglines: string[] = [
  'ELEPHANT PRODUCTIONS',
  'CRAFTING STORIES. CREATING MEMORIES.',
  'INSPIRING GENERATIONS.',
  'EVERY PROJECT APPROACHED WITH CREATIVITY.',
];

export const navLinks = [
  { num: '01', href: '/work', label: 'WORK' },
  { num: '02', href: '/about', label: 'ABOUT' },
  { num: '03', href: '/contact', label: 'CONTACT' },
];

export const legalLinks = [
  { href: '/cookies', label: 'COOKIE' },
  { href: '/terms', label: 'TERMS' },
  { href: '/privacy', label: 'PRIVACY' },
];

export const footerSitemap = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const footerTags = ['PRODUCTION', 'DOCUMENTARY', 'FILM & TV'];

export const socialLinks = [
  { label: 'IG', url: 'https://www.instagram.com/sienafilmfoundation/' },
  { label: 'FB', url: 'https://www.facebook.com/profile.php?id=61572313858308' },
  { label: 'LN', url: 'https://www.linkedin.com/company/elephant-productions-film-foundation' },
];

export const emails: { label: string; address: string }[] = [
  { label: 'Inquiries', address: 'lee@elephantproductions.com' },
  { label: 'Press', address: 'press@elephantproductions.com' },
];
