'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Trail } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Planet } from '@/lib/types';

type Props = {
  planets: Planet[];
  selectedPlanet: string | null;
  timeScale: number;
  paused: boolean;
  showOrbits: boolean;
  labels: boolean;
  compressedScale: boolean;
  freeCamera: boolean;
  onSelect: (planetName: string) => void;
};

function PlanetMesh({ planet, timeScale, paused, compressedScale, selected, onSelect }: {
  planet: Planet;
  timeScale: number;
  paused: boolean;
  compressedScale: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const angle = useRef(Math.random() * Math.PI * 2);
  const orbitRadius = compressedScale ? Math.log2(planet.orbitalRadiusAu + 1) * 4 : planet.orbitalRadiusAu * 1.8;
  const radius = Math.max(0.25, Math.log10(planet.radiusKm) * 0.12);

  useFrame((_, delta) => {
    if (!paused) {
      angle.current += (delta * timeScale * 0.5) / planet.orbitalPeriodDays;
    }
    const x = Math.cos(angle.current * Math.PI * 2) * orbitRadius;
    const z = Math.sin(angle.current * Math.PI * 2) * orbitRadius;
    mesh.current.position.set(x, 0, z);
    mesh.current.rotation.z = (planet.axialTiltDeg * Math.PI) / 180;
  });

  return (
    <group>
      <mesh ref={mesh} onClick={onSelect}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={planet.colorHex} emissive={selected ? planet.colorHex : '#000'} emissiveIntensity={selected ? 0.8 : 0.2} />
      </mesh>
    </group>
  );
}

export function SolarScene(props: Props) {
  const orbitLines = useMemo(() => props.planets.map((planet) => {
    const r = props.compressedScale ? Math.log2(planet.orbitalRadiusAu + 1) * 4 : planet.orbitalRadiusAu * 1.8;
    return { name: planet.name, r };
  }), [props.compressedScale, props.planets]);

  return (
    <Canvas camera={{ position: [0, 22, 40], fov: 50 }}>
      <color attach="background" args={['#040712']} />
      <ambientLight intensity={0.45} />
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#ffcf6d" />
      <Stars radius={350} depth={60} count={4000} factor={6} fade speed={0.8} />
      <mesh>
        <sphereGeometry args={[2.4, 32, 32]} />
        <meshStandardMaterial emissive="#ff9933" emissiveIntensity={2} color="#f4b042" />
      </mesh>

      {props.showOrbits && orbitLines.map((orbit) => (
        <Trail key={orbit.name} width={0.1} length={120} color="#406bbf" attenuation={(t) => t}>
          <mesh rotation-x={Math.PI / 2}>
            <torusGeometry args={[orbit.r, 0.02, 10, 200]} />
            <meshBasicMaterial color="#406bbf" transparent opacity={0.35} />
          </mesh>
        </Trail>
      ))}

      {props.planets.map((planet) => (
        <PlanetMesh
          key={planet._id}
          planet={planet}
          timeScale={props.timeScale}
          paused={props.paused}
          compressedScale={props.compressedScale}
          selected={props.selectedPlanet === planet.name}
          onSelect={() => props.onSelect(planet.name)}
        />
      ))}
      <OrbitControls enabled={props.freeCamera} autoRotate={!props.freeCamera} autoRotateSpeed={0.35} />
    </Canvas>
  );
}
