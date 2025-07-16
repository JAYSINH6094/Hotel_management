const express = require('express');
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Register
router.post('/register', (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) return res.status(400).json({ error: 'Email already registered.' });
    const hash = bcrypt.hashSync(password, 10);
    db.query('INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)', [name, email, hash, phone], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, name, email, phone });
    });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required.' });
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(400).json({ error: 'Invalid email or password.' });
    const user = results[0];
    if (!bcrypt.compareSync(password, user.password)) return res.status(400).json({ error: 'Invalid email or password.' });
    res.json({ id: user.id, name: user.name, email: user.email, phone: user.phone });
  });
});

// Get user info
router.get('/:id', (req, res) => {
  db.query('SELECT id, name, email, phone, created_at FROM users WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found.' });
    res.json(results[0]);
  });
});

// Admin Login
router.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  // Simple hardcoded admin credentials (replace with DB check in production)
  if (username === 'admin' && password === 'admin123') {
    return res.json({ success: true, token: 'admin-token' });
  } else {
    return res.status(401).json({ error: 'Invalid admin credentials' });
  }
});

// Get all users (for admin)
router.get('/', (req, res) => {
  db.query('SELECT id, name, email, phone, created_at FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router; 