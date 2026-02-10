import mongoose from 'mongoose';

const simulationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  timeScale: Number,
  state: mongoose.Schema.Types.Mixed,
  analytics: {
    fpsAverage: Number,
    interactions: Number,
    runtimeSeconds: Number
  }
}, { timestamps: true });

export const Simulation = mongoose.model('Simulation', simulationSchema);
