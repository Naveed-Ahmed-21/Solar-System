import { app } from './app.js';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';
import { Planet } from './models/Planet.js';
import { seedPlanets } from './seed/planets.js';

async function bootstrap() {
  await connectDb();

  const count = await Planet.countDocuments();
  if (count === 0) {
    await Planet.insertMany(seedPlanets);
    console.log('Seeded planets collection.');
  }

  app.listen(env.port, () => {
    console.log(`SolarScope backend running on port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Fatal bootstrap error', error);
  process.exit(1);
});
