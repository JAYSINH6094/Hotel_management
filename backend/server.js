const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the parent directory (project root)
app.use(express.static(path.join(__dirname, '..')));

// Use the MySQL connection pool from config/db.js
const db = require('./config/db');
console.log('Connected to MySQL database (via pool)');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Example: Get all rooms
app.get('/api/rooms', (req, res) => {
  db.query('SELECT * FROM rooms', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.use('/api/users', require('./routes/users'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/parking', require('./routes/parking'));

// Catch-all to serve index.html for any unknown route (for SPA or direct HTML navigation)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 