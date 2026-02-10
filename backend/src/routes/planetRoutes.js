import { Router } from 'express';
import { comparePlanets, getPlanetByName, getPlanets } from '../controllers/planetController.js';

const router = Router();
router.get('/', getPlanets);
router.get('/compare', comparePlanets);
router.get('/:name', getPlanetByName);

export default router;
