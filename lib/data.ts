import { PICTIME_IDS, pictimeLowres } from './pictime';

// TEMPORARY (client confirmation): homepage carousel streams real portfolio
// photos from the Pic-Time "Porfolio India" gallery. See lib/pictime.ts.
export const carouselImages = PICTIME_IDS.carousel.map(pictimeLowres);

export const servicesList = [
  {
    // TEMPORARY: Pic-Time stream (wedding india scene)
    title: 'Wedding Photography & Videography',
    img: pictimeLowres(PICTIME_IDS.serviceWedding),
  },
  {
    // TEMPORARY: Pic-Time stream (Prewedding scene)
    title: 'Pre-Wedding Photoshoots',
    img: pictimeLowres(PICTIME_IDS.servicePreWedding),
  },
  {
    // TEMPORARY: Pic-Time stream (Maternity Shoot scene)
    title: 'Maternity Photography',
    img: pictimeLowres(PICTIME_IDS.serviceMaternity),
  },
  {
    title: 'Baby & Newborn Photoshoots',
    img: 'https://images.pexels.com/photos/37298569/pexels-photo-37298569.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Family Portraits',
    img: 'https://images.pexels.com/photos/28354750/pexels-photo-28354750.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Corporate & Event Coverage',
    img: 'https://images.pexels.com/photos/9275222/pexels-photo-9275222.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const processBg =
  'https://images.pexels.com/photos/38164076/pexels-photo-38164076.jpeg?auto=compress&cs=tinysrgb&w=2000';

export interface ServiceDetail {
  slug: string;
  title: string;
  h1: string;
  intro: string;
  points: string[];
  includes?: string;
  cta: string;
  img: string;
}

export const servicesDetail: ServiceDetail[] = [
  {
    slug: 'wedding-singapore',
    title: 'Wedding Photography & Videography — Singapore',
    h1: 'Wedding Photographer in Singapore - Indian, Punjabi, Muslim & Christian Weddings',
    intro:
      'If you are searching for a wedding photographer in Little India, Singapore who understands Indian wedding traditions, Elephant Production is based 2 minutes from Serangoon Road.',
    points: [
      'Temple Wedding, Church Wedding, ROM, Reception',
      'Destination Wedding in Malaysia & Maldives',
      'Tamil Brahmin, Punjabi, Indian Muslim & Christian weddings natively',
    ],
    includes:
      'Includes: Candid + Traditional Photography, Cinematic Film, Same-Day Edit, Premium Album.',
    cta: 'Get Singapore Wedding Packages',
    img: pictimeLowres(12081058213), // TEMPORARY Pic-Time stream (wedding india)
  },
  {
    slug: 'wedding-chennai-karaikudi',
    title: 'Wedding Photography — Chennai & Karaikudi',
    h1: 'Wedding Photographer in Chennai & Karaikudi - Chettinad & Tamil Weddings',
    intro:
      'From T.Nagar to Karaikudi Alagappapuram, we are your local team. We understand Chettinad rituals, Tamil Muhurtham timings, and family dynamics.',
    points: [
      'Chettinad wedding rituals & Tamil Muhurtham timings',
      'Candid wedding photographer Chennai',
      'Serving Karaikudi, Devakottai, Tirupathur',
    ],
    includes:
      'Keywords: wedding photographer in Karaikudi, candid wedding photographer Chennai, Chettinad wedding photographer.',
    cta: 'Get Chennai / Karaikudi Wedding Packages',
    img: pictimeLowres(12084424492), // TEMPORARY Pic-Time stream (Chettinadu shoot)
  },
  {
    slug: 'pre-wedding',
    title: 'Pre-Wedding Photoshoots',
    h1: 'Pre Wedding Photoshoot in Singapore, Chennai & Malaysia',
    intro:
      'Looking for pre wedding photoshoot in Singapore with Indian wear? Or at KLCC Malaysia? Themed, studio or outdoor.',
    points: [
      'Destination concepts: Furaveri Maldives, KLCC Malaysia, Marina Bay Singapore, Mahabalipuram & Chennai beaches',
      'Indian wear, themed, studio or outdoor concepts',
      '4 Hour, Full Day & Destination packages',
    ],
    cta: 'Check Pre-Wedding Availability',
    img: pictimeLowres(12081237350), // TEMPORARY Pic-Time stream (Prewedding)
  },
  {
    slug: 'maternity',
    title: 'Maternity Photography',
    h1: 'Maternity Photographer in Singapore & Chennai - Elegant Motherhood Portraits',
    intro:
      'Soft, elegant, motherhood glow. Studio comfort + natural light in Singapore & Chennai.',
    points: [
      'Gowns, makeup, partner and sibling shots included',
      'Safe, comfortable studio with female assistant',
      'Book in your 2nd trimester',
    ],
    includes:
      'How much does a maternity photoshoot cost in Singapore? Packages start from consultation — WhatsApp us your due date.',
    cta: 'Book Maternity Session',
    img: pictimeLowres(12081244956), // TEMPORARY Pic-Time stream (Maternity Shoot)
  },
  {
    slug: 'baby-newborn',
    title: 'Baby & Newborn Photoshoots',
    h1: 'Newborn & Baby Photoshoot in Chennai & Singapore - Safe & Patient',
    intro:
      'Patient, safe, warm setups for newborns. Timeless baby milestones in Chennai & Singapore.',
    points: [
      'Best time for newborn shoot is 5-15 days',
      'Warm, hygienic, baby-led sessions',
      'Props, wraps & family shots included',
    ],
    cta: 'Book Baby Photoshoot',
    img: 'https://images.pexels.com/photos/37298569/pexels-photo-37298569.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'corporate',
    title: 'Corporate & Event Coverage',
    h1: 'Corporate Photographer in Singapore & Chennai for Events & Branding',
    intro:
      'For conferences, product launches, team headshots — punctual, polished and reliable.',
    points: [
      'Conferences, product launches, brand shoots',
      'Team headshots & event coverage',
      '48-hour delivery for corporate clients',
    ],
    cta: 'Get Corporate Quote',
    img: 'https://images.pexels.com/photos/9275222/pexels-photo-9275222.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export interface LocationDetail {
  slug: string;
  city: string;
  h1: string;
  body: string;
  address: string;
  phone: string;
  note: string;
}

export const locationsDetail: LocationDetail[] = [
  {
    slug: 'singapore',
    city: 'Singapore',
    h1: 'Photographers in Little India, Singapore',
    body:
      'Elephant Production, 7A Cuff Road, Little India, Singapore 209718. Near Tekka Market, 2 minutes from Serangoon Road. Top-rated Indian wedding photographer in Little India, rated for Indian Wedding, ROM & Reception.',
    address: '7A Cuff Road #02-01, Little India, Singapore 209718',
    phone: '+65 93515143 / +65 83505914',
    note: 'THE ELEPHANT PRODUCTION UEN 53444987E. Book via Singapore HQ.',
  },
  {
    slug: 'chennai',
    city: 'Chennai',
    h1: 'Wedding & Baby Photographer in Chennai — T.Nagar',
    body:
      'Elephant Production Chennai, Old No.148/7, New No.30/2, Habibullah Road, T.Nagar, Chennai 600017. Serving T.Nagar, Anna Nagar, ECR. Specialists in Tamil & Telugu weddings, Baby Photoshoot Chennai.',
    address:
      'Old No.148/7, New No.30/2, Habibullah Road, T.Nagar, Chennai 600017',
    phone: '+91 8012248366',
    note: 'ELEPHANT PRODUCTION CHENNAI PRIVATE LIMITED.',
  },
  {
    slug: 'karaikudi',
    city: 'Karaikudi',
    h1: 'Chettinad Wedding Photographer in Karaikudi',
    body:
      'The Elephant Production, Ananda Nagar Alagappapuram, Karaikudi, Tamil Nadu. Chettinad wedding specialists for Karaikudi, Devakottai, Tirupathur.',
    address: 'Ananda Nagar, Alagappapuram, Karaikudi, Tamil Nadu',
    phone: '+91 8012248366',
    note: 'Local team for Chettinad rituals & Tamil Muhurtham timings.',
  },
  {
    slug: 'malaysia',
    city: 'Malaysia',
    h1: 'Destination Wedding Photographer in Malaysia',
    body:
      'While we do not have a registered office in Malaysia, our Singapore team travels to Kuala Lumpur, Penang, and Johor for Indian weddings, ROM and pre-wedding at KLCC.',
    address: 'Destination coverage: Kuala Lumpur, Penang, Johor & Langkawi',
    phone: '+65 93515143 (via Singapore HQ)',
    note: 'Malaysian clients book via Singapore HQ +65 93515143.',
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: 'Who is the best Indian wedding photographer in Singapore?',
    a: 'Elephant Production based at 7A Cuff Road, Little India, is rated 4.9 for Indian, Punjabi, Muslim and Christian weddings in Singapore, specializing in candid + cinematic.',
  },
  {
    q: 'Does Elephant Production have a studio in Chennai and Karaikudi?',
    a: 'Yes. Chennai studio at Habibullah Road, T.Nagar (ELEPHANT PRODUCTION CHENNAI PRIVATE LIMITED) and Karaikudi at Ananda Nagar Alagappapuram, phone +91 8012248366.',
  },
  {
    q: 'Do you shoot in Malaysia?',
    a: 'Yes, we offer destination wedding photography and pre-wedding shoots in Kuala Lumpur, Malaysia as an extension of our Singapore team. No separate Malaysia registration.',
  },
  {
    q: 'What services does Elephant Production offer?',
    a: 'Photography / Videography, Pre-Wedding Photoshoot, Baby Photoshoot, Maternity, Corporate and Family as per our official Instagram @elephantproduction_sg.',
  },
  {
    q: 'How much does wedding photography cost in Singapore and Chennai?',
    a: 'Packages are customized by hours, functions, and deliverables. Contact +65 93515143 for Singapore/Malaysia and +91 8012248366 for Chennai/Karaikudi for transparent pricing.',
  },
  {
    q: 'How early should I book?',
    a: '3-6 months for weddings, 2nd trimester for maternity, and within pregnancy for newborn.',
  },
];

export interface PortfolioWork {
  id: string;
  img: string;
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  description: string;
  gallery: string[];
  // TEMPORARY helper: which viewer region this work is surfaced first for.
  homeRegion?: 'SG' | 'IN' | 'MY';
}

export const portfolioWorks: PortfolioWork[] = [
  {
    id: 'aisha-rahul',
    homeRegion: 'SG',
    // TEMPORARY: Pic-Time stream (wedding india scene)
    img: pictimeLowres(PICTIME_IDS.workAishaMain),
    title: 'Aisha & Rahul',
    category: 'Wedding',
    client: 'Private',
    location: 'Little India, Singapore',
    year: '2025',
    description:
      'Tamil wedding in Singapore by Elephant Production — candid emotions, cinematic highlights, traditions, laughter and tears. Indian, Punjabi and Tamil rituals covered natively by our Singapore team at 7A Cuff Road.',
    gallery: PICTIME_IDS.workAishaGallery.map(pictimeLowres),
  },
  {
    id: 'techcorp-launch',
    homeRegion: 'SG',
    img: 'https://images.pexels.com/photos/9275222/pexels-photo-9275222.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'TechCorp Launch',
    category: 'Corporate',
    client: 'TechCorp Inc.',
    location: 'Singapore',
    year: '2024',
    description:
      'Corporate photography in Singapore for conferences, product launches and brand shoots. Polished, punctual, reliable coverage with 48-hour delivery by Team Elephant Production.',
    gallery: [
      'https://images.pexels.com/photos/29708240/pexels-photo-29708240.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/34774344/pexels-photo-34774344.jpeg?auto=compress&cs=tinysrgb&w=1000',
    ],
  },
  {
    id: 'sharma-family',
    homeRegion: 'IN',
    // TEMPORARY: Pic-Time stream (Chettinadu shoot scene)
    img: pictimeLowres(PICTIME_IDS.workSharmaMain),
    title: 'The Sharma Family',
    category: 'Family',
    client: 'Private',
    location: 'T.Nagar, Chennai',
    year: '2024',
    description:
      'Family portraits and baby photoshoot in Chennai by Elephant Production Chennai. Generational portraits that capture bond and personality, with warm, patient, baby-led sessions.',
    gallery: PICTIME_IDS.workSharmaGallery.map(pictimeLowres),
  },
  {
    id: 'elegance-bloom',
    homeRegion: 'MY',
    // TEMPORARY: Pic-Time stream (Prewedding scene)
    img: pictimeLowres(PICTIME_IDS.workEleganceMain),
    title: 'Elegance in Bloom',
    category: 'Pre-Wedding',
    client: 'Private',
    location: 'KLCC, Kuala Lumpur, Malaysia',
    year: '2025',
    description:
      'Pre-wedding photoshoot in Singapore, Chennai & Malaysia — destination concepts at KLCC Malaysia, Marina Bay Singapore and Chennai beaches. Themed, studio or outdoor by our Singapore destination team.',
    gallery: PICTIME_IDS.workEleganceGallery.map(pictimeLowres),
  },
  {
    id: 'engagement-chennai',
    // TEMPORARY: Pic-Time stream (Engagement India scene)
    homeRegion: 'IN',
    img: pictimeLowres(PICTIME_IDS.workEngagementMain),
    title: 'Engagement in Chennai',
    category: 'Wedding',
    client: 'Private',
    location: 'T.Nagar, Chennai',
    year: '2025',
    description:
      'Tamil engagement ceremony in Chennai by Elephant Production Chennai — ring exchange, family blessings and candid emotions, covered natively by our T.Nagar team.',
    gallery: PICTIME_IDS.workEngagementGallery.map(pictimeLowres),
  },
  {
    id: 'nikkah-chennai',
    // TEMPORARY: Pic-Time stream (Nikkah India scene)
    homeRegion: 'IN',
    img: pictimeLowres(PICTIME_IDS.workNikkahMain),
    title: 'Nikkah Ceremony',
    category: 'Wedding',
    client: 'Private',
    location: 'Chennai',
    year: '2024',
    description:
      'Indian Muslim Nikkah in Chennai — quiet rituals, family warmth and cinematic portraits by Team Elephant Production.',
    gallery: PICTIME_IDS.workNikkahGallery.map(pictimeLowres),
  },
  {
    id: 'reception-chennai',
    // TEMPORARY: Pic-Time stream (reception india scene)
    homeRegion: 'IN',
    img: pictimeLowres(PICTIME_IDS.workReceptionMain),
    title: 'Reception Night',
    category: 'Wedding',
    client: 'Private',
    location: 'Chennai',
    year: '2025',
    description:
      'Wedding reception in Chennai — stage moments, family portraits and dance-floor candids with cinematic highlight film.',
    gallery: PICTIME_IDS.workReceptionGallery.map(pictimeLowres),
  },
  {
    id: 'postwedding-ecr',
    // TEMPORARY: Pic-Time stream (Post Wedding India scene)
    homeRegion: 'IN',
    img: pictimeLowres(PICTIME_IDS.workPostWedMain),
    title: 'Post-Wedding by the Sea',
    category: 'Pre-Wedding',
    client: 'Private',
    location: 'ECR, Chennai',
    year: '2024',
    description:
      'Post-wedding couple shoot on ECR, Chennai — relaxed, romantic frames after the big day, styled outdoor session by our Chennai team.',
    gallery: PICTIME_IDS.workPostWedGallery.map(pictimeLowres),
  },
  {
    id: 'maternity-chennai',
    // TEMPORARY: Pic-Time stream (Maternity Shoot scene)
    homeRegion: 'IN',
    img: pictimeLowres(PICTIME_IDS.workMaternityMain),
    title: 'Maternity Glow',
    category: 'Maternity',
    client: 'Private',
    location: 'Chennai',
    year: '2025',
    description:
      'Elegant maternity portraits in Chennai — soft motherhood glow with gowns, partner shots and studio comfort plus natural light.',
    gallery: PICTIME_IDS.workMaternityGallery.map(pictimeLowres),
  },
  {
    id: 'chettinad-heritage',
    // TEMPORARY: Pic-Time stream (Chettinadu shoot scene)
    homeRegion: 'IN',
    img: pictimeLowres(PICTIME_IDS.workChettinadMain),
    title: 'Chettinad Heritage',
    category: 'Wedding',
    client: 'Private',
    location: 'Karaikudi',
    year: '2025',
    description:
      'Chettinad wedding in Karaikudi — heritage mansions, traditional rituals and Muhurtham moments by our Ananda Nagar local team.',
    gallery: PICTIME_IDS.workChettinadGallery.map(pictimeLowres),
  },
  {
    id: 'kerala-backwaters',
    // TEMPORARY: Pic-Time stream (Kerala shoot scene)
    homeRegion: 'IN',
    img: pictimeLowres(PICTIME_IDS.workKeralaMain),
    title: 'Kerala Backwater Tales',
    category: 'Pre-Wedding',
    client: 'Private',
    location: 'Kerala',
    year: '2024',
    description:
      'Destination pre-wedding in Kerala — backwaters, houseboats and lush greens, a themed outdoor concept by Team Elephant Production.',
    gallery: PICTIME_IDS.workKeralaGallery.map(pictimeLowres),
  },
  {
    id: 'pondicherry-old-town',
    // TEMPORARY: Pic-Time stream (Pondicherry Shoot scene)
    homeRegion: 'IN',
    img: pictimeLowres(PICTIME_IDS.workPondiMain),
    title: 'Pondicherry Old Town',
    category: 'Pre-Wedding',
    client: 'Private',
    location: 'Pondicherry',
    year: '2024',
    description:
      'Pre-wedding in Pondicherry old town — French quarters, colourful streets and beach frames, destination shoot by our Chennai team.',
    gallery: PICTIME_IDS.workPondiGallery.map(pictimeLowres),
  },
  {
    id: 'street-stories',
    // TEMPORARY: Pic-Time stream (Street Stories scene)
    homeRegion: 'SG',
    img: pictimeLowres(PICTIME_IDS.workStreetMain),
    title: 'Street Stories',
    category: 'Portraits',
    client: 'Private',
    location: 'Little India, Singapore',
    year: '2025',
    description:
      'Lifestyle portraits through Little India, Singapore — streets, colours and everyday character, shot on our home ground at 7A Cuff Road.',
    gallery: PICTIME_IDS.workStreetGallery.map(pictimeLowres),
  },
  {
    id: 'studio-muse',
    // TEMPORARY: Pic-Time stream (model shoot scene)
    homeRegion: 'SG',
    img: pictimeLowres(PICTIME_IDS.workModelMain),
    title: 'Studio Muse',
    category: 'Portraits',
    client: 'Private',
    location: 'Singapore',
    year: '2024',
    description:
      'Studio portrait session in Singapore — editorial light, styled looks and timeless frames by Team Elephant Production.',
    gallery: PICTIME_IDS.workModelGallery.map(pictimeLowres),
  },
];
