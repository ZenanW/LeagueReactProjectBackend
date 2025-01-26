import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import abilityRoutes from './routes/abilities.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', abilityRoutes);

// Sample Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

