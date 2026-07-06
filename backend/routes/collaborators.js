const express      = require('express');
const Collaborator = require('../models/Collaborator');
const auth         = require('../middleware/auth');
const router       = express.Router();

// GET /api/collaborators — Public: list all collaborators
router.get('/', async (req, res) => {
  try {
    const collaborators = await Collaborator.find().sort({ order: 1 }).lean();
    res.json(collaborators);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/collaborators — Admin: add collaborator
router.post('/', auth, async (req, res) => {
  try {
    const collab = new Collaborator(req.body);
    await collab.save();
    res.status(201).json(collab);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/collaborators/:id — Admin: update collaborator
router.put('/:id', auth, async (req, res) => {
  try {
    const collab = await Collaborator.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!collab) return res.status(404).json({ error: 'Collaborator not found' });
    res.json(collab);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/collaborators/:id — Admin: delete collaborator
router.delete('/:id', auth, async (req, res) => {
  try {
    const collab = await Collaborator.findByIdAndDelete(req.params.id);
    if (!collab) return res.status(404).json({ error: 'Collaborator not found' });
    res.json({ message: 'Collaborator deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
