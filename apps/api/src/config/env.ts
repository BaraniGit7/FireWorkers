import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("5000").transform(Number),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  CLIENT_URL: z.string().default("http://localhost:5173"),
  DATABASE_URL: z.string().default("postgresql://postgres:postgres@localhost:5432/fireworks_db?schema=public"),
  JWT_SECRET: z.string().default("firecracker_marketplace_secret_jwt_key_2026"),
  JWT_REFRESH_SECRET: z.string().default("firecracker_marketplace_refresh_jwt_key_2026"),
  FEATURE_ENABLE_LIVE_CHECKOUT: z
    .string()
    .default("false")
    .transform((val) => val === "true")
});

export const env = envSchema.parse(process.env);
