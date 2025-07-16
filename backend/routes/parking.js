const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Get all parking slots
router.get('/slots', (req, res) => {
  db.query('SELECT * FROM parking_slots ORDER BY slot_number', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get all parking bookings
router.get('/bookings', (req, res) => {
  db.query('SELECT pb.*, ps.slot_number, ps.type, ps.price_per_day, ps.location, ps.features FROM parking_bookings pb JOIN parking_slots ps ON pb.parking_slot_id = ps.id ORDER BY pb.created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Create a parking booking
router.post('/bookings', (req, res) => {
  const { user_id, parking_slot_id, vehicle_number, vehicle_type, check_in_date, check_out_date, payment_method } = req.body;
  if (!user_id || !parking_slot_id || !check_in_date || !check_out_date) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  db.query('SELECT * FROM parking_slots WHERE id = ?', [parking_slot_id], (err, slotResults) => {
    if (err) return res.status(500).json({ error: err.message });
    if (slotResults.length === 0) return res.status(400).json({ error: 'Parking slot not found.' });
    db.query('SELECT * FROM users WHERE id = ?', [user_id], (err, userResults) => {
      if (err) return res.status(500).json({ error: err.message });
      if (userResults.length === 0) return res.status(400).json({ error: 'User not found.' });
      const days = Math.ceil((new Date(check_out_date) - new Date(check_in_date)) / (1000 * 60 * 60 * 24));
      const total_amount = days * slotResults[0].price_per_day;
      db.query('INSERT INTO parking_bookings (user_id, parking_slot_id, vehicle_number, vehicle_type, check_in_date, check_out_date, total_amount, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [user_id, parking_slot_id, vehicle_number || null, vehicle_type || null, check_in_date, check_out_date, total_amount, payment_method || 'cash'], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, message: 'Parking booking created successfully' });
      });
    });
  });
});

// Update a parking booking
router.put('/bookings/:id', (req, res) => {
  const { parking_slot_id, vehicle_number, vehicle_type, check_in_date, check_out_date, payment_method, status } = req.body;
  db.query(
    'UPDATE parking_bookings SET parking_slot_id = ?, vehicle_number = ?, vehicle_type = ?, check_in_date = ?, check_out_date = ?, payment_method = ?, status = ? WHERE id = ?',
    [parking_slot_id, vehicle_number, vehicle_type, check_in_date, check_out_date, payment_method, status, req.params.id],
    (err, result) => {
      if (err) {
        console.error('Error updating parking booking:', err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true, message: 'Parking booking updated successfully' });
    }
  );
});

// Delete a parking booking
router.delete('/bookings/:id', (req, res) => {
  db.query('DELETE FROM parking_bookings WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Parking booking deleted successfully' });
  });
});

module.exports = router; 