/**
 * Seed Script — imports all existing static data into MongoDB
 *
 * Run once with:  npm run seed
 *
 * This script:
 * 1. Creates the admin user (using ADMIN_EMAIL + ADMIN_PASSWORD from .env)
 * 2. Imports all films from the frontend data files
 * 3. Imports all collaborators
 * 4. Creates the default site settings document
 */

require('dotenv').config();
const mongoose     = require('mongoose');
const Film         = require('../models/Film');
const Collaborator = require('../models/Collaborator');
const SiteSettings = require('../models/SiteSettings');
const Admin        = require('../models/Admin');

// ── Existing frontend data ──────────────────────────────
const homeFilms = [
  {
    id: 'savoy', title: 'Savoy', category: 'Documentary', year: '2022',
    director: 'Zohar Wagner', order: 0,
    stillImage: 'https://cdn.prod.website-files.com/673306db3b111afa559bc378/675eb91e5fafbd1f37953c10_savoy.webp',
    trailerVideo: 'https://cdn.jsdelivr.net/gh/niccolomiranda/elephant/Savoy-01.mp4',
    awardYear: '2022', awardLaurel: 'Best Director & Editing Award',
    awardLogo: 'https://cdn.prod.website-files.com/673306db3b111afa559bc378/679211be9a26425f2f94212a_JFF.webp',
    reviews: [
      { text: '"Fast-paced and engrossing"', source: 'Weizman National Museum' },
      { text: '"History through a heroine"', source: 'SF Jewish Film Festival' },
      { text: '"Brave, poetic, liberated"', source: 'E-Walla' }
    ]
  },
  {
    id: 'moon-in-the-12th-house', title: 'Moon in the 12th House', category: 'Feature Film',
    year: '2014', director: 'Dorit Hakim Kramer', order: 1,
    stillImage: 'https://cdn.prod.website-files.com/673306db3b111afa559bc378/67923c109ebd8d8a03e4960c_moon.jpg',
    trailerVideo: 'https://cdn.jsdelivr.net/gh/niccolomiranda/elephant/Moon.mp4',
    awardYear: '2014', awardLaurel: 'Jerusalem Film Festival',
    awardLogo: 'https://cdn.prod.website-files.com/673306db3b111afa559bc378/679211be9a26425f2f94212a_JFF.webp',
    reviews: [
      { text: '"Breathtaking cinematography"', source: 'Salona' },
      { text: '"Delicate and moving"', source: 'HaBama' },
      { text: '"Pure cinematic beauty"', source: 'SIFF Jury Statement' }
    ]
  },
  {
    id: 'taboo', title: 'Taboo', category: 'Documentary', year: '2024',
    director: 'Shauly Melamed', order: 2,
    stillImage: 'https://cdn.prod.website-files.com/673306db3b111afa559bc378/675eb903f604a7a856c87467_taboo.webp',
    trailerVideo: 'https://cdn.jsdelivr.net/gh/niccolomiranda/elephant/Taboo-01.mp4',
    awardYear: '2024', awardLaurel: 'World Premiere',
    awardLogo: 'https://cdn.prod.website-files.com/673306db3b111afa559bc378/678e53c20255431b422d2a82_International%20Film%20Festival%20Rotterdam.webp',
    reviews: [
      { text: '"Touching and intimate"', source: 'POV Magazine' },
      { text: '"Groundbreaking LGBTQ+ cinema"', source: 'POV Magazine' },
      { text: '"Confronting cultural taboos"', source: 'POV Magazine' }
    ]
  },
  {
    id: 'kafkas-last-trial', title: "Kafka's Last Trial", category: 'Documentary',
    year: '2024', director: 'Eliran Peled', order: 3,
    stillImage: 'https://cdn.prod.website-files.com/673306db3b111afa559bc378/67923c37a45465ae82ee3f8b_kafka.jpg',
    trailerVideo: 'https://cdn.jsdelivr.net/gh/niccolomiranda/elephant/Kafka-01.mp4',
    awardYear: '2024', awardLaurel: 'Haifa Film Festival',
    awardLogo: 'https://cdn.prod.website-files.com/673306db3b111afa559bc378/679207ea247d7e0f606ff70d_attachment%201.webp',
    reviews: [
      { text: '"A genius nowhere at home"', source: 'Critical Acclaim' },
      { text: '"A real-life Kafkaesque trial"', source: 'Critical Acclaim' },
      { text: '"The case of a literary legacy"', source: 'Critical Acclaim' }
    ]
  },
  {
    id: 'my-project-x', title: 'My Project X', category: 'Documentary', year: '2024',
    director: 'Limor Pinhasov', order: 4,
    stillImage: 'https://cdn.prod.website-files.com/673306db3b111afa559bc378/67923c1fa550c616a38131b9_project.jpg',
    trailerVideo: 'https://cdn.jsdelivr.net/gh/niccolomiranda/elephant/Project_X-01.mp4',
    awardYear: '2024', awardLaurel: 'National competition of Docaviv',
    awardLogo: 'https://cdn.prod.website-files.com/673306db3b111afa559bc378/678e5718a9496c3b77c64191_DOCAVIV.webp',
    reviews: [
      { text: '"A fascinating Voyage"', source: 'Critical Acclaim' },
      { text: '"A Film based on a true story"', source: 'Critical Acclaim' },
      { text: '"Riveting Soundtrack"', source: 'Critical Acclaim' }
    ]
  },
  {
    id: 'ana-maxim', title: 'Ana Maxim', category: 'Short Film', year: '2024',
    director: 'Yoni Handelsman', order: 5,
    stillImage: 'https://cdn.prod.website-files.com/673306db3b111afa559bc378/67923c551123732db723b050_ana.jpg',
    trailerVideo: 'https://cdn.jsdelivr.net/gh/niccolomiranda/elephant/Ana_Maxim.mp4',
    awardYear: '2024', awardLaurel: 'The Cinema South Film Festival',
    awardLogo: 'https://cdn.prod.website-files.com/673306db3b111afa559bc378/678e53fbd679a4bb8301a33a_Cinema%20South%20Festival.webp',
    reviews: [
      { text: '"Inspiring true story"', source: 'The Armenian Report' },
      { text: '"Best Feature Film at Pomegranate Festival"', source: 'Armenpress' },
      { text: '"Emotional and powerful portrayal"', source: 'The Armenian Report' }
    ]
  },
  {
    id: 'outsider-freud', title: 'Outsider Freud', category: 'Documentary', year: '2024',
    director: 'Yair Qedar', order: 6,
    stillImage: 'https://cdn.prod.website-files.com/673306db3b111afa559bc378/67923c44b96499e7828b3f02_freud.jpg',
    trailerVideo: 'https://cdn.jsdelivr.net/gh/niccolomiranda/elephant/Freud-01.mp4',
    awardYear: '2024', awardLaurel: 'Official Selection',
    awardLogo: 'https://cdn.prod.website-files.com/673306db3b111afa559bc378/679211be9a26425f2f94212a_JFF.webp',
    reviews: [
      { text: '"Intense intellectual journey"', source: 'Haaretz' },
      { text: '"Sheds new light on Freud"', source: 'Le Monde' },
      { text: '"Visually inventive"', source: 'Variety' }
    ]
  },
  {
    id: 'by-any-means', title: 'By Any Means', category: 'Feature Film', year: '2026',
    director: 'Elegance Bratton', order: 7,
    stillImage: 'https://cdn.prod.website-files.com/673306db3b111afa559bc378/6a2904197526731405fcce8a_BYANYMEANS_2024-04-28_EJA-02511_R1.JPG',
    trailerVideo: 'https://cdn.jsdelivr.net/gh/niccolomiranda/elephant/Savoy-01.mp4',
    awardYear: '2026', awardLaurel: 'Official Selection',
    awardLogo: 'https://cdn.prod.website-files.com/6728a72e769070a603d43c13/673757a6e5e1b7a35e562945_cannes.png',
    reviews: [
      { text: '"A visual tour de force"', source: 'Hollywood Reporter' },
      { text: '"Bold and uncompromising"', source: 'Screen International' },
      { text: '"Superb performances"', source: 'Variety' }
    ]
  }
];

