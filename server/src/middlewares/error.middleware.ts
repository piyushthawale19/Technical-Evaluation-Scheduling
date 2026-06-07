import type { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode = 500,
    public readonly code = "INTERNAL_ERROR",
  ) {
    super(message);
  }
}

export function notFoundHandler(request: Request, response: Response): void {
  response
    .status(404)
    .json({ message: `Route not found: ${request.method} ${request.path}` });
}

export function errorHandler(
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (error instanceof AppError) {
    response
      .status(error.statusCode)
      .json({ message: error.message, code: error.code });
    return;
  }

  response.status(500).json({ message: "Unexpected server error" });
}
