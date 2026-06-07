import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function requireAuth(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authorization = request.header("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    response.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(authorization.slice(7), env.jwtAccessSecret) as {
      userId: string;
      organizationId: string;
      roles: string[];
    };
    request.user = decoded;
    next();
  } catch {
    response.status(401).json({ message: "Invalid token" });
  }
}

export function requireRole(...allowedRoles: string[]) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const roles = request.user?.roles ?? [];
    if (roles.some((role) => allowedRoles.includes(role))) {
      next();
      return;
    }

    response.status(403).json({ message: "Forbidden" });
  };
}
