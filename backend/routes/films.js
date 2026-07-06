const express = require('express');
const Film    = require('../models/Film');
const auth    = require('../middleware/auth');
const router  = express.Router();

// ─────────────────────────────────────────────────────────
// PUBLIC ROUTES (no token needed — used by the frontend)
// ─────────────────────────────────────────────────────────

// GET /api/films — Get all published films (ordered by display order)
router.get('/', async (req, res) => {
  try {
    const films = await Film.find({ published: true }).sort({ order: 1 }).lean();
    res.json(films);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/films/:id — Get a single film by slug (e.g. 'savoy')
router.get('/:id', async (req, res) => {
  try {
    const film = await Film.findOne({ id: req.params.id, published: true }).lean();
    if (!film) return res.status(404).json({ error: 'Film not found' });
    res.json(film);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────
// ADMIN ROUTES (JWT token required)
// ─────────────────────────────────────────────────────────

// GET /api/films/admin/all — Get ALL films (including unpublished)
router.get('/admin/all', auth, async (req, res) => {
  try {
    const films = await Film.find().sort({ order: 1 }).lean();
    res.json(films);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/films — Create a new film
router.post('/', auth, async (req, res) => {
  try {
    const film = new Film(req.body);
    await film.save();
    res.status(201).json(film);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: `Film with id "${req.body.id}" already exists` });
    }
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/films/:id — Update a film by slug
router.put('/:id', auth, async (req, res) => {
  try {
    const film = await Film.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!film) return res.status(404).json({ error: 'Film not found' });
    res.json(film);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/films/:id — Delete a film by slug
router.delete('/:id', auth, async (req, res) => {
  try {
    const film = await Film.findOneAndDelete({ id: req.params.id });
    if (!film) return res.status(404).json({ error: 'Film not found' });
    res.json({ message: `Film "${film.title}" deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/films/:id/toggle — Toggle published/unpublished
router.patch('/:id/toggle', auth, async (req, res) => {
  try {
    const film = await Film.findOne({ id: req.params.id });
    if (!film) return res.status(404).json({ error: 'Film not found' });
    film.published = !film.published;
    await film.save();
    res.json({ id: film.id, published: film.published });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
