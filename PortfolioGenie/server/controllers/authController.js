const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const EMAIL_REGEX =/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; 

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET environment variable is not set');
  return secret;
}

// Signup Controller
exports.signUp = async (req, res) => {
  const { email, password } = req.body;

  // Input validation 
  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: 'A valid email is required.' });
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters.' });
  }

  try {
   
    const normalizedEmail = email.toLowerCase().trim();

    const userCheck = await pool.query(
      'SELECT id FROM users WHERE email = $1',  
      [normalizedEmail]
    );
    if (userCheck.rows.length > 0) {
      return res.status(409).json({ message: 'Email already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
      [normalizedEmail, hashedPassword]
    );

    const token = jwt.sign(
      { userId: newUser.rows[0].id },
      getJwtSecret(),
      { expiresIn: '24h' }
    );

    return res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: newUser.rows[0]
    });

  } catch (error) {
    console.error('Signup Error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Email is required.' });
  }
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ message: 'Password is required.' });
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();

    
    const result = await pool.query(
      'SELECT id, email, password_hash FROM users WHERE email = $1',
      [normalizedEmail]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { userId: user.id },
      getJwtSecret(),
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: 'Logged in successfully!',
      token,
      user: { id: user.id, email: user.email }  
    });

  } catch (error) {
    console.error('Login Error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};