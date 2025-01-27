import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Route to get all champions
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM champions');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch champions' });
  }
});

export default router;