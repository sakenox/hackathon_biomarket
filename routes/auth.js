const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

const albanianCities = [
    "Tirana", "Durrës", "Vlorë", "Shkodër", "Elbasan",
    "Korçë", "Fier", "Berat", "Lushnjë", "Pogradec"
  ];
// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName, type, city } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email exists' });

    if (type === 'farmer' && !albanianCities.includes(city)) {
        return res.status(400).json({ error: 'Invalid city selection' });
      }

    const user = new User({
      email,
      password: await bcrypt.hash(password, 12),
      type,
      fullName,
      city: type === 'farmer' ? city : undefined
    });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.userId = user._id;
    req.session.userType = user.type;
    console.log('Session after login:', req.session);
    res.json({ 
      message: 'Logged in', 
      user: { id: user._id, type: user.type, name: user.name } 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
});

// Get current user
router.get('/me', async (req, res) => {
    if (!req.session.userId) return res.status(401).json(null);

    try {
        const user = await User.findById(req.session.userId)
        .select('-password -location -__v');
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;