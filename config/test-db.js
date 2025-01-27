import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();  // Load environment variables

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASS || ''),
  port: Number(process.env.DB_PORT || 5432),
});

async function testDatabase() {
  try {
    console.log('Connecting to the database...');
    
    // Run SQL query
    const result = await pool.query('SELECT * FROM champions LIMIT 10');

    console.log('Query result:', result.rows);
    
    pool.end();  // Close the connection pool after query execution
  } catch (err) {
    console.error('Database query failed:', err);
  }
}

// Execute the function
testDatabase();