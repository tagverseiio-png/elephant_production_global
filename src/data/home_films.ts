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
    stillImage: '/works/wedding1/DSC03084_websize.jpg',
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
    stillImage: '/works/wedding2/untitled-14_websize.jpg',
    trailerVideo: '',
    reviews: [
      { text: '"Breathtaking moments"', source: 'Client' },
      { text: '"We couldn\'t be happier"', source: 'Family' },
      { text: '"Stunning visual storytelling"', source: 'Guests' }
    ]
  },
  {
    id: 'construction',
    title: 'Construction',
    category: 'Construction',
    year: '2024',
    director: 'Harry',
    stillImage: '/works/Construction/PCP.198.jpg',
    trailerVideo: '',
    reviews: [
      { text: '"Epic scale captured beautifully"', source: 'Client' },
      { text: '"Showcases our work perfectly"', source: 'Contractor' },
      { text: '"A cinematic view of progress"', source: 'Architect' }
    ]
  }
];
