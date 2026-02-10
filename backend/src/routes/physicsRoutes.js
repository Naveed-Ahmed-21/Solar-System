import { Router } from 'express';
import {
  checkSystemStability,
  getDistanceAtTime,
  getEscapeVelocity,
  getGravity,
  getOrbitalMetrics
} from '../controllers/physicsController.js';

const router = Router();
router.post('/orbital-period', getOrbitalMetrics);
router.post('/escape-velocity', getEscapeVelocity);
router.post('/gravity', getGravity);
router.get('/distance', getDistanceAtTime);
router.post('/stability', checkSystemStability);

export default router;
