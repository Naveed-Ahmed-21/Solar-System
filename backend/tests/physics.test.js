import test from 'node:test';
import assert from 'node:assert/strict';
import {
  orbitalPeriod,
  escapeVelocity,
  surfaceGravity,
  distanceBetweenPlanets,
  systemStabilityScore
} from '../src/services/physicsService.js';

test('orbital period of Earth around Sun approx 1 year', () => {
  const period = orbitalPeriod(1.496e11, 1.989e30);
  assert.ok(period > 3.1e7 && period < 3.2e7);
});

test('escape velocity of Earth approx 11.2 km/s', () => {
  const velocity = escapeVelocity(5.972e24, 6.371e6);
  assert.ok(velocity > 11000 && velocity < 11300);
});

test('surface gravity of Earth approx 9.81 m/s²', () => {
  const gravity = surfaceGravity(5.972e24, 6.371e6);
  assert.ok(gravity > 9.7 && gravity < 9.9);
});

test('distance between planets returns positive number', () => {
  const meters = distanceBetweenPlanets(
    { orbitRadiusMeters: 1.496e11, orbitalPeriodSeconds: 3.15576e7 },
    { orbitRadiusMeters: 2.279e11, orbitalPeriodSeconds: 5.9355e7 },
    100000
  );
  assert.ok(meters > 0);
});

test('stability score is lower for crowded orbits', () => {
  const stable = systemStabilityScore([
    { orbitRadiusMeters: 1e11, massKg: 6e24, starMassKg: 2e30 },
    { orbitRadiusMeters: 2e11, massKg: 6e24, starMassKg: 2e30 },
    { orbitRadiusMeters: 3e11, massKg: 6e24, starMassKg: 2e30 }
  ]);

  const unstable = systemStabilityScore([
    { orbitRadiusMeters: 1e11, massKg: 6e24, starMassKg: 2e30 },
    { orbitRadiusMeters: 1.1e11, massKg: 6e24, starMassKg: 2e30 },
    { orbitRadiusMeters: 1.2e11, massKg: 6e24, starMassKg: 2e30 }
  ]);

  assert.ok(stable > unstable);
});
