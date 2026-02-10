import mongoose from 'mongoose';

const customPlanetSchema = new mongoose.Schema({
  name: String,
  massKg: Number,
  orbitRadiusMeters: Number,
  orbitalPeriodSeconds: Number
}, { _id: false });

const customSolarSystemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  starMassKg: { type: Number, required: true },
  planets: [customPlanetSchema],
  stabilityScore: Number,
  warning: String
}, { timestamps: true });

export const CustomSolarSystem = mongoose.model('CustomSolarSystem', customSolarSystemSchema);
