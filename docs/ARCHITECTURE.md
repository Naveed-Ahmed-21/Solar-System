# SolarScope Architecture

## Overview
SolarScope is a full-stack monorepo with:
- **Frontend**: Next.js + React Three Fiber cinematic UI.
- **Backend**: Express API with MongoDB persistence and physics computation engine.

## Runtime Components
- **Next.js app (`frontend`)**
  - 3D renderer (Three.js/R3F)
  - Motion stack (GSAP + Framer Motion)
  - Data visualization (Recharts)
- **Express API (`backend`)**
  - Versioned REST endpoints under `/api/v1`
  - JWT authentication
  - Physics engine (orbital period, gravity, escape velocity, distance-at-time, stability)
  - Simulation and custom-system persistence
- **MongoDB**
  - Normalized collections: `Users`, `Planets`, `Moons`, `Simulations`, `CustomSolarSystems`

## API Surface
- `POST /api/v1/auth/register` / `POST /api/v1/auth/login`
- `GET /api/v1/planets`, `GET /api/v1/planets/:name`, `GET /api/v1/planets/compare`
- `POST /api/v1/physics/orbital-period`
- `POST /api/v1/physics/escape-velocity`
- `POST /api/v1/physics/gravity`
- `GET /api/v1/physics/distance`
- `POST /api/v1/physics/stability`
- Authenticated: `/api/v1/simulations`, `/api/v1/systems`, `/api/v1/users/favorites`

## Deployment
- Frontend: Vercel (set `NEXT_PUBLIC_API_URL`)
- Backend: Render or Railway (set Mongo and JWT environment variables)
