const express      = require('express');
const SiteSettings = require('../models/SiteSettings');
const auth         = require('../middleware/auth');
const router       = express.Router();

// GET /api/settings — Public: get site settings (contact info, socials)
router.get('/', async (req, res) => {
  try {
    // There's only ever one settings document — get or create it
    let settings = await SiteSettings.findOne().lean();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/settings — Admin: update site settings
router.put('/', auth, async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
