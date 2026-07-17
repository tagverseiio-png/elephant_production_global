export interface Review {
  source: string;
  text: string;
}

export interface Award {
  logo: string;
  category: string;
  title: string;
}

export interface Credit {
  role: string;
  name: string;
}

export interface FilmData {
  id: string;
  hero_image: string;
  director_image: string;
  trailer_url: string;
  gallery_images: string[];
  reviews: Review[];
  awards: Award[];
  credits: Credit[];
  investors: string;
}

export const fallbackGallery = [
  '/api/media/wedding1/DSC02481_websize.jpg',
  '/api/media/wedding1/DSC02509_websize.jpg',
  '/api/media/wedding1/DSC02918_websize.jpg',
  '/api/media/wedding1/DSC03065_websize.jpg',
];

export const fallbackReviews = [
  { source: 'Variety', text: 'A cinematic masterpiece that demands to be watched.' },
  { source: 'The Hollywood Reporter', text: 'Visually spectacular, featuring remarkable performances.' },
  { source: 'IndieWire', text: 'A bold, brave entry into contemporary cinema.' }
];

export const fallbackAwards: Award[] = [];

export const defaultCrewList = (directorName: string) => [
  { role: 'Director', name: directorName },
  { role: 'Producer', name: 'Lee Shira' },
  { role: 'Executive Producer', name: 'Dorit Hakim Kramer' },
  { role: 'Director of Photography', name: 'Moshe Mishaly' },
  { role: 'Editor', name: 'Shauly Melamed' }
];
