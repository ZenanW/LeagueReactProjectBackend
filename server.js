import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route to test DB connection
app.get('/test-champions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM champions LIMIT 10');
    res.json(result.rows);
    console.log(result.rows)
  } catch (err) {
    console.error('Error fetching champions:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


