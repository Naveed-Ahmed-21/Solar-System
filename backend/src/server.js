import dotenv from 'dotenv';
import { createApp } from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';

const app = createApp();

connectDB(MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`SolarScope API on :${PORT}`)))
  .catch((error) => {
    console.error('Database connection failed', error.message);
    process.exit(1);
  });
