const { Pool } = require('pg');
require('dotenv').config();

// Connection pool for neon database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } 
});

module.exports = pool;