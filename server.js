import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import abilitiesRoutes from './routes/abilitiesRoutes.js';
import dailyChampionsRoutes from './routes/dailyChampionsRoutes.js';
import aiGuessRoutes from "./routes/aiGuessRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route to test DB connection
app.use('/api', abilitiesRoutes); // Base API path
app.use('/api', dailyChampionsRoutes); // Add new route
app.use("/api", aiGuessRoutes); // AI guessing

// Debugging log
console.log("Daily Champions Route Registered");

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


