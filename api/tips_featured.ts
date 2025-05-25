import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const featuredTip = await storage.getFeatureTip();
    if (!featuredTip) {
      res.status(404).json({ message: 'No featured tip found' });
      return;
    }
    res.status(200).json(featuredTip);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch featured tip' });
  }
}
