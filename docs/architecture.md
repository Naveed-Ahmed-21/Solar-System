# SolarScope Architecture

## Frontend (Next.js + React Three Fiber)
- **App Router** based cinematic shell with client-rendered 3D canvas.
- **R3F scene graph** renders starfield, Sun, dynamic orbit lines, and physically scaled planet meshes.
- **Motion stack**: Framer Motion for panel choreography, GSAP for intro luminance ramp, Lenis for smooth scroll interpolation.
- **Performance hooks**: orbit path memoization, constrained camera updates, and explicit free-camera toggles.

## Backend (Express + MongoDB)
- Versioned API namespace at `/api/v1`.
- JWT-based auth and protected simulation/system routes.
- Domain models: Users, Planets, Moons, Simulations, CustomSolarSystems.
- Physics engine module with formula-first orbital mechanics and stability heuristics.

## Data Flow
1. Frontend consumes `/api/v1/planets` and physics endpoints.
2. User manipulates time scale and system controls; state is persisted via `/api/v1/simulations`.
3. Custom systems post planet arrays and star mass to `/api/v1/custom-systems` to compute stability warnings.

## Deployment
- **Frontend:** Vercel (`frontend` workspace)
- **Backend:** Render/Railway (`backend` workspace)
- Environment variables: `MONGO_URI`, `JWT_SECRET`, `PORT`, `NEXT_PUBLIC_API_BASE`.
