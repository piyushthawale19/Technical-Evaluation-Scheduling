import { Router } from "express";
import { SessionController } from "../controllers/session.controller.js";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import {
  createSessionValidator,
  updateSessionValidator,
} from "../validators/session.validator.js";

const router = Router();
const controller = new SessionController();

router.get("/", requireAuth, controller.list);
router.post(
  "/",
  requireAuth,
  requireRole("admin", "staff"),
  createSessionValidator,
  validateRequest,
  controller.create,
);
router.put(
  "/:id",
  requireAuth,
  requireRole("admin", "staff"),
  updateSessionValidator,
  validateRequest,
  controller.update,
);

export { router as sessionRoutes };
