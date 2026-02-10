import { User } from '../models/User.js';

export async function favoritePlanet(req, res) {
  const { planetId } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.sub,
    { $addToSet: { favorites: planetId } },
    { new: true }
  ).populate('favorites');

  return res.json({ data: user.favorites });
}
