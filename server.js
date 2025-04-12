// server.js
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  ssl: {
    rejectUnauthorized: false // ← allows self-signed certs
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Failed to connect to MySQL:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL database');
  connection.release();
});

// GET a user by email
app.get('/users/email/:email', (req, res) => {
  const email = req.params.email;
  console.log('📥 Received request for email:', email);

  const query = 'SELECT * FROM users WHERE LOWER(user_email) = LOWER(?)';
  pool.query(query, [email], (err, results) => {
    if (err) {
      console.error('❌ DB error:', err.message);
      return res.status(500).json({ error: err.message });
    }

    console.log('📦 DB results:', results);

    if (results.length === 0) {
      console.warn('❌ No user found with email:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('✅ Found user:', results[0]);
    res.json({ token: results[0], success: true });
  });
});




// POST to create a new user
app.post('/users', (req, res) => {
  const { user_name, user_email, user_date_of_birth, user_phone, user_password } = req.body;

  const query = `
    INSERT INTO users 
    (user_name, user_email, user_date_of_birth, user_phone, user_password) 
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [user_name, user_email, user_date_of_birth, user_phone, user_password];

  pool.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User added successfully', id: result.insertId, success: true });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
