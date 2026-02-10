import { Planet } from './types';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export async function fetchPlanets(): Promise<Planet[]> {
  const res = await fetch(`${API}/planets`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch planets');
  const json = await res.json();
  return json.data;
}
