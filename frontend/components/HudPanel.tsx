'use client';

import { motion } from 'framer-motion';
import { PlanetInfo } from '../lib/planets';

type Props = {
  selected: PlanetInfo | undefined;
  timeScale: number;
  onTimeScale: (v: number) => void;
  showOrbits: boolean;
  toggleOrbits: () => void;
  freeCamera: boolean;
  toggleCamera: () => void;
  paused: boolean;
  togglePause: () => void;
};

export function HudPanel(props: Props) {
  return (
    <div className="absolute inset-0 pointer-events-none p-6 flex justify-between">
      <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} className="panel pointer-events-auto p-5 w-[320px] h-fit space-y-3">
        <h1 className="text-xl font-semibold">SolarScope</h1>
        <p className="text-sm text-white/70">Travel through space-time. Scroll and click planets to inspect live physics metrics.</p>
        <label className="text-xs uppercase tracking-[0.2em] text-accent">Time Scale: {props.timeScale.toFixed(2)}x</label>
        <input type="range" min={-20} max={1000} step={1} value={props.timeScale} onChange={(e) => props.onTimeScale(Number(e.target.value))} className="w-full" />
        <div className="grid grid-cols-2 gap-2">
          <button className="panel px-3 py-2" onClick={props.toggleOrbits}>{props.showOrbits ? 'Hide' : 'Show'} orbits</button>
          <button className="panel px-3 py-2" onClick={props.toggleCamera}>{props.freeCamera ? 'Focus mode' : 'Free camera'}</button>
          <button className="panel px-3 py-2 col-span-2" onClick={props.togglePause}>{props.paused ? 'Resume simulation' : 'Pause simulation'}</button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="panel pointer-events-auto p-5 w-[320px] h-fit space-y-2">
        {props.selected ? (
          <>
            <h2 className="text-lg font-semibold">{props.selected.name}</h2>
            <div className="grid grid-cols-2 gap-2 text-sm text-white/80">
              <p>Mass</p><p>{props.selected.mass}</p>
              <p>Gravity</p><p>{props.selected.gravity}</p>
              <p>Escape v</p><p>{props.selected.escapeVelocity}</p>
              <p>Temp</p><p>{props.selected.temperature}</p>
              <p>Moons</p><p>{props.selected.moons}</p>
            </div>
          </>
        ) : (
          <p className="text-white/70">Select a planet for detail view and animated camera orbit.</p>
        )}
      </motion.div>
    </div>
  );
}
