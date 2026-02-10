export type Planet = {
  _id: string;
  name: string;
  description: string;
  massKg: number;
  radiusKm: number;
  temperatureK: number;
  moonsCount: number;
  orbitalRadiusAu: number;
  orbitalPeriodDays: number;
  axialTiltDeg: number;
  colorHex: string;
  derived?: {
    orbitalPeriodSeconds: number;
    escapeVelocityMps: number;
    gravityMps2: number;
  };
};
