import { Router } from 'express';
import { createSystem, listSystems } from '../controllers/systemController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);
router.get('/', listSystems);
router.post('/', createSystem);

export default router;
