'use client';

import { useEffect, useMemo, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { HudPanel } from '../components/HudPanel';
import { SolarScene } from '../components/SolarScene';
import { planets } from '../lib/planets';

export default function Home() {
  const [timeScale, setTimeScale] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>('earth');
  const [showOrbits, setShowOrbits] = useState(true);
  const [freeCamera, setFreeCamera] = useState(false);
  const [paused, setPaused] = useState(false);

  const effectiveTime = paused ? 0 : timeScale;
  const selected = useMemo(() => planets.find((planet) => planet.id === selectedPlanet), [selectedPlanet]);

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, syncTouch: true });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    gsap.fromTo('body', { filter: 'brightness(0.65)' }, { filter: 'brightness(1)', duration: 2.5, ease: 'power2.out' });
    return () => lenis.destroy();
  }, []);

  return (
    <main className="h-screen w-screen relative">
      <SolarScene
        timeScale={effectiveTime / 100}
        selectedPlanet={selectedPlanet}
        showOrbits={showOrbits}
        freeCamera={freeCamera}
        onSelectPlanet={setSelectedPlanet}
      />
      <HudPanel
        selected={selected}
        timeScale={timeScale}
        onTimeScale={setTimeScale}
        showOrbits={showOrbits}
        toggleOrbits={() => setShowOrbits((s) => !s)}
        freeCamera={freeCamera}
        toggleCamera={() => setFreeCamera((s) => !s)}
        paused={paused}
        togglePause={() => setPaused((s) => !s)}
      />
    </main>
  );
}
