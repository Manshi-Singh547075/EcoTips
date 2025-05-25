import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../shared/storage.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const categories = await storage.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
}
