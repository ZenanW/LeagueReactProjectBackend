import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import abilitiesRoutes from './routes/abilitiesRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route to test DB connection
app.use('/api', abilitiesRoutes); // Base API path

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


