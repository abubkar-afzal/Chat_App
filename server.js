require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Create MySQL pool with Promise support
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
}).promise();

// === ROUTES ===

// Upload profile picture (base64 string)
app.post('/users/upload_picture', async (req, res) => {
  const { email, image } = req.body;

  if (!email || !image) {
    return res.status(400).json({ error: 'Missing email or image' });
  }

  try {
    const buffer = Buffer.from(image, 'base64');
    const query = 'UPDATE users SET user_picture = ? WHERE user_email = ?';
    const [result] = await pool.query(query, [buffer, email]);

    res.json({
      success: true,
      image: buffer.toString('base64'),
    });
  } catch (err) {
    console.error('Buffer creation or DB query failed:', err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Get profile picture
app.get('/users/get_picture', async (req, res) => {
  const email = req.query.email;
  try {
    const [rows] = await pool.query(
      'SELECT user_picture AS picture FROM users WHERE user_email = ?',
      [email]
    );

    if (rows.length > 0 && rows[0].picture) {
      res.set('Content-Type', 'image/jpeg'); // defaulting to JPEG
      res.send(rows[0].picture);
    } else {
      res.json({ success: false, message: 'No picture found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Upload user bio
app.post('/users/upload_bio', async (req, res) => {
  const { user_email, user_bio } = req.body;

  if (!user_email || !user_bio) {
    return res.status(400).json({ success: false, message: 'Email and bio are required' });
  }

  try {
    const query = `UPDATE users SET user_bio = ? WHERE user_email = ?`;
    await pool.query(query, [user_bio, user_email]);
    res.json({ message: 'Bio updated successfully', success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET user by email
app.get('/users/email/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const [results] = await pool.query(
      'SELECT * FROM users WHERE LOWER(user_email) = LOWER(?)',
      [email]
    );
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ token: results[0], success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET messages by email
app.get('/users/messages/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const [results] = await pool.query(
      `SELECT * FROM chat WHERE LOWER(user_email) = LOWER(?) OR LOWER(reciver_email) = LOWER(?)`,
      [email, email]
    );
    if (results.length === 0) return res.status(404).json({ message: 'No messages found' });
    res.json({ messages: results, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET messages between two users
app.get('/users/messages/person/:user_email/:reciver_email', async (req, res) => {
  const { user_email, reciver_email } = req.params;
  try {
    const [results] = await pool.query(
      `SELECT * FROM chat 
       WHERE 
         (LOWER(user_email) = LOWER(?) AND LOWER(reciver_email) = LOWER(?)) 
         OR 
         (LOWER(user_email) = LOWER(?) AND LOWER(reciver_email) = LOWER(?))
       ORDER BY message_time ASC`,
      [user_email, reciver_email, reciver_email, user_email]
    );
    if (results.length === 0) return res.status(404).json({ message: 'No messages found' });
    res.json({ messages: results, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all users
app.get('/users/allusers', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM users');
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ allusers: results, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create user
app.post('/users', async (req, res) => {
  const { user_name, user_email, user_date_of_birth, user_phone, user_password } = req.body;

  try {
    const query = `
      INSERT INTO users 
      (user_name, user_email, user_date_of_birth, user_phone, user_password) 
      VALUES (?, ?, ?, ?, ?)`;
    const [result] = await pool.query(query, [
      user_name,
      user_email,
      user_date_of_birth,
      user_phone,
      user_password,
    ]);
    res.json({ message: 'User added successfully', id: result.insertId, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST update user
app.post('/users/update_user', async (req, res) => {
  const {
    user_name,
    user_email,
    user_date_of_birth,
    user_phone,
    user_password,
    user_bio,
    user_picture,
  } = req.body;

  try {
    const query = `
      UPDATE users 
      SET 
        user_name = ?, 
        user_date_of_birth = ?, 
        user_phone = ?, 
        user_password = ?, 
        user_bio = ?, 
        user_picture = ?
      WHERE user_email = ?`;
    const [result] = await pool.query(query, [
      user_name,
      user_date_of_birth,
      user_phone,
      user_password,
      user_bio,
      user_picture,
      user_email,
    ]);
    res.json({
      message: 'User updated successfully',
      affectedRows: result.affectedRows,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create chat message
app.post('/users/send_message', async (req, res) => {
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

  try {
    const query = `
      INSERT INTO chat 
      (user_name, user_email, user_phone, message, message_time, reciver_name, reciver_email, reciver_phone) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.query(query, [
      user_name,
      user_email,
      user_phone,
      message,
      time,
      reciver_name,
      reciver_email,
      reciver_phone,
    ]);
    res.json({
      message: 'Message sent successfully',
      id: result.insertId,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
