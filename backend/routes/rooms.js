const express = require('express');
const db = require('../config/db');
const router = express.Router();

// List all rooms
router.get('/', (req, res) => {
  db.query('SELECT * FROM rooms', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get room details
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM rooms WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Room not found.' });
    res.json(results[0]);
  });
});

module.exports = router; 