'use client';

import { motion } from 'framer-motion';

type Props = {
  timeScale: number;
  paused: boolean;
  showOrbits: boolean;
  showLabels: boolean;
  compressedScale: boolean;
  freeCamera: boolean;
  onTimeScale: (value: number) => void;
  onToggle: (key: 'paused' | 'showOrbits' | 'showLabels' | 'compressedScale' | 'freeCamera') => void;
};

export function ControlDock({ timeScale, paused, showOrbits, showLabels, compressedScale, freeCamera, onTimeScale, onToggle }: Props) {
  return (
    <motion.div
      initial={{ x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="glass-panel absolute left-6 top-6 z-20 w-[320px] rounded-2xl p-4 shadow-glow"
    >
      <h2 className="mb-3 text-lg font-semibold">Simulation Controls</h2>
      <label className="text-sm text-blue-100">Time speed ({timeScale.toFixed(0)}x)</label>
      <input className="w-full" type="range" min={-1000} max={1000} step={1} value={timeScale} onChange={(e) => onTimeScale(Number(e.target.value))} />
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        {[
          ['paused', paused ? 'Resume' : 'Pause'],
          ['showOrbits', showOrbits ? 'Hide Orbits' : 'Show Orbits'],
          ['showLabels', showLabels ? 'Hide Labels' : 'Show Labels'],
          ['compressedScale', compressedScale ? 'Realistic Scale' : 'Compressed Scale'],
          ['freeCamera', freeCamera ? 'Guided Camera' : 'Free Camera']
        ].map(([key, label]) => (
          <button
            key={key}
            className="rounded-lg border border-blue-300/30 px-3 py-2 hover:bg-blue-200/10"
            onClick={() => onToggle(key as Props['onToggle'] extends (arg: infer U) => void ? U : never)}
          >
            {label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
