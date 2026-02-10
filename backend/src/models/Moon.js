import mongoose from 'mongoose';

const moonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  planet: { type: mongoose.Schema.Types.ObjectId, ref: 'Planet', required: true },
  radiusMeters: Number,
  massKg: Number
}, { timestamps: true });

export const Moon = mongoose.model('Moon', moonSchema);
