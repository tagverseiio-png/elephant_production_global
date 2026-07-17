import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Film from '../models/Film';
import Collaborator from '../models/Collaborator';
import SiteSettings from '../models/SiteSettings';
import Admin from '../models/Admin';

const homeFilms = [
  {
    id: 'savoy',
    title: 'Savoy',
    category: 'Documentary',
    year: '2022',
    director: 'Zohar Wagner',
    order: 0,
    stillImage:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/675eb91e5fafbd1f37953c10_savoy.webp',
    hero_image:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/675eb91e5fafbd1f37953c10_savoy.webp',
    trailerVideo:
      'https://cdn.jsdelivr.net/gh/niccolomiranda/elephant/Savoy-01.mp4',
    awardYear: '2022',
    awardLaurel: 'Best Director & Editing Award',
    awardLogo:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/679211be9a26425f2f94212a_JFF.webp',
    reviews: [
      { text: '"Fast-paced and engrossing"', source: 'Weizman National Museum' },
      { text: '"History through a heroine"', source: 'SF Jewish Film Festival' },
      { text: '"Brave, poetic, liberated"', source: 'E-Walla' },
    ],
    awards: [
      { logo: '', category: 'Best Director & Editing Award', title: 'JFF 2022' },
    ],
    credits: [
      { role: 'Director', name: 'Zohar Wagner' },
      { role: 'Producer', name: 'Lee Shira' },
      { role: 'Executive Producer', name: 'Dorit Hakim Kramer' },
      { role: 'Director of Photography', name: 'Moshe Mishaly' },
      { role: 'Editor', name: 'Shauly Melamed' },
    ],
  },
  {
    id: 'moon-in-the-12th-house',
    title: 'Moon in the 12th House',
    category: 'Feature Film',
    year: '2014',
    director: 'Dorit Hakim Kramer',
    order: 1,
    stillImage:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/67923c109ebd8d8a03e4960c_moon.jpg',
    hero_image:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/67923c109ebd8d8a03e4960c_moon.jpg',
    trailerVideo: 'https://cdn.jsdelivr.net/gh/niccolomiranda/elephant/Moon.mp4',
    awardYear: '2014',
    awardLaurel: 'Jerusalem Film Festival',
    awardLogo:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/679211be9a26425f2f94212a_JFF.webp',
    reviews: [
      { text: '"Breathtaking cinematography"', source: 'Salona' },
      { text: '"Delicate and moving"', source: 'HaBama' },
      { text: '"Pure cinematic beauty"', source: 'SIFF Jury Statement' },
    ],
    awards: [
      { logo: '', category: 'Jerusalem Film Festival', title: 'Official Selection 2014' },
    ],
    credits: [
      { role: 'Director', name: 'Dorit Hakim Kramer' },
      { role: 'Producer', name: 'Lee Shira' },
      { role: 'Executive Producer', name: 'Zohar Wagner' },
      { role: 'Director of Photography', name: 'Moshe Mishaly' },
      { role: 'Editor', name: 'Shauly Melamed' },
    ],
  },
  {
    id: 'taboo',
    title: 'Taboo',
    category: 'Documentary',
    year: '2024',
    director: 'Shauly Melamed',
    order: 2,
    stillImage:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/675eb903f604a7a856c87467_taboo.webp',
    hero_image:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/675eb903f604a7a856c87467_taboo.webp',
    trailerVideo: 'https://cdn.jsdelivr.net/gh/niccolomiranda/elephant/Taboo-01.mp4',
    awardYear: '2024',
    awardLaurel: 'World Premiere',
    awardLogo:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/678e53c20255431b422d2a82_International%20Film%20Festival%20Rotterdam.webp',
    reviews: [
      { text: '"Touching and intimate"', source: 'POV Magazine' },
      { text: '"Groundbreaking LGBTQ+ cinema"', source: 'POV Magazine' },
      { text: '"Confronting cultural taboos"', source: 'POV Magazine' },
    ],
    awards: [
      { logo: 'https://cdn.prod.website-files.com/673306db3b111afa559bc378/678e53c20255431b422d2a82_International%20Film%20Festival%20Rotterdam.webp', category: 'World Premiere', title: 'International Film Festival Rotterdam' },
    ],
    credits: [
      { role: 'Director', name: 'Shauly Melamed' },
      { role: 'Producer', name: 'Lee Shira' },
      { role: 'Executive Producer', name: 'Dorit Hakim Kramer' },
      { role: 'Director of Photography', name: 'Moshe Mishaly' },
      { role: 'Editor', name: 'Zohar Wagner' },
    ],
  },
  {
    id: 'kafkas-last-trial',
    title: "Kafka's Last Trial",
    category: 'Documentary',
    year: '2024',
    director: 'Eliran Peled',
    order: 3,
    stillImage:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/67923c37a45465ae82ee3f8b_kafka.jpg',
    hero_image:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/67923c37a45465ae82ee3f8b_kafka.jpg',
    trailerVideo: 'https://cdn.jsdelivr.net/gh/niccolomiranda/elephant/Kafka-01.mp4',
    awardYear: '2024',
    awardLaurel: 'Haifa Film Festival',
    awardLogo:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/679207ea247d7e0f606ff70d_attachment%201.webp',
    reviews: [
      { text: '"A genius nowhere at home"', source: 'Critical Acclaim' },
      { text: '"A real-life Kafkaesque trial"', source: 'Critical Acclaim' },
      { text: '"The case of a literary legacy"', source: 'Critical Acclaim' },
    ],
    awards: [
      { logo: '', category: 'Haifa Film Festival', title: 'Official Selection 2024' },
    ],
    credits: [
      { role: 'Director', name: 'Eliran Peled' },
      { role: 'Producer', name: 'Lee Shira' },
      { role: 'Executive Producer', name: 'Dorit Hakim Kramer' },
      { role: 'Director of Photography', name: 'Moshe Mishaly' },
      { role: 'Editor', name: 'Shauly Melamed' },
    ],
  },
  {
    id: 'my-project-x',
    title: 'My Project X',
    category: 'Documentary',
    year: '2024',
    director: 'Limor Pinhasov',
    order: 4,
    stillImage:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/67923c1fa550c616a38131b9_project.jpg',
    hero_image:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/67923c1fa550c616a38131b9_project.jpg',
    trailerVideo: 'https://cdn.jsdelivr.net/gh/niccolomiranda/elephant/Project_X-01.mp4',
    awardYear: '2024',
    awardLaurel: 'National competition of Docaviv',
    awardLogo:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/678e5718a9496c3b77c64191_DOCAVIV.webp',
    reviews: [
      { text: '"A fascinating Voyage"', source: 'Critical Acclaim' },
      { text: '"A Film based on a true story"', source: 'Critical Acclaim' },
      { text: '"Riveting Soundtrack"', source: 'Critical Acclaim' },
    ],
    awards: [
      { logo: '', category: 'National competition of Docaviv', title: 'Docaviv 2024' },
    ],
    credits: [
      { role: 'Director', name: 'Limor Pinhasov' },
      { role: 'Producer', name: 'Lee Shira' },
      { role: 'Executive Producer', name: 'Dorit Hakim Kramer' },
      { role: 'Director of Photography', name: 'Moshe Mishaly' },
      { role: 'Editor', name: 'Shauly Melamed' },
    ],
  },
  {
    id: 'ana-maxim',
    title: 'Ana Maxim',
    category: 'Short Film',
    year: '2024',
    director: 'Yoni Handelsman',
    order: 5,
    stillImage:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/67923c551123732db723b050_ana.jpg',
    hero_image:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/67923c551123732db723b050_ana.jpg',
    trailerVideo: 'https://cdn.jsdelivr.net/gh/niccolomiranda/elephant/Ana_Maxim.mp4',
    awardYear: '2024',
    awardLaurel: 'The Cinema South Film Festival',
    awardLogo:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/678e53fbd679a4bb8301a33a_Cinema%20South%20Festival.webp',
    reviews: [
      { text: '"Inspiring true story"', source: 'The Armenian Report' },
      { text: '"Best Feature Film at Pomegranate Festival"', source: 'Armenpress' },
      { text: '"Emotional and powerful portrayal"', source: 'The Armenian Report' },
    ],
    awards: [
      { logo: '', category: 'The Cinema South Film Festival', title: 'Official Selection 2024' },
    ],
    credits: [
      { role: 'Director', name: 'Yoni Handelsman' },
      { role: 'Producer', name: 'Lee Shira' },
      { role: 'Executive Producer', name: 'Dorit Hakim Kramer' },
      { role: 'Director of Photography', name: 'Moshe Mishaly' },
      { role: 'Editor', name: 'Shauly Melamed' },
    ],
  },
  {
    id: 'outsider-freud',
    title: 'Outsider Freud',
    category: 'Documentary',
    year: '2024',
    director: 'Yair Qedar',
    order: 6,
    stillImage:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/67923c44b96499e7828b3f02_freud.jpg',
    hero_image:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/67923c44b96499e7828b3f02_freud.jpg',
    trailerVideo: 'https://cdn.jsdelivr.net/gh/niccolomiranda/elephant/Freud-01.mp4',
    awardYear: '2024',
    awardLaurel: 'Official Selection',
    awardLogo:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/679211be9a26425f2f94212a_JFF.webp',
    reviews: [
      { text: '"Intense intellectual journey"', source: 'Haaretz' },
      { text: '"Sheds new light on Freud"', source: 'Le Monde' },
      { text: '"Visually inventive"', source: 'Variety' },
    ],
    awards: [
      { logo: '', category: 'Official Selection', title: 'Jerusalem Film Festival 2024' },
    ],
    credits: [
      { role: 'Director', name: 'Yair Qedar' },
      { role: 'Producer', name: 'Lee Shira' },
      { role: 'Executive Producer', name: 'Dorit Hakim Kramer' },
      { role: 'Director of Photography', name: 'Moshe Mishaly' },
      { role: 'Editor', name: 'Shauly Melamed' },
    ],
  },
  {
    id: 'by-any-means',
    title: 'By Any Means',
    category: 'Feature Film',
    year: '2026',
    director: 'Elegance Bratton',
    order: 7,
    stillImage:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/6a2904197526731405fcce8a_BYANYMEANS_2024-04-28_EJA-02511_R1.JPG',
    hero_image:
      'https://cdn.prod.website-files.com/673306db3b111afa559bc378/6a2904197526731405fcce8a_BYANYMEANS_2024-04-28_EJA-02511_R1.JPG',
    trailerVideo: 'https://cdn.jsdelivr.net/gh/niccolomiranda/elephant/Savoy-01.mp4',
    awardYear: '2026',
    awardLaurel: 'Official Selection',
    awardLogo:
      'https://cdn.prod.website-files.com/6728a72e769070a603d43c13/673757a6e5e1b7a35e562945_cannes.png',
    reviews: [
      { text: '"A visual tour de force"', source: 'Hollywood Reporter' },
      { text: '"Bold and uncompromising"', source: 'Screen International' },
      { text: '"Superb performances"', source: 'Variety' },
    ],
    awards: [
      { logo: '', category: 'Official Selection', title: 'Cannes Film Festival 2026' },
    ],
    credits: [
      { role: 'Director', name: 'Elegance Bratton' },
      { role: 'Producer', name: 'Lee Shira' },
      { role: 'Executive Producer', name: 'Dorit Hakim Kramer' },
      { role: 'Director of Photography', name: 'Moshe Mishaly' },
      { role: 'Editor', name: 'Shauly Melamed' },
    ],
  },
];

