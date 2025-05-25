import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../shared/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PATCH') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const tipId = parseInt(req.query.id as string);
  if (isNaN(tipId)) {
    res.status(400).json({ message: 'Invalid tip ID' });
    return;
  }

  const { action } = req.body;
  if (action !== 'like' && action !== 'unlike') {
    res.status(400).json({ message: "Invalid action. Use 'like' or 'unlike'" });
    return;
  }

  try {
    const updatedTip = await storage.updateTipLikes(tipId, action === 'like');
    if (!updatedTip) {
      res.status(404).json({ message: 'Tip not found' });
      return;
    }
    res.status(200).json(updatedTip);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update tip likes' });
  }
}
