import { Router } from 'express';
import { favoritePlanet } from '../controllers/userController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);
router.post('/favorites', favoritePlanet);

export default router;
