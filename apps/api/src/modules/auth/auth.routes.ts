import { Router } from "express";
import { authController } from "./auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { authenticateToken } from "../../middleware/auth.js";
import { registerSchema, loginSchema } from "@fireworks/shared";

export const authRouter = Router();

authRouter.post("/register", validate(registerSchema), (req, res, next) => {
  authController.register(req, res, next);
});

authRouter.post("/login", validate(loginSchema), (req, res, next) => {
  authController.login(req, res, next);
});

authRouter.post("/refresh", (req, res, next) => {
  authController.refresh(req, res, next);
});

authRouter.post("/logout", authenticateToken, (req, res, next) => {
  authController.logout(req, res, next);
});

authRouter.get("/me", authenticateToken, (req, res, next) => {
  authController.me(req, res, next);
});
