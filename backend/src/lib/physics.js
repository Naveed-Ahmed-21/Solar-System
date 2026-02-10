const G = 6.6743e-11;
const AU_IN_METERS = 1.495978707e11;

export function orbitalPeriodSeconds(orbitalRadiusAu, centralMassKg) {
  const radiusMeters = orbitalRadiusAu * AU_IN_METERS;
  return 2 * Math.PI * Math.sqrt((radiusMeters ** 3) / (G * centralMassKg));
}

export function escapeVelocity(radiusKm, massKg) {
  const radiusMeters = radiusKm * 1000;
  return Math.sqrt((2 * G * massKg) / radiusMeters);
}

export function surfaceGravity(radiusKm, massKg) {
  const radiusMeters = radiusKm * 1000;
  return (G * massKg) / (radiusMeters ** 2);
}

export function distanceBetweenPlanetsAu(planetA, planetB, timeSeconds) {
  const thetaA = (timeSeconds / planetA.orbitalPeriodSeconds) * 2 * Math.PI + planetA.phaseOffset;
  const thetaB = (timeSeconds / planetB.orbitalPeriodSeconds) * 2 * Math.PI + planetB.phaseOffset;

  const ax = planetA.orbitalRadiusAu * Math.cos(thetaA);
  const ay = planetA.orbitalRadiusAu * Math.sin(thetaA);
  const bx = planetB.orbitalRadiusAu * Math.cos(thetaB);
  const by = planetB.orbitalRadiusAu * Math.sin(thetaB);

  return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
}

export function orbitalSpeed(orbitalRadiusAu, centralMassKg) {
  const radiusMeters = orbitalRadiusAu * AU_IN_METERS;
  return Math.sqrt((G * centralMassKg) / radiusMeters);
}

export function stabilityScore(planets, starMassKg) {
  if (!planets.length) return { stable: false, score: 0, reason: 'No planets in system.' };

  const sorted = [...planets].sort((a, b) => a.orbitalRadiusAu - b.orbitalRadiusAu);
  let minSpacing = Infinity;

  for (let i = 1; i < sorted.length; i += 1) {
    minSpacing = Math.min(minSpacing, sorted[i].orbitalRadiusAu - sorted[i - 1].orbitalRadiusAu);
  }

  const spacingFactor = Math.max(0, Math.min(1, minSpacing / 0.2));
  const massFactor = Math.max(0, Math.min(1, starMassKg / 1.989e30));
  const score = Number((spacingFactor * 0.7 + massFactor * 0.3).toFixed(2));

  return {
    stable: score >= 0.55,
    score,
    reason: score >= 0.55 ? 'System appears dynamically stable in simplified model.' : 'Orbits are too tightly packed for simplified stability threshold.'
  };
}
