'use client';

import { motion } from 'framer-motion';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Planet } from '@/lib/types';

export function PlanetDetails({ planet }: { planet?: Planet }) {
  if (!planet) {
    return <div className="glass-panel absolute bottom-6 right-6 z-20 w-[360px] rounded-2xl p-5 text-sm">Select a planet to inspect mass, gravity, and thermal profile.</div>;
  }

  const chartData = [
    { key: 'Gravity', value: Number((planet.derived?.gravityMps2 || 0).toFixed(1)) },
    { key: 'Escape v', value: Number(((planet.derived?.escapeVelocityMps || 0) / 1000).toFixed(1)) },
    { key: 'Temp', value: planet.temperatureK }
  ];

  return (
    <motion.div
      key={planet.name}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-panel absolute bottom-6 right-6 z-20 w-[360px] rounded-2xl p-5 shadow-glow"
    >
      <h3 className="text-xl font-semibold">{planet.name}</h3>
      <p className="mb-4 text-sm text-blue-100">{planet.description}</p>
      <ul className="grid grid-cols-2 gap-2 text-xs text-blue-50">
        <li>Mass: {(planet.massKg / 1e24).toFixed(2)} ×10²⁴ kg</li>
        <li>Gravity: {(planet.derived?.gravityMps2 || 0).toFixed(2)} m/s²</li>
        <li>Escape v: {((planet.derived?.escapeVelocityMps || 0) / 1000).toFixed(2)} km/s</li>
        <li>Temperature: {planet.temperatureK} K</li>
        <li>Moons: {planet.moonsCount}</li>
        <li>Axial Tilt: {planet.axialTiltDeg}°</li>
      </ul>
      <div className="mt-4 h-36">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2c436f" />
            <XAxis dataKey="key" stroke="#b0ceff" />
            <YAxis stroke="#b0ceff" />
            <Tooltip />
            <Bar dataKey="value" fill="#74a8ff" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
