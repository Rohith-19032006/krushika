import express from 'express';
import { getUsers, getStats, getPredictionLogs } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.use(protect, adminOnly);
router.get('/users', getUsers);
router.get('/stats', getStats);
router.get('/prediction-logs', getPredictionLogs);

export default router;
