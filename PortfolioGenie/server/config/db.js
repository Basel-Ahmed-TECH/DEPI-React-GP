const { Pool } = require('pg');
require('dotenv').config();

// Create a reusable connection pool targeting your Neon Cloud Database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for secure handshakes with Neon
});

module.exports = pool;