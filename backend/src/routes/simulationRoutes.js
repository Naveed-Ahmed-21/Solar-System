import { Router } from 'express';
import { cloneSimulation, listSimulations, saveSimulation } from '../controllers/simulationController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);
router.get('/', listSimulations);
router.post('/', saveSimulation);
router.post('/:id/clone', cloneSimulation);

export default router;
