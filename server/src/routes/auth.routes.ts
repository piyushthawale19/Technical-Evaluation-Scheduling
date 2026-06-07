import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();
const controller = new AuthController();

router.post(
  "/register",
  registerValidator,
  validateRequest,
  controller.register,
);
router.post("/login", loginValidator, validateRequest, controller.login);
router.post("/refresh", requireAuth, controller.refresh);

export { router as authRoutes };
