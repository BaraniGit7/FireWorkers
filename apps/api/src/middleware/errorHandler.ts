import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/appError.js";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const timestamp = new Date().toISOString();

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      data: null,
      error: {
        code: err.code,
        message: err.message,
        details: err.details || null
      },
      meta: { timestamp }
    });
  }

  if (err instanceof ZodError || err?.name === "ZodError" || Array.isArray(err?.issues)) {
    const issues = err.issues || err.errors || [];
    return res.status(400).json({
      success: false,
      data: null,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid request payload",
        details: {
          errors: issues.map((e: any) => ({
            field: Array.isArray(e.path) ? e.path.join(".") : String(e.path || ""),
            message: e.message
          }))
        }
      },
      meta: { timestamp }
    });
  }

  console.error("Unhandled Error:", err);

  return res.status(500).json({
    success: false,
    data: null,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred. Please try again later."
    },
    meta: { timestamp }
  });
}
