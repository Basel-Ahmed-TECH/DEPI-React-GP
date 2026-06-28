const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET environment variable is not set');
  return secret;
}

// Signup Controller
exports.signUp = async (req, res) => {
  const { email, password, name } = req.body;

  // Input validation 
  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: 'A valid email is required.' });
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters.' });
  }

  try {

    const normalizedEmail = email.toLowerCase().trim();
    const displayName = (name && typeof name === 'string') ? name.trim().slice(0, 100) : null;

    const userCheck = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [normalizedEmail]
    );
    if (userCheck.rows.length > 0) {
      return res.status(409).json({ message: 'Email already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Ensure name column exists
    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS name TEXT`);

    const newUser = await pool.query(
      'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at',
      [normalizedEmail, hashedPassword, displayName]
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

// ── GET /auth/me ─────────────────────────────────────────────────────────────
// Returns the current user's profile data straight from the DB.
// Protected by requireAuth middleware (attached in authRoutes).
exports.getMe = async (req, res) => {
  try {
    // Ensure name column exists (idempotent, safe to repeat)
    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS name TEXT`);

    const result = await pool.query(
      'SELECT id, email, name, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    console.error('GetMe Error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// ── POST /auth/change-password ────────────────────────────────────────────────
// Verifies current password then updates to the new one.
// Protected by requireAuth middleware.
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Both current and new password are required.' });
  }
  if (typeof newPassword !== 'string' || newPassword.length < 8) {
    return res.status(400).json({ message: 'New password must be at least 8 characters.' });
  }

  try {
    // Fetch the current hash from DB
    const result = await pool.query(
      'SELECT password_hash FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(currentPassword, result.rows[0].password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect.' });
    }

    const newHash = await bcrypt.hash(newPassword, 12);

    await pool.query(
      'UPDATE users SET password_hash = $1 WHERE id = $2',
      [newHash, req.user.id]
    );

    return res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('ChangePassword Error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// ── PATCH /auth/me ────────────────────────────────────────────────────────────
// Adds a `name` column if it doesn't exist, then updates it.
// This is safe to call repeatedly — ALTER TABLE ADD COLUMN IF NOT EXISTS is idempotent.
exports.updateMe = async (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ message: 'A valid name is required.' });
  }

  try {
    // Ensure the name column exists (runs once, safe to repeat)
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS name TEXT
    `);

    const result = await pool.query(
      'UPDATE users SET name = $1 WHERE id = $2 RETURNING id, email, name, created_at',
      [name.trim(), req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    console.error('UpdateMe Error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};