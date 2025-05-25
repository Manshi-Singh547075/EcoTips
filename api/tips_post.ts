import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertTipSchema } from '../shared/schema';
import { fromZodError } from 'zod-validation-error';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const validationResult = insertTipSchema.safeParse(req.body);

    if (!validationResult.success) {
      const errorMessage = fromZodError(validationResult.error).message;
      res.status(400).json({ message: errorMessage });
      return;
    }

    const category = await storage.getCategoryById(validationResult.data.categoryId);
    if (!category) {
      res.status(400).json({ message: 'Invalid category ID' });
      return;
    }

    const newTip = await storage.createTip(validationResult.data);
    res.status(201).json(newTip);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create tip' });
  }
}
