const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  text:   { type: String, required: true },
  source: { type: String, required: true }
}, { _id: false });

const awardSchema = new mongoose.Schema({
  logo:     { type: String },
  category: { type: String },
  title:    { type: String }
}, { _id: false });

const creditSchema = new mongoose.Schema({
  role: { type: String, required: true },
  name: { type: String, required: true }
}, { _id: false });

const filmSchema = new mongoose.Schema({
  // ── Core identity ──
  id:           { type: String, required: true, unique: true }, // URL slug e.g. 'savoy'
  title:        { type: String, required: true },
  category:     { type: String, required: true },   // 'Documentary', 'Feature Film', etc.
  year:         { type: String, required: true },
  director:     { type: String, required: true },

  // ── Media ──
  stillImage:   { type: String, required: true },   // Primary card image URL
  trailerVideo: { type: String },                   // Video URL
  hero_image:   { type: String },                   // Detail page hero image
  director_image: { type: String },                 // Director portrait
  gallery_images: [{ type: String }],               // Array of still URLs

  // ── Awards / Festival ──
  awardYear:   { type: String },
  awardLaurel: { type: String },
  awardLogo:   { type: String },

  // ── Content ──
  reviews:  { type: [reviewSchema], default: [] },
  awards:   { type: [awardSchema],  default: [] },
  credits:  { type: [creditSchema], default: [] },
  investors: { type: String },

  // ── Display order ──
  order: { type: Number, default: 0 },

  // ── Visibility ──
  published: { type: Boolean, default: true }

}, { timestamps: true });

module.exports = mongoose.model('Film', filmSchema);
