'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Line } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { PlanetInfo, planets } from '../lib/planets';

type Props = {
  timeScale: number;
  selectedPlanet: string | null;
  showOrbits: boolean;
  freeCamera: boolean;
  onSelectPlanet: (id: string) => void;
};

function PlanetMesh({ planet, timeScale, selectedPlanet, onSelectPlanet }: { planet: PlanetInfo; timeScale: number; selectedPlanet: string | null; onSelectPlanet: (id: string) => void; }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime() * timeScale;
    const x = Math.cos(t * planet.orbitSpeed) * planet.orbitRadius;
    const z = Math.sin(t * planet.orbitSpeed) * planet.orbitRadius;
    ref.current.position.set(x, 0, z);
    ref.current.rotation.y += delta * 0.4;
  });

  return (
    <mesh ref={ref} onClick={() => onSelectPlanet(planet.id)}>
      <sphereGeometry args={[Math.max(planet.radius * 0.25, 0.35), 32, 32]} />
      <meshStandardMaterial color={planet.color} emissive={selectedPlanet === planet.id ? '#ffffff' : '#111111'} emissiveIntensity={selectedPlanet === planet.id ? 0.35 : 0.1} />
    </mesh>
  );
}

function FocusCamera({ selectedPlanet, timeScale }: { selectedPlanet: string | null; timeScale: number }) {
  const { camera } = useThree();
  useFrame((state) => {
    if (!selectedPlanet) return;
    const planet = planets.find((item) => item.id === selectedPlanet);
    if (!planet) return;
    const t = state.clock.getElapsedTime() * timeScale;
    const target = new THREE.Vector3(
      Math.cos(t * planet.orbitSpeed) * planet.orbitRadius,
      0,
      Math.sin(t * planet.orbitSpeed) * planet.orbitRadius
    );
    const desired = target.clone().add(new THREE.Vector3(6, 3, 6));
    camera.position.lerp(desired, 0.04);
    camera.lookAt(target);
  });
  return null;
}

export function SolarScene(props: Props) {
  const orbitPoints = useMemo(
    () => planets.map((planet) => new THREE.EllipseCurve(0, 0, planet.orbitRadius, planet.orbitRadius, 0, Math.PI * 2).getPoints(64).map((pt) => new THREE.Vector3(pt.x, 0, pt.y))),
    []
  );

  return (
    <Canvas camera={{ position: [0, 35, 100], fov: 50 }}>
      <color attach="background" args={['#040511']} />
      <ambientLight intensity={0.3} />
      <pointLight intensity={2.1} color="#f9a826" position={[0, 0, 0]} />
      <Stars radius={220} depth={90} factor={7} saturation={0} fade speed={0.75} />
      <mesh>
        <sphereGeometry args={[4, 64, 64]} />
        <meshStandardMaterial color="#f9a826" emissive="#f29e0b" emissiveIntensity={0.8} />
      </mesh>
      {props.showOrbits && orbitPoints.map((points, index) => <Line key={planets[index].id} points={points} color="#3b415a" lineWidth={0.8} />)}
      {planets.map((planet) => <PlanetMesh key={planet.id} planet={planet} timeScale={props.timeScale} selectedPlanet={props.selectedPlanet} onSelectPlanet={props.onSelectPlanet} />)}
      {!props.freeCamera && <FocusCamera selectedPlanet={props.selectedPlanet} timeScale={props.timeScale} />}
      <OrbitControls enabled={props.freeCamera} enablePan={props.freeCamera} />
    </Canvas>
  );
}
