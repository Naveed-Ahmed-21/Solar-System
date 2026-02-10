import mongoose from 'mongoose';

const planetSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  massKg: Number,
  radiusMeters: Number,
  orbitRadiusMeters: Number,
  orbitalPeriodSeconds: Number,
  temperatureKelvin: Number,
  moonCount: Number
}, { timestamps: true });

export const Planet = mongoose.model('Planet', planetSchema);
