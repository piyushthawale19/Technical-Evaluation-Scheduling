import { body } from "express-validator";

export const createAdjustmentValidator = [
  body("organizationId").isString().notEmpty(),
  body("sessionId").isString().notEmpty(),
  body("invoiceId").isString().notEmpty(),
  body("reason").isString().trim().isLength({ min: 3 }),
  body("amountDelta").isNumeric(),
];
