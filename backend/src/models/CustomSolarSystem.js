import mongoose from 'mongoose';

const CustomPlanetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    massKg: { type: Number, required: true },
    orbitalRadiusAu: { type: Number, required: true },
    phaseOffset: { type: Number, default: 0 }
  },
  { _id: false }
);

const CustomSolarSystemSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    starMassKg: { type: Number, required: true },
    planets: { type: [CustomPlanetSchema], default: [] },
    stability: {
      score: Number,
      stable: Boolean,
      reason: String
    }
  },
  { timestamps: true }
);

export const CustomSolarSystem = mongoose.model('CustomSolarSystem', CustomSolarSystemSchema);
