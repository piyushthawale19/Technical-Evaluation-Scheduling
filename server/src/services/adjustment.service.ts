import { AppError } from "../middlewares/error.middleware.js";
import { AdjustmentRepository } from "../repositories/adjustment.repository.js";
import { InvoiceRepository } from "../repositories/invoice.repository.js";
import { SessionRepository } from "../repositories/session.repository.js";
import {
  readIdempotencyKey,
  getIdempotentResponse,
  setIdempotentResponse,
} from "../utils/idempotency.js";
import { AuditService } from "./audit.service.js";

export class AdjustmentService {
  constructor(
    private readonly adjustmentRepository = new AdjustmentRepository(),
    private readonly invoiceRepository = new InvoiceRepository(),
    private readonly sessionRepository = new SessionRepository(),
    private readonly auditService = new AuditService(),
  ) {}

  async createAdjustment(params: {
    organizationId: string;
    sessionId: string;
    invoiceId: string;
    reason: string;
    amountDelta: number;
    actorUserId: string;
    idempotencyKey?: string;
  }) {
    const cacheKey = readIdempotencyKey(
      params.organizationId,
      "POST /adjustments",
      params.idempotencyKey,
    );
    const payloadHash = JSON.stringify([
      params.sessionId,
      params.invoiceId,
      params.reason,
      params.amountDelta,
    ]);
    if (cacheKey) {
      const cached = getIdempotentResponse(cacheKey, payloadHash);
      if (cached) {
        return cached;
      }
    }

    const [session, invoice] = await Promise.all([
      this.sessionRepository.findById(params.sessionId),
      this.invoiceRepository.findById(params.invoiceId),
    ]);

    if (!session || !invoice) {
      throw new AppError(
        "Session or invoice not found",
        404,
        "REFERENCED_RECORD_NOT_FOUND",
      );
    }

    if (
      String(session.organizationId) !== params.organizationId ||
      String(invoice.organizationId) !== params.organizationId
    ) {
      throw new AppError(
        "Cross-tenant adjustment rejected",
        403,
        "TENANT_VIOLATION",
      );
    }

    const existing = await this.adjustmentRepository.findOne({
      organizationId: params.organizationId,
      sessionId: params.sessionId,
      originalInvoiceId: params.invoiceId,
    });

    if (existing) {
      throw new AppError(
        "Adjustment already exists",
        409,
        "ADJUSTMENT_ALREADY_EXISTS",
      );
    }

    const adjustment = await this.adjustmentRepository.create({
      organizationId: params.organizationId,
      sessionId: params.sessionId,
      originalInvoiceId: params.invoiceId,
      reason: params.reason,
      amountDelta: params.amountDelta,
      createdByUserId: params.actorUserId,
      effectiveAt: new Date(),
    });

    await this.auditService.writeAudit({
      organizationId: params.organizationId,
      actorUserId: params.actorUserId,
      entityType: "Adjustment",
      entityId: String(adjustment._id),
      action: "adjustment.created",
      after: adjustment,
      metadata: { idempotencyKey: params.idempotencyKey ?? null },
    });

    const response = { adjustment };
    if (cacheKey) {
      setIdempotentResponse(cacheKey, payloadHash, response);
    }

    return response;
  }

  listAdjustments(organizationId: string) {
    return this.adjustmentRepository.findMany({ organizationId });
  }
}
