import express from 'express';

import { saveAbilities, getAbilityStats } from '../controllers/abilitiesController.js';

const router = express.Router();

// Route to save abilities
router.post('/abilities', saveAbilities);

// Route to get stats of most chosen abilities
router.get('/abilities/stats', getAbilityStats);

export default router;

