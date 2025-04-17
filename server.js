require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
app.use('/uploads', express.static(uploadPath));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// MySQL connection pool
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

pool.getConnection((err, connection) => {
  if (err) {
    process.exit(1);
  }
  connection.release();
});

// === ROUTES ===

// Upload user profile picture
app.post('/users/upload_picture', upload.single('picture'), (req, res) => {
  const { email } = req.body;
  const file = req.file;

  if (!email || !file) {
    return res.status(400).json({ error: 'Missing email or picture' });
  }

  const pictureUrl = `/uploads/${file.filename}`;

  const query = `UPDATE users SET user_picture = ? WHERE user_email = ?`;
  pool.query(query, [pictureUrl, email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({
      message: 'Profile picture updated successfully',
      picture: pictureUrl,
      success: true,
    });
  });
});

// Upload user bio
app.post('/users/upload_bio', (req, res) => {
  const { user_email, user_bio } = req.body;

  if (!user_email || !user_bio) {
    return res.status(400).json({ success: false, message: 'Email and bio are required' });
  }

  const query = `UPDATE users SET user_bio = ? WHERE user_email = ?`;
  pool.query(query, [user_bio, user_email], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    console.log(err)
    res.json({
      message: 'Bio updated successfully',
      success: true,
    });
  });
});


// GET user by email
app.get('/users/email/:email', (req, res) => {
  const email = req.params.email;
  const query = 'SELECT * FROM users WHERE LOWER(user_email) = LOWER(?)';
  pool.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ token: results[0], success: true });
  });
});

// GET messages by email
app.get('/users/messages/:email', (req, res) => {
  const email = req.params.email;
  const query = `
    SELECT * FROM chat 
    WHERE LOWER(user_email) = LOWER(?) 
       OR LOWER(reciver_email) = LOWER(?)`;
  pool.query(query, [email, email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'No messages found' });
    res.json({ messages: results, success: true });
  });
});

// GET messages between two users
app.get('/users/messages/person/:user_email/:reciver_email', (req, res) => {
  const { user_email, reciver_email } = req.params;
  const query = `
    SELECT * FROM chat 
    WHERE 
      (LOWER(user_email) = LOWER(?) AND LOWER(reciver_email) = LOWER(?)) 
      OR 
      (LOWER(user_email) = LOWER(?) AND LOWER(reciver_email) = LOWER(?))
    ORDER BY message_time ASC`;
  pool.query(query, [user_email, reciver_email, reciver_email, user_email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'No messages found' });
    res.json({ messages: results, success: true });
  });
});

// GET all users
app.get('/users/allusers', (req, res) => {
  const query = 'SELECT * FROM users';
  pool.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ allusers: results, success: true });
  });
});

// POST create user
app.post('/users', (req, res) => {
  const { user_name, user_email, user_date_of_birth, user_phone, user_password } = req.body;
  const query = `
    INSERT INTO users 
    (user_name, user_email, user_date_of_birth, user_phone, user_password) 
    VALUES (?, ?, ?, ?, ?)`;
  const values = [user_name, user_email, user_date_of_birth, user_phone, user_password];

  pool.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User added successfully', id: result.insertId, success: true });
  });
});

// POST update user
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
    WHERE user_email = ?`;
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

// POST create chat message
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
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
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
    if (err) return res.status(500).json({ error: err.message });
    res.json({
      message: 'Message sent successfully',
      id: result.insertId,
      success: true,
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
