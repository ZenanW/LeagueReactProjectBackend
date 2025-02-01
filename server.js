import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import abilitiesRoutes from './routes/abilitiesRoutes.js';
import dailyChampionsRoutes from './routes/dailyChampionsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route to test DB connection
app.use('/api', abilitiesRoutes); // Base API path
app.use('/api', dailyChampionsRoutes); // Add new route

// Debugging log
console.log("Daily Champions Route Registered");

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


