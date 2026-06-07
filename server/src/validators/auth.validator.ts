import { body } from "express-validator";

export const registerValidator = [
  body("organizationName").isString().trim().isLength({ min: 2 }),
  body("fullName").isString().trim().isLength({ min: 2 }),
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 8 }),
];

export const loginValidator = [
  body("email").isEmail().normalizeEmail(),
  body("password").isString().isLength({ min: 1 }),
];
