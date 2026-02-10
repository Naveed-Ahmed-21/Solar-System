import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { physicsController } from '../controllers/physicsController.js';
import { systemController } from '../controllers/systemController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

router.get('/planets', systemController.listPlanets);
router.get('/planets/compare/:firstId/:secondId', systemController.comparePlanets);
router.post('/simulations', requireAuth, systemController.saveSimulation);
router.post('/custom-systems', requireAuth, systemController.createCustomSystem);
router.post('/custom-systems/:id/clone', requireAuth, systemController.cloneSystem);

router.post('/physics/orbital-period', physicsController.orbitalPeriod);
router.post('/physics/escape-velocity', physicsController.escapeVelocity);
router.post('/physics/surface-gravity', physicsController.surfaceGravity);
router.post('/physics/distance', physicsController.distance);
router.post('/physics/stability', physicsController.stability);

export default router;
