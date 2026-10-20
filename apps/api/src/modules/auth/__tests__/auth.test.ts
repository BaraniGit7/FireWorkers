import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import { app } from "../../../app.js";
import { env } from "../../../config/env.js";
import { USER_ROLES } from "@fireworks/shared";

describe("Phase 1: API Foundation & Authentication Tests", () => {
  describe("Health & System Status", () => {
    it("should return 200 and online status with regulatory details", async () => {
      const res = await request(app).get("/api/v1/health");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe("ONLINE");
      expect(res.body.data.liveCheckoutEnabled).toBe(false);
      expect(res.body.data.regulatoryFramework.act).toContain("Explosives Act");
      expect(res.body.data.regulatoryFramework.certification).toContain("CSIR-NEERI");
    });

    it("should return 404 for unknown routes in RFC standard format", async () => {
      const res = await request(app).get("/api/v1/non-existent-endpoint");

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe("ROUTE_NOT_FOUND");
    });
  });

  describe("Request Validation Middleware", () => {
    it("should reject registration with invalid email", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "not-an-email",
          phone: "9876543210",
          password: "Password1",
          fullName: "Test User"
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
      expect(res.body.error.details.errors.some((e: any) => e.field === "email")).toBe(true);
    });

    it("should reject registration with invalid Indian phone number", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "valid@fireworks.com",
          phone: "12345", // Not 10-digit Indian format starting with 6-9
          password: "Password1",
          fullName: "Test User"
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
      expect(res.body.error.details.errors.some((e: any) => e.field === "phone")).toBe(true);
    });

    it("should reject registration with weak password (missing uppercase or digit)", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "valid@fireworks.com",
          phone: "9876543210",
          password: "weakpassword", // No uppercase, no digit
          fullName: "Test User"
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should reject login with empty credentials", async () => {
      const res = await request(app).post("/api/v1/auth/login").send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });

  describe("Authentication & RBAC Security Guards", () => {
    it("should reject access to /api/v1/auth/me when no token is provided", async () => {
      const res = await request(app).get("/api/v1/auth/me");

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe("UNAUTHORIZED");
    });

    it("should reject access to /api/v1/auth/me with an invalid JWT token", async () => {
      const res = await request(app)
        .get("/api/v1/auth/me")
        .set("Authorization", "Bearer invalid-tampered-token");

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe("INVALID_TOKEN");
    });

    it("should accept a valid JWT token via Authorization Bearer header", async () => {
      const validToken = jwt.sign(
        {
          id: "mock-user-uuid",
          email: "customer@fireworks.com",
          role: USER_ROLES.CUSTOMER
        },
        env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Testing token authentication on logout which doesn't query DB
      const res = await request(app)
        .post("/api/v1/auth/logout")
        .set("Authorization", `Bearer ${validToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.message).toBe("Successfully logged out.");
    });
  });
});
