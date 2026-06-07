import type { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        organizationId: string;
        roles: string[];
      };
    }
  }
}

export {};
