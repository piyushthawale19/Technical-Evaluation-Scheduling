import { body, param } from "express-validator";

export const createSessionValidator = [
  body("organizationId").isString().notEmpty(),
  body("studentName").isString().trim().isLength({ min: 2 }),
  body("tutorId").isString().notEmpty(),
  body("startTime").isISO8601(),
  body("endTime").isISO8601(),
  body("timezone").isString().trim().notEmpty(),
  body("status").isIn(["scheduled", "completed", "billed", "unbilled"]),
];

export const updateSessionValidator = [
  param("id").isString().notEmpty(),
  body("startTime").optional().isISO8601(),
  body("endTime").optional().isISO8601(),
  body("timezone").optional().isString().notEmpty(),
  body("status")
    .optional()
    .isIn(["scheduled", "completed", "billed", "unbilled"]),
];