const collaborators = [
  { name: 'A24',        type: 'DISTRIBUTOR / GLOBAL',    order: 0 },
  { name: 'SAM SPIEGEL', type: 'FILM SCHOOL ACADEMY',    order: 1 },
  { name: 'HBO',        type: 'CO-PRODUCTION NETWORK',   order: 2 },
  { name: 'DOCAVIV',    type: 'FESTIVAL CO-FOUNDER',     order: 3 }
];

const defaultSettings = {
  email:        'lee@elephantproduction.com',
  phone:        '+972-54-2804049',
  address:      'Dizengoff ST, 123, Tel Aviv',
  emailSubject: 'Project Inquiry',
  instagram:    'https://www.instagram.com/elephantfilmfoundation/',
  facebook:     'https://www.facebook.com/profile.php?id=61572313858308',
  linkedin:     'https://www.linkedin.com/company/elephant-film-foundation/',
  siteTitle:    'Elephant Production'
};

// ── Main seed function ──────────────────────────────────
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Create admin user
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      await Admin.create({
        email:    process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        name:     'Admin'
      });
      console.log(`✅ Admin created: ${process.env.ADMIN_EMAIL}`);
    } else {
      console.log(`⏭  Admin already exists: ${process.env.ADMIN_EMAIL}`);
    }

    // 2. Seed films (upsert by slug id)
    for (const film of homeFilms) {
      await Film.findOneAndUpdate({ id: film.id }, film, { upsert: true, new: true });
    }
    console.log(`✅ Seeded ${homeFilms.length} films`);

    // 3. Seed collaborators (clear and re-insert)
    await Collaborator.deleteMany({});
    await Collaborator.insertMany(collaborators);
    console.log(`✅ Seeded ${collaborators.length} collaborators`);

    // 4. Create or update site settings
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
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
