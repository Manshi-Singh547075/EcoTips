import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const query = req.query.query as string;
  if (!query || query.trim().length < 2) {
    res.status(400).json({ message: 'Search query must be at least 2 characters' });
    return;
  }

  try {
    const results = await storage.searchTips(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search tips' });
  }
}
