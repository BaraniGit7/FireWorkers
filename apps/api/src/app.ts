import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { AppError } from "./utils/appError.js";
import { authRouter } from "./modules/auth/index.js";

export const app: Application = express();

// Security and parsing middleware
app.use(
  cors({
    origin: [env.CLIENT_URL, "http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Idempotency-Key"]
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// System Health & Regulatory Status Route
app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      status: "ONLINE",
      version: "1.0.0",
      environment: env.NODE_ENV,
      liveCheckoutEnabled: env.FEATURE_ENABLE_LIVE_CHECKOUT,
      regulatoryFramework: {
        act: "Explosives Act 1884 / Explosives Rules 2008",
        licensing: "PESO LE-1/LE-3/LE-5 compliant click-and-collect",
        certification: "CSIR-NEERI Green Crackers only"
      }
    },
    error: null,
    meta: { timestamp: new Date().toISOString() }
  });
});

// Mount module routes
app.use("/api/v1/auth", authRouter);

// Unmatched routes 404 handler
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, `Endpoint ${req.method} ${req.originalUrl} not found.`, "ROUTE_NOT_FOUND"));
});

// Global error handler
app.use(errorHandler);
