const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// 1. SIGNUP LOGIC
exports.signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists in Neon
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password securely using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user credentials into your Neon 'users' table
    const newUser = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );

    const token = jwt.sign({ userId: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    return res.status(201).json({
      message: 'Account created successfully!',
      token: token,
      user: newUser.rows[0]
    });
  } catch (error) {
    console.error('Signup Error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 2. LOGIN LOGIC
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in your users table
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    const user = result.rows[0];

    // Compare incoming plain-text password with the stored hash string
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: 'Logged in successfully!',
      token: token,
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};