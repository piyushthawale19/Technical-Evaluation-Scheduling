import { Router } from "express";
import { InvoiceController } from "../controllers/invoice.controller.js";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";
import { createInvoiceValidator } from "../validators/invoice.validator.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

const router = Router();
const controller = new InvoiceController();

router.get("/", requireAuth, controller.list);
router.post(
  "/",
  requireAuth,
  requireRole("admin", "staff"),
  createInvoiceValidator,
  validateRequest,
  controller.create,
);

export { router as invoiceRoutes };
