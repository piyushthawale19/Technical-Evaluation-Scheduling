import { Router } from "express";
import { authRoutes } from "./auth.routes.js";
import { sessionRoutes } from "./session.routes.js";
import { invoiceRoutes } from "./invoice.routes.js";
import { adjustmentRoutes } from "./adjustment.routes.js";
import { auditRoutes } from "./audit.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/sessions", sessionRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/adjustments", adjustmentRoutes);
router.use("/audit", auditRoutes);

export { router as apiRoutes };
