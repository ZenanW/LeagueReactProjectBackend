import express from 'express';

const router = express.Router();

router.post('/submit', (req, res) => {
  const { abilities } = req.body;
  if (!abilities) {
    return res.status(400).json({ error: 'No abilities provided' });
  }
  res.status(200).json({ message: 'Abilities saved successfully!', abilities });
});

export default router;
