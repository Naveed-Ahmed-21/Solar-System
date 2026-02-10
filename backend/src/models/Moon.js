import mongoose from 'mongoose';

const MoonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    planetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Planet', required: true },
    radiusKm: { type: Number, required: true },
    orbitalPeriodDays: { type: Number, required: true }
  },
  { timestamps: true }
);

MoonSchema.index({ name: 1, planetId: 1 }, { unique: true });

export const Moon = mongoose.model('Moon', MoonSchema);
