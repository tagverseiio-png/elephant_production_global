import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Film from '../models/Film';
import Collaborator from '../models/Collaborator';
import SiteSettings from '../models/SiteSettings';
import Admin from '../models/Admin';

const homeFilms: any[] = [];

const weddingFilms = [
  {
    id: 'wedding1',
    title: 'Wedding 1',
    category: 'Wedding',
    published: true,
    year: '2024',
    director: 'Harry',
    order: 8,
    stillImage: '/media/wedding1/DSC03084_websize.jpg',
    hero_image: '/media/wedding1/DSC03084_websize.jpg',
    director_image: '/media/wedding1/DSC03084_websize.jpg',
    trailerVideo: '',
    gallery_images: [
      '/media/wedding1/DSC02481_websize.jpg',
      '/media/wedding1/DSC02509_websize.jpg',
      '/media/wedding1/DSC02918_websize.jpg',
      '/media/wedding1/DSC03065_websize.jpg',
      '/media/wedding1/DSC03084_websize.jpg',
      '/media/wedding1/DSC03332_websize.jpg',
    ],
    reviews: [
      { text: '"Captured our day perfectly"', source: 'Client' },
      { text: '"Incredible attention to detail"', source: 'Family' },
      { text: '"A masterpiece of memories"', source: 'Friends' },
    ],
  },
  {
    id: 'wedding2',
    title: 'Wedding 2',
    category: 'Wedding',
    published: true,
    year: '2023',
    director: 'Harry',
    order: 9,
    stillImage: '/media/wedding2/untitled-20_websize.jpg',
    hero_image: '/media/wedding2/untitled-20_websize.jpg',
    director_image: '/media/wedding2/untitled-20_websize.jpg',
    trailerVideo: '',
    gallery_images: [
      '/media/wedding2/untitled-8_websize.jpg',
      '/media/wedding2/untitled-14_websize.jpg',
      '/media/wedding2/untitled-15_websize.jpg',
      '/media/wedding2/untitled-20_websize.jpg',
      '/media/wedding2/untitled-21_websize.jpg',
    ],
    reviews: [
      { text: '"Breathtaking moments"', source: 'Client' },
      { text: '"We couldn\'t be happier"', source: 'Family' },
    ],
  },
  {
    id: 'wedding3',
    title: 'Wedding 3',
    category: 'Wedding',
    published: true,
    year: '2023',
    director: 'Harry',
    order: 10,
    stillImage: '/media/wedding3/SAN06334_websize.jpg',
    hero_image: '/media/wedding3/SAN06334_websize.jpg',
    director_image: '/media/wedding3/SAN06334_websize.jpg',
    trailerVideo: '',
    gallery_images: [
      '/media/wedding3/SAN05902_websize.jpg',
      '/media/wedding3/SAN06209_websize.jpg',
      '/media/wedding3/SAN06334_websize.jpg',
    ],
    reviews: [{ text: '"Absolutely stunning"', source: 'Client' }],
  },
  {
    id: 'wedding4',
    title: 'Wedding 4',
    category: 'Wedding',
    published: true,
    year: '2023',
    director: 'Harry',
    order: 11,
    stillImage: '/media/wedding4/NIR08050_websize.jpg',
    hero_image: '/media/wedding4/NIR08050_websize.jpg',
    director_image: '/media/wedding4/NIR08050_websize.jpg',
    trailerVideo: '',
    gallery_images: [
      '/media/wedding4/NIR08050_websize.jpg',
      '/media/wedding4/PGE270_websize.jpg',
      '/media/wedding4/PGE319_websize.jpg',
    ],
    reviews: [{ text: '"Magical photography"', source: 'Client' }],
  },
  {
    id: 'wedding5',
    title: 'Wedding 5',
    category: 'Wedding',
    published: true,
    year: '2024',
    director: 'Harry',
    order: 12,
    stillImage: '/media/wedding5/02_websize.jpg',
    hero_image: '/media/wedding5/02_websize.jpg',
    director_image: '/media/wedding5/02_websize.jpg',
    trailerVideo: '',
    gallery_images: [
      '/media/wedding5/02_websize.jpg',
      '/media/wedding5/03_websize.jpg',
    ],
    reviews: [{ text: '"We are in awe"', source: 'Client' }],
  },
  {
    id: 'wedding6',
    title: 'Wedding 6',
    category: 'Wedding',
    published: true,
    year: '2024',
    director: 'Harry',
    order: 13,
    stillImage: '/media/wedding6/DSC00529_websize.jpg',
    hero_image: '/media/wedding6/DSC00529_websize.jpg',
    director_image: '/media/wedding6/DSC00529_websize.jpg',
    trailerVideo: '',
    gallery_images: [
      '/media/wedding6/DSC00529_websize.jpg',
      '/media/wedding6/DSC00544_websize.jpg',
    ],
    reviews: [{ text: '"Beautiful"', source: 'Client' }],
  },
];

