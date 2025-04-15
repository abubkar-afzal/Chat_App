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
    rejectUnauthorized: false, 
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the database connection
pool.getConnection((err, connection) => {
  if (err) {
    process.exit(1);
  }
  connection.release();
});

// GET a user by email
app.get('/users/email/:email', (req, res) => {
  const email = req.params.email;

  const query = 'SELECT * FROM users WHERE LOWER(user_email) = LOWER(?)';
  pool.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ token: results[0], success: true });
  });
});

// GET a user by email for message
app.get('/users/messages/:email', (req, res) => {
  const email = req.params.email;

  const query = `
    SELECT * FROM chat 
    WHERE LOWER(user_email) = LOWER(?) 
       OR LOWER(reciver_email) = LOWER(?)`;

  pool.query(query, [email, email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No messages found' });
    }

    res.json({ messages: results, success: true });
  });
});

// GET messages between two users
app.get('/users/messages/person/:user_email/:reciver_email', (req, res) => {
  const user_email = req.params.user_email;
  const reciver_email = req.params.reciver_email;

  const query = `
    SELECT * FROM chat 
    WHERE 
      (LOWER(user_email) = LOWER(?) AND LOWER(reciver_email) = LOWER(?)) 
      OR 
      (LOWER(user_email) = LOWER(?) AND LOWER(reciver_email) = LOWER(?))
    ORDER BY message_time ASC
  `;

  pool.query(query, [user_email, reciver_email, reciver_email, user_email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No messages found' });
    }

    res.json({ messages: results, success: true });
  });
});

// GET all user
app.get('/users/allusers', (req, res) => {
  const query = 'SELECT * FROM users ';
  pool.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ allusers: results, success: true });
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

// POST to update user
app.post('/users/update_user', (req, res) => {
  const {
    user_name,
    user_email,
    user_date_of_birth,
    user_phone,
    user_password,
    user_bio,
    user_picture,
  } = req.body;

  const query = `
    UPDATE users 
    SET 
      user_name = ?, 
      user_date_of_birth = ?, 
      user_phone = ?, 
      user_password = ?, 
      user_bio = ?, 
      user_picture = ?
    WHERE user_email = ?
  `;

  // user_email is used in WHERE, not SET (assuming it's the identifier)
  const values = [
    user_name,
    user_date_of_birth,
    user_phone,
    user_password,
    user_bio,
    user_picture,
    user_email,
  ];

  pool.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({
      message: 'User updated successfully',
      affectedRows: result.affectedRows,
      success: true,
    });
  });
});

// POST to create a new message chat
app.post('/users/send_message', (req, res) => {
  const {
    user_name,
    user_email,
    user_phone,
    message,
    message_time,
    reciver_name,
    reciver_email,
    reciver_phone,
  } = req.body;

  if (!user_email || !reciver_email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const time = message_time || new Date().toISOString().slice(0, 19).replace('T', ' ');

  const query = `
    INSERT INTO chat 
    (user_name, user_email, user_phone, message, message_time, reciver_name, reciver_email, reciver_phone) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    user_name,
    user_email,
    user_phone,
    message,
    time,
    reciver_name,
    reciver_email,
    reciver_phone,
  ];

  pool.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: 'Message sent successfully',
      id: result.insertId,
      success: true,
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {});
