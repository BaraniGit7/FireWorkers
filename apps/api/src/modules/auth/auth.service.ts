import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma.js";
import { env } from "../../config/env.js";
import { AppError } from "../../utils/appError.js";
import { UserRole, USER_ROLES } from "@fireworks/shared";

interface RegisterInput {
  email: string;
  phone: string;
  password: string;
  fullName: string;
  role?: UserRole;
}

interface LoginInput {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  private generateTokens(user: { id: string; email: string; role: string }): AuthTokens {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    const accessToken = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: "1h"
    });

    const refreshToken = jwt.sign({ id: user.id }, env.JWT_REFRESH_SECRET, {
      expiresIn: "7d"
    });

    return { accessToken, refreshToken };
  }

  private sanitizeUser(user: any) {
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }

  async register(input: RegisterInput) {
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email: input.email.toLowerCase() }, { phone: input.phone }]
      }
    });

    if (existing) {
      if (existing.email.toLowerCase() === input.email.toLowerCase()) {
        throw new AppError(400, "An account with this email address already exists.", "EMAIL_ALREADY_EXISTS");
      }
      throw new AppError(400, "An account with this phone number already exists.", "PHONE_ALREADY_EXISTS");
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const assignedRole = (input.role as any) || USER_ROLES.CUSTOMER;

    const user = await prisma.user.create({
      data: {
        email: input.email.toLowerCase(),
        phone: input.phone,
        passwordHash,
        role: assignedRole,
        customerProfile: {
          create: {
            fullName: input.fullName,
            isAgeVerified: false
          }
        }
      },
      include: {
        customerProfile: true,
        sellerProfile: true
      }
    });

    const tokens = this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens
    };
  }

  async login(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
      include: {
        customerProfile: true,
        sellerProfile: true
      }
    });

    if (!user) {
      throw new AppError(401, "Invalid email or password.", "INVALID_CREDENTIALS");
    }

    if (!user.isActive) {
      throw new AppError(403, "Your account has been deactivated. Please contact compliance support.", "ACCOUNT_DEACTIVATED");
    }

    const isMatch = await bcrypt.compare(input.password, user.passwordHash);
    if (!isMatch) {
      throw new AppError(401, "Invalid email or password.", "INVALID_CREDENTIALS");
    }

    const tokens = this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens
    };
  }

  async refreshToken(token: string) {
    if (!token) {
      throw new AppError(401, "Refresh token is missing.", "MISSING_REFRESH_TOKEN");
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, env.JWT_REFRESH_SECRET);
    } catch {
      throw new AppError(401, "Invalid or expired refresh token. Please sign in again.", "INVALID_REFRESH_TOKEN");
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        customerProfile: true,
        sellerProfile: true
      }
    });

    if (!user || !user.isActive) {
      throw new AppError(401, "User session is no longer active.", "INVALID_SESSION");
    }

    const tokens = this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens
    };
  }

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        customerProfile: true,
        sellerProfile: true
      }
    });

    if (!user) {
      throw new AppError(404, "User profile not found.", "USER_NOT_FOUND");
    }

    return this.sanitizeUser(user);
  }
}

export const authService = new AuthService();
