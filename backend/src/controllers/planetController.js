import { Planet } from '../models/Planet.js';
import { listPlanets } from '../services/planetService.js';
import { Moon } from '../models/Moon.js';

export async function getPlanets(req, res) {
  const planets = await listPlanets();
  return res.json({ data: planets });
}

export async function getPlanetByName(req, res) {
  const planet = await Planet.findOne({ name: new RegExp(`^${req.params.name}$`, 'i') }).lean();
  if (!planet) return res.status(404).json({ error: 'Planet not found.' });
  const moons = await Moon.find({ planetId: planet._id }).lean();
  return res.json({ data: { ...planet, moons } });
}

export async function comparePlanets(req, res) {
  const { planetA, planetB } = req.query;
  const [a, b] = await Promise.all([
    Planet.findOne({ name: new RegExp(`^${planetA}$`, 'i') }).lean(),
    Planet.findOne({ name: new RegExp(`^${planetB}$`, 'i') }).lean()
  ]);

  if (!a || !b) return res.status(404).json({ error: 'One or both planets not found.' });

  return res.json({
    data: {
      planetA: a,
      planetB: b,
      massRatio: a.massKg / b.massKg,
      gravityRatio: (a.massKg / (a.radiusKm ** 2)) / (b.massKg / (b.radiusKm ** 2)),
      temperatureDeltaK: a.temperatureK - b.temperatureK
    }
  });
}
