import { Planet } from '../models/Planet.js';
import {
  distanceBetweenPlanetsAu,
  escapeVelocity,
  orbitalPeriodSeconds,
  stabilityScore,
  surfaceGravity
} from '../lib/physics.js';

const SUN_MASS_KG = 1.989e30;

export async function getOrbitalMetrics(req, res) {
  const { orbitalRadiusAu, centralMassKg } = req.body;
  const period = orbitalPeriodSeconds(Number(orbitalRadiusAu), Number(centralMassKg || SUN_MASS_KG));
  return res.json({ data: { orbitalPeriodSeconds: period } });
}

export async function getEscapeVelocity(req, res) {
  const { radiusKm, massKg } = req.body;
  return res.json({ data: { escapeVelocityMps: escapeVelocity(Number(radiusKm), Number(massKg)) } });
}

export async function getGravity(req, res) {
  const { radiusKm, massKg } = req.body;
  return res.json({ data: { gravityMps2: surfaceGravity(Number(radiusKm), Number(massKg)) } });
}

export async function getDistanceAtTime(req, res) {
  const { from, to, t } = req.query;
  const [planetA, planetB] = await Promise.all([
    Planet.findOne({ name: new RegExp(`^${from}$`, 'i') }).lean(),
    Planet.findOne({ name: new RegExp(`^${to}$`, 'i') }).lean()
  ]);

  if (!planetA || !planetB) return res.status(404).json({ error: 'Planet not found.' });

  const distanceAu = distanceBetweenPlanetsAu(
    {
      orbitalRadiusAu: planetA.orbitalRadiusAu,
      orbitalPeriodSeconds: planetA.orbitalPeriodDays * 86400,
      phaseOffset: 0
    },
    {
      orbitalRadiusAu: planetB.orbitalRadiusAu,
      orbitalPeriodSeconds: planetB.orbitalPeriodDays * 86400,
      phaseOffset: Math.PI / 6
    },
    Number(t || 0)
  );

  return res.json({ data: { distanceAu } });
}

export async function checkSystemStability(req, res) {
  const { starMassKg, planets } = req.body;
  return res.json({ data: stabilityScore(planets, Number(starMassKg)) });
}
