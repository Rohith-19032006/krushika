import express from 'express';
import {
  soilAnalysis,
  weatherPrediction,
  cropRecommendation,
} from '../controllers/predictionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/soil', protect, soilAnalysis);
router.post('/weather', protect, weatherPrediction);
router.post('/crop', protect, cropRecommendation);

export default router;