const collaborators = [
  { name: 'A24', type: 'DISTRIBUTOR / GLOBAL', order: 0 },
  { name: 'SAM SPIEGEL', type: 'FILM SCHOOL ACADEMY', order: 1 },
  { name: 'HBO', type: 'CO-PRODUCTION NETWORK', order: 2 },
  { name: 'DOCAVIV', type: 'FESTIVAL CO-FOUNDER', order: 3 },
  { name: 'JFF (Jewish Film Festival)', type: 'FESTIVAL SELECTION', order: 4 },
  { name: 'Warsaw Film Festival', type: 'FESTIVAL SELECTION', order: 5 },
  { name: 'Seattle Film Festival', type: 'FESTIVAL SELECTION', order: 6 },
  { name: 'SERET', type: 'FESTIVAL SELECTION', order: 7 },
  { name: 'Chicago International Film Festival', type: 'FESTIVAL SELECTION', order: 8 },
  { name: 'FIPADOC', type: 'FESTIVAL SELECTION', order: 9 },
  { name: 'Santa Barbara International Film Festival', type: 'FESTIVAL SELECTION', order: 10 },
  { name: 'Krakow Film Festival', type: 'FESTIVAL SELECTION', order: 11 },
  { name: 'JIFF', type: 'FESTIVAL SELECTION', order: 12 },
  { name: 'UK Jewish Film Festival', type: 'FESTIVAL SELECTION', order: 13 },
  { name: 'Atlanta Jewish Film Festival', type: 'FESTIVAL SELECTION', order: 14 },
  { name: 'Seattle Jewish Film Festival', type: 'FESTIVAL SELECTION', order: 15 },
  { name: 'Boca International Jewish Film Festival', type: 'FESTIVAL SELECTION', order: 16 },
  { name: 'Ophir Awards', type: 'FESTIVAL SELECTION', order: 17 },
  { name: 'Thessaloniki Film Festival', type: 'FESTIVAL SELECTION', order: 18 },
  { name: 'Cinema South Festival', type: 'FESTIVAL SELECTION', order: 19 },
  { name: 'HAIFA', type: 'FESTIVAL SELECTION', order: 20 },
  { name: 'Mannheim', type: 'FESTIVAL SELECTION', order: 21 },
  { name: 'Kiez Berlin Film Festival', type: 'FESTIVAL SELECTION', order: 22 },
  { name: 'International Film Festival Rotterdam', type: 'FESTIVAL SELECTION', order: 23 },
];

const defaultSettings = {
  email: 'lee@elephantproduction.com',
  phone: '+972-54-2804049',
  address: 'Dizengoff ST, 123, Tel Aviv',
  emailSubject: 'Project Inquiry',
  instagram: 'https://www.instagram.com/elephantfilmfoundation/',
  facebook: 'https://www.facebook.com/profile.php?id=61572313858308',
  linkedin: 'https://www.linkedin.com/company/elephant-film-foundation/',
  siteTitle: 'Elephant Production',
};

async function seed(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('✅ Connected to MongoDB');

    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        name: 'Admin',
      });
      console.log(`✅ Admin created: ${process.env.ADMIN_EMAIL}`);
    } else {
      console.log(`⏭  Admin already exists: ${process.env.ADMIN_EMAIL}`);
    }

    await Film.deleteMany({});
    const allFilms = [...homeFilms, ...weddingFilms];
    for (const film of allFilms) {
      await Film.findOneAndUpdate({ id: film.id }, film, { upsert: true, new: true });
    }
    console.log(`✅ Seeded ${allFilms.length} films (${homeFilms.length} production + ${weddingFilms.length} wedding/home)`);

    await Collaborator.deleteMany({});
    await Collaborator.insertMany(collaborators);
    console.log(`✅ Seeded ${collaborators.length} collaborators`);

    const settingsExists = await SiteSettings.findOne();
    if (!settingsExists) {
      await SiteSettings.create(defaultSettings);
      console.log('✅ Site settings created');
    } else {
      console.log('⏭  Site settings already exist, skipping');
    }

    console.log('\n🎬 Seed complete! Your database is ready.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

seed();
