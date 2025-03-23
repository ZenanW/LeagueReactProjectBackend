import dotenv from 'dotenv';
import pkg from 'pg';

const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use Supabase connection string
  ssl: { rejectUnauthorized: false } // Required for Supabase SSL connection
});

pool.connect()
  .then(() => console.log('PostgreSQL Connected...'))
  .catch((err) => console.error('PostgreSQL Connection Error:', err));

export default pool;