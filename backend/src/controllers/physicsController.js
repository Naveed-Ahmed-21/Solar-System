import {
  orbitalPeriod,
  escapeVelocity,
  surfaceGravity,
  distanceBetweenPlanets,
  systemStabilityScore
} from '../services/physicsService.js';

export const physicsController = {
  orbitalPeriod(req, res) {
    const { semiMajorAxisMeters, centralMassKg } = req.body;
    return res.json({ seconds: orbitalPeriod(semiMajorAxisMeters, centralMassKg) });
  },
  escapeVelocity(req, res) {
    const { massKg, radiusMeters } = req.body;
    return res.json({ metersPerSecond: escapeVelocity(massKg, radiusMeters) });
  },
  surfaceGravity(req, res) {
    const { massKg, radiusMeters } = req.body;
    return res.json({ metersPerSecondSquared: surfaceGravity(massKg, radiusMeters) });
  },
  distance(req, res) {
    const { planetA, planetB, timeSeconds } = req.body;
    return res.json({ meters: distanceBetweenPlanets(planetA, planetB, timeSeconds) });
  },
  stability(req, res) {
    return res.json({ score: systemStabilityScore(req.body.bodies) });
  }
};
