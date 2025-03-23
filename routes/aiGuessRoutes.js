import express from "express";
import aiGuessController from "../controllers/aiGuessController.js";

const router = express.Router();

router.post("/ai-guess/start", aiGuessController.handleStartSession);
router.post("/ai-guess/ask", aiGuessController.handleAskQuestion);

export default router;
