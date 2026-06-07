import { Router } from "express";
import { AuditController } from "../controllers/audit.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();
const controller = new AuditController();

router.get("/", requireAuth, controller.list);

export { router as auditRoutes };
