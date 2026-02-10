import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routesV1 from './routes/v1.js';

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan('dev'));

  app.get('/health', (_, res) => res.json({ ok: true, service: 'solarscope-api' }));
  app.use('/api/v1', routesV1);

  return app;
}
