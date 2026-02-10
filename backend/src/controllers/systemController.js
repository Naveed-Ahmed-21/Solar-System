import { CustomSolarSystem } from '../models/CustomSolarSystem.js';
import { stabilityScore } from '../lib/physics.js';

export async function createSystem(req, res) {
  const { name, starMassKg, planets } = req.body;
  const stability = stabilityScore(planets, Number(starMassKg));
  const system = await CustomSolarSystem.create({
    userId: req.user.sub,
    name,
    starMassKg,
    planets,
    stability
  });

  return res.status(201).json({ data: system });
}

export async function listSystems(req, res) {
  const systems = await CustomSolarSystem.find({ userId: req.user.sub }).sort({ updatedAt: -1 }).lean();
  return res.json({ data: systems });
}
