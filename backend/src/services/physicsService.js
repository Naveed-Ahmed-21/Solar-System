const G = 6.67430e-11;

export function orbitalPeriod(semiMajorAxisMeters, centralMassKg) {
  return 2 * Math.PI * Math.sqrt((semiMajorAxisMeters ** 3) / (G * centralMassKg));
}

export function escapeVelocity(massKg, radiusMeters) {
  return Math.sqrt((2 * G * massKg) / radiusMeters);
}

export function surfaceGravity(massKg, radiusMeters) {
  return (G * massKg) / (radiusMeters ** 2);
}

export function distanceBetweenPlanets(planetA, planetB, timeSeconds) {
  const a = angleAtTime(planetA.orbitRadiusMeters, planetA.orbitalPeriodSeconds, timeSeconds);
  const b = angleAtTime(planetB.orbitRadiusMeters, planetB.orbitalPeriodSeconds, timeSeconds);
  const ax = Math.cos(a) * planetA.orbitRadiusMeters;
  const az = Math.sin(a) * planetA.orbitRadiusMeters;
  const bx = Math.cos(b) * planetB.orbitRadiusMeters;
  const bz = Math.sin(b) * planetB.orbitRadiusMeters;
  return Math.hypot(ax - bx, az - bz);
}

function angleAtTime(radius, period, t) {
  const angularVelocity = (2 * Math.PI) / period;
  return ((t * angularVelocity) + radius / 1e9) % (2 * Math.PI);
}

export function systemStabilityScore(bodies) {
  if (bodies.length < 2) return 1;
  const sorted = [...bodies].sort((x, y) => x.orbitRadiusMeters - y.orbitRadiusMeters);
  let minSeparation = Infinity;

  for (let i = 0; i < sorted.length - 1; i += 1) {
    const inner = sorted[i];
    const outer = sorted[i + 1];
    const mu = (inner.massKg + outer.massKg) / (3 * inner.starMassKg);
    const mutualHill = ((inner.orbitRadiusMeters + outer.orbitRadiusMeters) / 2) * Math.cbrt(mu);
    const separation = (outer.orbitRadiusMeters - inner.orbitRadiusMeters) / mutualHill;
    minSeparation = Math.min(minSeparation, separation);
  }

  const normalized = (minSeparation - 2) / 8;
  return Math.max(0, Math.min(normalized, 1));
}
