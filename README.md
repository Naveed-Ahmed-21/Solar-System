# SolarScope – Interactive Solar System Exploration Platform

SolarScope is a production-oriented full-stack platform that blends cinematic UI, 3D orbital rendering, and physics APIs for planetary simulation.

## Tech Stack
- **Frontend:** Next.js 14, React Three Fiber, Three.js, Framer Motion, GSAP, Lenis, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT Auth
- **Visualization:** Real-time orbital animation + data HUD with physics metrics

## Monorepo Structure
- `frontend/` – SSR app and immersive 3D UI
- `backend/` – versioned REST API, auth, and physics engine
- `docs/architecture.md` – architecture and deployment blueprint

## Key Features Implemented
- Animated starfield with orbiting planets and Sun-centric cinematic scene
- Camera fly/focus behavior with selectable planets
- Time controls: reverse, pause/resume, variable simulation rates
- Orbit and free-camera toggles
- Planet detail glassmorphism HUD with animated transitions
- Physics endpoints for orbital period, escape velocity, gravity, interplanet distance, and stability scoring
- Auth endpoints (register/login), saved simulations, custom system creation + cloning, planet comparison

## API Overview
Base path: `/api/v1`

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Planets / Simulations
- `GET /planets`
- `GET /planets/compare/:firstId/:secondId`
- `POST /simulations` (auth)

### Custom Systems
- `POST /custom-systems` (auth)
- `POST /custom-systems/:id/clone` (auth)

### Physics
- `POST /physics/orbital-period`
- `POST /physics/escape-velocity`
- `POST /physics/surface-gravity`
- `POST /physics/distance`
- `POST /physics/stability`

## Environment Variables
### Backend
- `MONGO_URI`
- `JWT_SECRET`
- `PORT`

### Frontend
- `NEXT_PUBLIC_API_BASE`

## Local Development
```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:3000` and backend on `http://localhost:4000`.

## Validation
```bash
npm run test -w backend
```