const weddingFilms = [
  {
    id: 'wedding1',
    title: 'Wedding 1',
    category: 'Wedding',
    year: '2024',
    director: 'Harry',
    order: 8,
    stillImage: '/api/media/wedding1/DSC03084_websize.jpg',
    hero_image: '/api/media/wedding1/DSC03084_websize.jpg',
    director_image: '/api/media/wedding1/DSC03084_websize.jpg',
    trailerVideo: '',
    gallery_images: [
      '/api/media/wedding1/DSC02481_websize.jpg',
      '/api/media/wedding1/DSC02509_websize.jpg',
      '/api/media/wedding1/DSC02918_websize.jpg',
      '/api/media/wedding1/DSC03065_websize.jpg',
      '/api/media/wedding1/DSC03084_websize.jpg',
      '/api/media/wedding1/DSC03332_websize.jpg',
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
    year: '2023',
    director: 'Harry',
    order: 9,
    stillImage: '/api/media/wedding2/untitled-20_websize.jpg',
    hero_image: '/api/media/wedding2/untitled-20_websize.jpg',
    director_image: '/api/media/wedding2/untitled-20_websize.jpg',
    trailerVideo: '',
    gallery_images: [
      '/api/media/wedding2/untitled-8_websize.jpg',
      '/api/media/wedding2/untitled-14_websize.jpg',
      '/api/media/wedding2/untitled-15_websize.jpg',
      '/api/media/wedding2/untitled-20_websize.jpg',
      '/api/media/wedding2/untitled-21_websize.jpg',
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
    year: '2023',
    director: 'Harry',
    order: 10,
    stillImage: '/api/media/wedding3/SAN06334_websize.jpg',
    hero_image: '/api/media/wedding3/SAN06334_websize.jpg',
    director_image: '/api/media/wedding3/SAN06334_websize.jpg',
    trailerVideo: '',
    gallery_images: [
      '/api/media/wedding3/SAN05902_websize.jpg',
      '/api/media/wedding3/SAN06209_websize.jpg',
      '/api/media/wedding3/SAN06334_websize.jpg',
    ],
    reviews: [{ text: '"Absolutely stunning"', source: 'Client' }],
  },
  {
    id: 'wedding4',
    title: 'Wedding 4',
    category: 'Wedding',
    year: '2023',
    director: 'Harry',
    order: 11,
    stillImage: '/api/media/wedding4/NIR08050_websize.jpg',
    hero_image: '/api/media/wedding4/NIR08050_websize.jpg',
    director_image: '/api/media/wedding4/NIR08050_websize.jpg',
    trailerVideo: '',
    gallery_images: [
      '/api/media/wedding4/NIR08050_websize.jpg',
      '/api/media/wedding4/PGE270_websize.jpg',
      '/api/media/wedding4/PGE319_websize.jpg',
    ],
    reviews: [{ text: '"Magical photography"', source: 'Client' }],
  },
  {
    id: 'wedding5',
    title: 'Wedding 5',
    category: 'Wedding',
    year: '2024',
    director: 'Harry',
    order: 12,
    stillImage: '/api/media/wedding5/02_websize.jpg',
    hero_image: '/api/media/wedding5/02_websize.jpg',
    director_image: '/api/media/wedding5/02_websize.jpg',
    trailerVideo: '',
    gallery_images: [
      '/api/media/wedding5/02_websize.jpg',
      '/api/media/wedding5/03_websize.jpg',
    ],
    reviews: [{ text: '"We are in awe"', source: 'Client' }],
  },
  {
    id: 'wedding6',
    title: 'Wedding 6',
    category: 'Wedding',
    year: '2024',
    director: 'Harry',
    order: 13,
    stillImage: '/api/media/wedding6/DSC00529_websize.jpg',
    hero_image: '/api/media/wedding6/DSC00529_websize.jpg',
    director_image: '/api/media/wedding6/DSC00529_websize.jpg',
    trailerVideo: '',
    gallery_images: [
      '/api/media/wedding6/DSC00529_websize.jpg',
      '/api/media/wedding6/DSC00544_websize.jpg',
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
