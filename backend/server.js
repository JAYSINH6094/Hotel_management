const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Use the MySQL connection pool from config/db.js
const db = require('./config/db');
console.log('Connected to MySQL database (via pool)');

app.get('/', (req, res) => {
  res.send('API is running...');
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 