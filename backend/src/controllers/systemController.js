import { Planet } from '../models/Planet.js';
import { Simulation } from '../models/Simulation.js';
import { CustomSolarSystem } from '../models/CustomSolarSystem.js';
import { systemStabilityScore } from '../services/physicsService.js';

export const systemController = {
  async listPlanets(_, res) {
    const planets = await Planet.find().sort({ orbitRadiusMeters: 1 });
    return res.json(planets);
  },
  async comparePlanets(req, res) {
    const { firstId, secondId } = req.params;
    const [a, b] = await Promise.all([Planet.findById(firstId), Planet.findById(secondId)]);
    if (!a || !b) return res.status(404).json({ message: 'Planet not found' });
    return res.json({
      gravityRatio: (a.massKg / (a.radiusMeters ** 2)) / (b.massKg / (b.radiusMeters ** 2)),
      radiusDelta: a.radiusMeters - b.radiusMeters,
      temperatureDelta: a.temperatureKelvin - b.temperatureKelvin
    });
  },
  async saveSimulation(req, res) {
    const simulation = await Simulation.create({ ...req.body, user: req.user.sub });
    return res.status(201).json(simulation);
  },
  async createCustomSystem(req, res) {
    const score = systemStabilityScore(req.body.planets.map((planet) => ({ ...planet, starMassKg: req.body.starMassKg })));
    const warning = score < 0.35 ? 'Critical instability: orbit crossing likely' : null;
    const system = await CustomSolarSystem.create({ ...req.body, user: req.user.sub, stabilityScore: score, warning });
    return res.status(201).json(system);
  },
  async cloneSystem(req, res) {
    const source = await CustomSolarSystem.findById(req.params.id);
    if (!source) return res.status(404).json({ message: 'System not found' });
    const clone = await CustomSolarSystem.create({
      user: req.user.sub,
      name: `${source.name} (Clone)`,
      starMassKg: source.starMassKg,
      planets: source.planets,
      stabilityScore: source.stabilityScore,
      warning: source.warning
    });
    return res.status(201).json(clone);
  }
};
