import { body } from "express-validator";

export const createInvoiceValidator = [
  body("organizationId").isString().notEmpty(),
  body("periodStart").isISO8601(),
  body("periodEnd").isISO8601(),
  body("sessionIds").isArray({ min: 1 }),
];
