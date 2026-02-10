# SolarScope – Interactive Solar System Exploration Platform

SolarScope is a production-oriented full-stack platform for cinematic exploration and physics-based simulation of the solar system.

## Tech Stack
- **Frontend**: Next.js, React Three Fiber/Three.js, GSAP, Framer Motion, Tailwind CSS, Lenis, Recharts
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT auth

## Monorepo Structure
- `frontend/` – immersive 3D UI and motion-driven exploration experience
- `backend/` – versioned API, physics calculation engine, auth, simulation persistence
- `docs/ARCHITECTURE.md` – architecture and deployment overview

## Features
- Animated 3D solar system with orbital motion and cinematic dark theme
- Interaction controls: pause/resume, reverse time, speed scaling, orbit toggles, camera mode, compressed/real scale switch
- Planet detail cards with animated data charts (gravity, escape velocity, thermal profile)
- Backend formula endpoints for:
  - Orbital period
  - Escape velocity
  - Surface gravity
  - Interplanetary distance at time `T`
  - Simplified system stability scoring
- JWT auth, favorites, saved simulations, clone simulation, custom star systems
- MongoDB schema design for Users/Planets/Moons/Simulations/CustomSolarSystems

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env vars:
   ```bash
   cp .env.example .env
   ```
3. Run development servers:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000`

## Deployment
- Frontend: Vercel
- Backend: Render/Railway
- Configure environment variables per `.env.example`
