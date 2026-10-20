import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "../utils/appError.js";
import { UserRole, USER_ROLES, SELLER_STATUS } from "@fireworks/shared";
import { prisma } from "../config/prisma.js";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : req.cookies?.token;

  if (!token) {
    return next(new AppError(401, "Authentication token is missing. Please log in.", "UNAUTHORIZED"));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthUser;
    req.user = decoded;
    next();
  } catch (error) {
    return next(new AppError(401, "Invalid or expired authentication session.", "INVALID_TOKEN"));
  }
};

export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError(401, "Authentication required", "UNAUTHORIZED"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          403,
          `Access forbidden. Role '${req.user.role}' is not authorized for this resource.`,
          "FORBIDDEN"
        )
      );
    }

    next();
  };
};

export const requireVerifiedSeller = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== USER_ROLES.SELLER) {
    return next(new AppError(403, "Access restricted to sellers only", "SELLER_REQUIRED"));
  }

  try {
    const seller = await prisma.sellerProfile.findUnique({
      where: { userId: req.user.id }
    });

    if (!seller) {
      return next(new AppError(403, "Seller onboarding profile not found. Please complete registration.", "SELLER_PROFILE_NOT_FOUND"));
    }

    if (seller.verificationStatus !== SELLER_STATUS.APPROVED) {
      return next(
        new AppError(
          403,
          `Your seller account is currently ${seller.verificationStatus}. PESO license and KYC approval is required before performing this action.`,
          "SELLER_NOT_VERIFIED",
          { status: seller.verificationStatus, rejectionReason: seller.rejectionReason }
        )
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};
