import mongoose from 'mongoose';

const SimulationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    timeScale: { type: Number, required: true, default: 1 },
    isPaused: { type: Boolean, default: false },
    selectedPlanetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Planet' },
    analytics: {
      averageFps: Number,
      sessionDurationSec: Number,
      interactionCount: Number
    },
    snapshot: { type: Object, required: true }
  },
  { timestamps: true }
);

export const Simulation = mongoose.model('Simulation', SimulationSchema);
