export interface HomeFilm {
  id: string;
  title: string;
  category: string;
  year: string;
  director: string;
  stillImage: string;
  trailerVideo: string;
  awardYear?: string;
  awardLaurel?: string;
  awardLogo?: string;
  reviews: Array<{ text: string; source: string }>;
}

export const homeFilms: HomeFilm[] = [
  {
    id: 'wedding1',
    title: 'Wedding 1',
    category: 'Wedding',
    year: '2024',
    director: 'Harry',
    stillImage: '/media/wedding1/DSC03084_websize.jpg',
    trailerVideo: '',
    reviews: [
      { text: '"Captured our day perfectly"', source: 'Client' },
      { text: '"Incredible attention to detail"', source: 'Family' },
      { text: '"A masterpiece of memories"', source: 'Friends' }
    ]
  },
  {
    id: 'wedding2',
    title: 'Wedding 2',
    category: 'Wedding',
    year: '2023',
    director: 'Harry',
    stillImage: '/media/wedding2/untitled-20_websize.jpg',
    trailerVideo: '',
    reviews: [
      { text: '"Breathtaking moments"', source: 'Client' },
      { text: '"We couldn\'t be happier"', source: 'Family' },
    ]
  },
  {
    id: 'wedding3',
    title: 'Wedding 3',
    category: 'Wedding',
    year: '2023',
    director: 'Harry',
    stillImage: '/media/wedding3/SAN06334_websize.jpg',
    trailerVideo: '',
    reviews: [
      { text: '"Absolutely stunning"', source: 'Client' }
    ]
  },
  {
    id: 'wedding4',
    title: 'Wedding 4',
    category: 'Wedding',
    year: '2023',
    director: 'Harry',
    stillImage: '/media/wedding4/NIR08050_websize.jpg',
    trailerVideo: '',
    reviews: [
      { text: '"Magical photography"', source: 'Client' }
    ]
  },
  {
    id: 'wedding5',
    title: 'Wedding 5',
    category: 'Wedding',
    year: '2024',
    director: 'Harry',
    stillImage: '/media/wedding5/02_websize.jpg',
    trailerVideo: '',
    reviews: [
      { text: '"We are in awe"', source: 'Client' }
    ]
  },
  {
    id: 'wedding6',
    title: 'Wedding 6',
    category: 'Wedding',
    year: '2024',
    director: 'Harry',
    stillImage: '/media/wedding6/DSC00529_websize.jpg',
    trailerVideo: '',
    reviews: [
      { text: '"Beautiful"', source: 'Client' }
    ]
  }
];
