import { Simulation } from '../models/Simulation.js';

export async function saveSimulation(req, res) {
  const simulation = await Simulation.create({ ...req.body, userId: req.user.sub });
  return res.status(201).json({ data: simulation });
}

export async function listSimulations(req, res) {
  const simulations = await Simulation.find({ userId: req.user.sub }).sort({ createdAt: -1 }).lean();
  return res.json({ data: simulations });
}

export async function cloneSimulation(req, res) {
  const source = await Simulation.findOne({ _id: req.params.id, userId: req.user.sub });
  if (!source) return res.status(404).json({ error: 'Simulation not found.' });

  const clone = await Simulation.create({
    userId: req.user.sub,
    name: `${source.name} (Clone)`,
    timeScale: source.timeScale,
    isPaused: source.isPaused,
    selectedPlanetId: source.selectedPlanetId,
    analytics: source.analytics,
    snapshot: source.snapshot
  });

  return res.status(201).json({ data: clone });
}
