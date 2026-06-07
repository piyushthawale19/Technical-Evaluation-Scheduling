import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export function validateRequest(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const result = validationResult(request);
  if (result.isEmpty()) {
    next();
    return;
  }

  response
    .status(422)
    .json({ message: "Validation failed", errors: result.array() });
}
