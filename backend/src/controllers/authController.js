import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { env } from '../config/env.js';

function tokenFor(user) {
  return jwt.sign({ sub: user._id, email: user.email, name: user.name }, env.jwtSecret, { expiresIn: '7d' });
}

export async function register(req, res) {
  const { email, password, name } = req.body;
  if (!email || !password || !name) return res.status(400).json({ error: 'email, password, and name are required.' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: 'Email already in use.' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash, name });
  return res.status(201).json({ token: tokenFor(user), user: { id: user._id, email: user.email, name: user.name } });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials.' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials.' });

  return res.json({ token: tokenFor(user), user: { id: user._id, email: user.email, name: user.name } });
}
