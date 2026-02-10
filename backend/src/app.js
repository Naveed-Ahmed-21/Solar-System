import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import planetRoutes from './routes/planetRoutes.js';
import physicsRoutes from './routes/physicsRoutes.js';
import simulationRoutes from './routes/simulationRoutes.js';
import systemRoutes from './routes/systemRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { env } from './config/env.js';

export const app = express();

app.use(cors({ origin: env.clientOrigin }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/planets', planetRoutes);
app.use('/api/v1/physics', physicsRoutes);
app.use('/api/v1/simulations', simulationRoutes);
app.use('/api/v1/systems', systemRoutes);
app.use('/api/v1/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Unexpected server error.' });
});
