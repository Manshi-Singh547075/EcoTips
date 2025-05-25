import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const categoryId = parseInt(req.query.id as string);
  if (isNaN(categoryId)) {
    res.status(400).json({ message: 'Invalid category ID' });
    return;
  }

  try {
    const category = await storage.getCategoryById(categoryId);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    const tips = await storage.getTipsByCategory(categoryId);
    res.status(200).json(tips);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tips by category' });
  }
}
