const mongoose = require('mongoose');

// Singleton document — only one row ever exists
const siteSettingsSchema = new mongoose.Schema({
  // Contact info
  email:        { type: String, default: 'lee@elephantproduction.com' },
  phone:        { type: String, default: '+972-54-2804049' },
  address:      { type: String, default: 'Dizengoff ST, 123, Tel Aviv' },
  emailSubject: { type: String, default: 'Project Inquiry' },

  // Social links
  instagram: { type: String },
  facebook:  { type: String },
  linkedin:  { type: String },

  // SEO / Meta
  siteTitle:       { type: String, default: 'Elephant Production' },
  siteDescription: { type: String }

}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
