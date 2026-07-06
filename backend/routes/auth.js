const express  = require('express');
const jwt      = require('jsonwebtoken');
const Admin    = require('../models/Admin');
const router   = express.Router();

// POST /api/auth/login
// Body: { email, password }
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      admin: { id: admin._id, email: admin.email, name: admin.name }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/me  — verify token & return current admin
const auth = require('../middleware/auth');
router.get('/me', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
