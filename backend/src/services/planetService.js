import { Planet } from '../models/Planet.js';
import { orbitalPeriodSeconds, escapeVelocity, surfaceGravity } from '../lib/physics.js';

const SUN_MASS_KG = 1.989e30;

export async function listPlanets() {
  const planets = await Planet.find().sort({ orbitalRadiusAu: 1 }).lean();
  return planets.map((planet) => ({
    ...planet,
    derived: {
      orbitalPeriodSeconds: orbitalPeriodSeconds(planet.orbitalRadiusAu, SUN_MASS_KG),
      escapeVelocityMps: escapeVelocity(planet.radiusKm, planet.massKg),
      gravityMps2: surfaceGravity(planet.radiusKm, planet.massKg)
    }
  }));
}
