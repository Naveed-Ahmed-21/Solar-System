import mongoose from 'mongoose';

const PlanetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    massKg: { type: Number, required: true },
    radiusKm: { type: Number, required: true },
    temperatureK: { type: Number, required: true },
    moonsCount: { type: Number, required: true },
    orbitalRadiusAu: { type: Number, required: true },
    orbitalPeriodDays: { type: Number, required: true },
    axialTiltDeg: { type: Number, required: true },
    colorHex: { type: String, required: true },
    textureUrl: { type: String }
  },
  { timestamps: true }
);

export const Planet = mongoose.model('Planet', PlanetSchema);
