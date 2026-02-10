export type PlanetInfo = {
  id: string;
  name: string;
  color: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  axialTilt: number;
  mass: string;
  gravity: string;
  escapeVelocity: string;
  temperature: string;
  moons: number;
};

export const planets: PlanetInfo[] = [
  { id: 'mercury', name: 'Mercury', color: '#b7b8ba', radius: 0.38, orbitRadius: 10, orbitSpeed: 4.15, axialTilt: 0.03, mass: '3.3011×10²³ kg', gravity: '3.7 m/s²', escapeVelocity: '4.25 km/s', temperature: '167°C', moons: 0 },
  { id: 'venus', name: 'Venus', color: '#d8b37e', radius: 0.95, orbitRadius: 15, orbitSpeed: 1.62, axialTilt: 177.4, mass: '4.8675×10²⁴ kg', gravity: '8.87 m/s²', escapeVelocity: '10.36 km/s', temperature: '464°C', moons: 0 },
  { id: 'earth', name: 'Earth', color: '#4fa8ff', radius: 1, orbitRadius: 20, orbitSpeed: 1, axialTilt: 23.4, mass: '5.972×10²⁴ kg', gravity: '9.81 m/s²', escapeVelocity: '11.19 km/s', temperature: '15°C', moons: 1 },
  { id: 'mars', name: 'Mars', color: '#c85c43', radius: 0.53, orbitRadius: 25, orbitSpeed: 0.53, axialTilt: 25.2, mass: '6.4171×10²³ kg', gravity: '3.71 m/s²', escapeVelocity: '5.03 km/s', temperature: '-65°C', moons: 2 },
  { id: 'jupiter', name: 'Jupiter', color: '#cfa97d', radius: 11.2, orbitRadius: 40, orbitSpeed: 0.084, axialTilt: 3.1, mass: '1.8982×10²⁷ kg', gravity: '24.79 m/s²', escapeVelocity: '59.5 km/s', temperature: '-110°C', moons: 95 },
  { id: 'saturn', name: 'Saturn', color: '#e8d299', radius: 9.45, orbitRadius: 55, orbitSpeed: 0.034, axialTilt: 26.7, mass: '5.6834×10²⁶ kg', gravity: '10.44 m/s²', escapeVelocity: '35.5 km/s', temperature: '-140°C', moons: 146 },
  { id: 'uranus', name: 'Uranus', color: '#8fd5eb', radius: 4.01, orbitRadius: 70, orbitSpeed: 0.012, axialTilt: 97.8, mass: '8.681×10²⁵ kg', gravity: '8.69 m/s²', escapeVelocity: '21.3 km/s', temperature: '-195°C', moons: 28 },
  { id: 'neptune', name: 'Neptune', color: '#4e78c8', radius: 3.88, orbitRadius: 85, orbitSpeed: 0.006, axialTilt: 28.3, mass: '1.02413×10²⁶ kg', gravity: '11.15 m/s²', escapeVelocity: '23.5 km/s', temperature: '-200°C', moons: 16 }
];
