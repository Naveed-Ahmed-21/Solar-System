'use client';

import { useEffect, useMemo, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { SolarScene } from '@/components/SolarScene';
import { ControlDock } from '@/components/ControlDock';
import { PlanetDetails } from '@/components/PlanetDetails';
import { fetchPlanets } from '@/lib/api';
import { Planet } from '@/lib/types';

export default function Home() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [timeScale, setTimeScale] = useState(1);
  const [paused, setPaused] = useState(false);
  const [showOrbits, setShowOrbits] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [compressedScale, setCompressedScale] = useState(true);
  const [freeCamera, setFreeCamera] = useState(false);

  useEffect(() => {
    fetchPlanets().then(setPlanets).catch(() => setPlanets([]));
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, duration: 1.4 });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' });
    return () => lenis.destroy();
  }, []);

  const active = useMemo(() => planets.find((planet) => planet.name === selectedPlanet), [planets, selectedPlanet]);

  const onToggle = (key: 'paused' | 'showOrbits' | 'showLabels' | 'compressedScale' | 'freeCamera') => {
    if (key === 'paused') setPaused((prev) => !prev);
    if (key === 'showOrbits') setShowOrbits((prev) => !prev);
    if (key === 'showLabels') setShowLabels((prev) => !prev);
    if (key === 'compressedScale') setCompressedScale((prev) => !prev);
    if (key === 'freeCamera') setFreeCamera((prev) => !prev);
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <motion.div className="hero-title absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-full border border-blue-200/30 bg-blue-950/40 px-6 py-2 text-xs uppercase tracking-[0.3em] text-blue-100">
        SolarScope — Cinematic Physics Explorer
      </motion.div>

      <ControlDock
        timeScale={timeScale}
        paused={paused}
        showOrbits={showOrbits}
        showLabels={showLabels}
        compressedScale={compressedScale}
        freeCamera={freeCamera}
        onTimeScale={setTimeScale}
        onToggle={onToggle}
      />

      <SolarScene
        planets={planets}
        selectedPlanet={selectedPlanet}
        timeScale={timeScale}
        paused={paused}
        showOrbits={showOrbits}
        labels={showLabels}
        compressedScale={compressedScale}
        freeCamera={freeCamera}
        onSelect={setSelectedPlanet}
      />

      <PlanetDetails planet={active} />
    </main>
  );
}
