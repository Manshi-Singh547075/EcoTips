import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const tips = await storage.getTips();
    res.status(200).json(tips);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tips' });
  }
}
