import { Router } from "express";
import { AdjustmentController } from "../controllers/adjustment.controller.js";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";
import { createAdjustmentValidator } from "../validators/adjustment.validator.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

const router = Router();
const controller = new AdjustmentController();

router.get("/", requireAuth, controller.list);
router.post(
  "/",
  requireAuth,
  requireRole("admin", "staff"),
  createAdjustmentValidator,
  validateRequest,
  controller.create,
);

export { router as adjustmentRoutes };
