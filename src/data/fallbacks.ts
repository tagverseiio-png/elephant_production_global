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
  '/assets/6750c22f214b0f9818f5a920_Savoy%20(0-01-02-06).webp',
  '/assets/6750c22fdcfc0cba857005bd_Savoy%20(0-02-12-07).webp',
  '/assets/6750c201c90bd57118d82564_Moon12%20Prores422hq%20Lt%20Rt%2002.06.16%20(0-01-02-01).webp',
  '/assets/6750c201e3f9c080ac8abee3_Moon12%20Prores422hq%20Lt%20Rt%2002.06.16%20(0-17-03-13).webp'
];

export const fallbackReviews = [
  { source: 'Variety', text: 'A cinematic masterpiece that demands to be watched.' },
  { source: 'The Hollywood Reporter', text: 'Visually spectacular, featuring remarkable performances.' },
  { source: 'IndieWire', text: 'A bold, brave entry into contemporary cinema.' }
];

export const fallbackAwards = [
  { logo: '/assets/67b33c467d57178b71d24834_FIPADOC.png', category: 'International Competition', title: 'Fipadoc Biarritz' },
  { logo: '/assets/67b33c6262a32eb13aa6ee89_Santa%20Barbara%20International%20Film%20Festival.png', category: 'Official Selection', title: 'Santa Barbara Film Festival' }
];

export const defaultCrewList = (directorName: string) => [
  { role: 'Director', name: directorName },
  { role: 'Producer', name: 'Lee Shira' },
  { role: 'Executive Producer', name: 'Dorit Hakim Kramer' },
  { role: 'Director of Photography', name: 'Moshe Mishaly' },
  { role: 'Editor', name: 'Shauly Melamed' }
];
