import express from 'express';
import { getDailyChampions } from '../config/dailyChampions.js';

const router = express.Router();

// Route to get daily champions
router.get('/daily-champions', (req, res) => {
    try {
        const dailyChampions = getDailyChampions();
        res.json({ champions: dailyChampions });
    } catch (error) {
        console.error('Error fetching daily champions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;