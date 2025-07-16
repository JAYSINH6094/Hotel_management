const express = require('express');
const db = require('../config/db');
const router = express.Router();

// List all bookings (optionally filter by user_id)
router.get('/', (req, res) => {
  const userId = req.query.user_id;
  let sql = 'SELECT * FROM bookings';
  let params = [];
  if (userId) {
    sql += ' WHERE user_id = ?';
    params.push(userId);
  }
  sql += ' ORDER BY created_at DESC';
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Create a booking
router.post('/', (req, res) => {
  const { user_id, room_id, check_in, check_out, guest_name, guest_email, guest_phone, guest_count, payment_method, special_requests } = req.body;
  if (!user_id || !room_id || !check_in || !check_out) {
    return res.status(400).json({ error: 'Missing required fields: user_id, room_id, check_in, check_out' });
  }
  db.query('SELECT * FROM rooms WHERE id = ?', [room_id], (err, roomResults) => {
    if (err) return res.status(500).json({ error: err.message });
    if (roomResults.length === 0) return res.status(400).json({ error: 'Room does not exist.' });
    db.query('SELECT * FROM users WHERE id = ?', [user_id], (err, userResults) => {
      if (err) return res.status(500).json({ error: err.message });
      if (userResults.length === 0) return res.status(400).json({ error: 'User does not exist.' });
      const checkInDate = new Date(check_in);
      const checkOutDate = new Date(check_out);
      const daysDiff = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      const totalAmount = roomResults[0].price * daysDiff;
      db.query(
        `INSERT INTO bookings (user_id, room_id, check_in, check_out, guest_name, guest_email, guest_phone, guest_count, payment_method, special_requests, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [user_id, room_id, check_in, check_out, guest_name || userResults[0].name, guest_email || userResults[0].email, guest_phone || userResults[0].phone, guest_count || 1, payment_method || 'cash', special_requests || null, totalAmount],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ id: result.insertId, message: 'Booking created successfully' });
        }
      );
    });
  });
});

// Update a booking
router.put('/:id', (req, res) => {
  const { check_in, check_out, guest_name, guest_email, guest_phone, guest_count, payment_method, special_requests, status } = req.body;
  db.query(
    'UPDATE bookings SET check_in = ?, check_out = ?, guest_name = ?, guest_email = ?, guest_phone = ?, guest_count = ?, payment_method = ?, special_requests = ?, status = ? WHERE id = ?',
    [check_in, check_out, guest_name, guest_email, guest_phone, guest_count, payment_method, special_requests, status, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: 'Booking updated successfully' });
    }
  );
});

// Delete booking
router.delete('/:id', (req, res) => {
  const bookingId = req.params.id;
  db.query('DELETE FROM bookings WHERE id = ?', [bookingId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Booking deleted.' });
  });
});

module.exports = router; 