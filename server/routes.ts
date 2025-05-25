import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "shared/storage.ts";
import { insertTipSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes prefix
  const apiPrefix = "/api";

  // Get all categories
  app.get(`${apiPrefix}/categories`, async (_req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Get all tips
  app.get(`${apiPrefix}/tips`, async (_req: Request, res: Response) => {
    try {
      const tips = await storage.getTips();
      res.json(tips);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tips" });
    }
  });

  // Get tips by category
  app.get(`${apiPrefix}/tips/category/:id`, async (req: Request, res: Response) => {
    try {
      const categoryId = parseInt(req.params.id);
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      
      // Verify category exists
      const category = await storage.getCategoryById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      const tips = await storage.getTipsByCategory(categoryId);
      res.json(tips);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tips by category" });
    }
  });

  // Get featured tip
  app.get(`${apiPrefix}/tips/featured`, async (_req: Request, res: Response) => {
    try {
      const featuredTip = await storage.getFeatureTip();
      if (!featuredTip) {
        return res.status(404).json({ message: "No featured tip found" });
      }
      res.json(featuredTip);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured tip" });
    }
  });

  // Get tip by ID
  app.get(`${apiPrefix}/tips/:id`, async (req: Request, res: Response) => {
    try {
      const tipId = parseInt(req.params.id);
      if (isNaN(tipId)) {
        return res.status(400).json({ message: "Invalid tip ID" });
      }
      
      const tip = await storage.getTipById(tipId);
      if (!tip) {
        return res.status(404).json({ message: "Tip not found" });
      }
      
      res.json(tip);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tip" });
    }
  });

  // Create a new tip
  app.post(`${apiPrefix}/tips`, async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validationResult = insertTipSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const errorMessage = fromZodError(validationResult.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      // Verify category exists
      const category = await storage.getCategoryById(validationResult.data.categoryId);
      if (!category) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      
      const newTip = await storage.createTip(validationResult.data);
      res.status(201).json(newTip);
    } catch (error) {
      res.status(500).json({ message: "Failed to create tip" });
    }
  });

  // Update tip likes
  app.patch(`${apiPrefix}/tips/:id/like`, async (req: Request, res: Response) => {
    try {
      const tipId = parseInt(req.params.id);
      if (isNaN(tipId)) {
        return res.status(400).json({ message: "Invalid tip ID" });
      }
      
      // Get the action (like or unlike)
      const { action } = req.body;
      if (action !== 'like' && action !== 'unlike') {
        return res.status(400).json({ message: "Invalid action. Use 'like' or 'unlike'" });
      }
      
      const updatedTip = await storage.updateTipLikes(tipId, action === 'like');
      if (!updatedTip) {
        return res.status(404).json({ message: "Tip not found" });
      }
      
      res.json(updatedTip);
    } catch (error) {
      res.status(500).json({ message: "Failed to update tip likes" });
    }
  });

  // Search tips
  app.get(`${apiPrefix}/tips/search/:query`, async (req: Request, res: Response) => {
    try {
      const query = req.params.query;
      if (!query || query.trim().length < 2) {
        return res.status(400).json({ message: "Search query must be at least 2 characters" });
      }
      
      const results = await storage.searchTips(query);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to search tips" });
    }
  });

  // Fallback route for unmatched routes - return 404
  app.all('*', (_req: Request, res: Response) => {
    res.status(404).json({ message: 'Route not found' });
  });

  const httpServer = createServer(app);
  return httpServer;
}
