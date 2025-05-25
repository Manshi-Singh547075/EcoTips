import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import { setupVite, serveStatic, log } from "../server/vite";
import type { VercelRequest, VercelResponse } from '@vercel/node';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

let routesRegistered = false;

async function setupApp() {
  if (!routesRegistered) {
    await registerRoutes(app);
    routesRegistered = true;
  }
}

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
  throw err;
});

// Vercel serverless handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  await setupApp();

  // In development, setup Vite middleware (not applicable in serverless)
  if (process.env.NODE_ENV === "development") {
    res.status(500).send("Development mode not supported in serverless environment");
    return;
  } else {
    serveStatic(app);
  }

  app(req, res);
}
