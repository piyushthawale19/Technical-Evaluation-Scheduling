import { AppError } from "../middlewares/error.middleware.js";
import { SessionRepository } from "../repositories/session.repository.js";
import { AuditService } from "./audit.service.js";
import { AdjustmentService } from "./adjustment.service.js";
import { InvoiceRepository } from "../repositories/invoice.repository.js";
import {
  readIdempotencyKey,
  getIdempotentResponse,
  setIdempotentResponse,
} from "../utils/idempotency.js";

export class SessionService {
  constructor(
    private readonly sessionRepository = new SessionRepository(),
    private readonly invoiceRepository = new InvoiceRepository(),
    private readonly auditService = new AuditService(),
    private readonly adjustmentService = new AdjustmentService(),
  ) {}

  async createSession(params: {
    organizationId: string;
    studentName: string;
    tutorId: string;
    startTime: string;
    endTime: string;
    timezone: string;
    status: "scheduled" | "completed" | "billed" | "unbilled";
    recurrenceRuleId?: string;
    actorUserId: string;
    idempotencyKey?: string;
  }) {
    const cacheKey = readIdempotencyKey(
      params.organizationId,
      "POST /sessions",
      params.idempotencyKey,
    );
    const payloadHash = JSON.stringify([
      params.studentName,
      params.tutorId,
      params.startTime,
      params.endTime,
      params.status,
    ]);
    if (cacheKey) {
      const cached = getIdempotentResponse(cacheKey, payloadHash);
      if (cached) {
        return cached;
      }
    }

    const startTime = new Date(params.startTime);
    const endTime = new Date(params.endTime);
    const conflict = await this.sessionRepository.findTutorConflict(
      params.organizationId,
      params.tutorId,
      startTime,
      endTime,
    );
    if (conflict) {
      throw new AppError(
        "Tutor is already booked for that time range",
        409,
        "TUTOR_DOUBLE_BOOKED",
      );
    }

    const session = await this.sessionRepository.create({
      organizationId: params.organizationId,
      studentName: params.studentName,
      tutorId: params.tutorId,
      startTime,
      endTime,
      timezone: params.timezone,
      status: params.status,
      recurrenceRuleId: params.recurrenceRuleId ?? null,
      billedInvoiceId: null,
      lastModifiedAt: new Date(),
    });

    await this.auditService.writeAudit({
      organizationId: params.organizationId,
      actorUserId: params.actorUserId,
      entityType: "Session",
      entityId: String(session._id),
      action: "session.created",
      after: session,
      metadata: { idempotencyKey: params.idempotencyKey ?? null },
    });

    const response = { session };
    if (cacheKey) {
      setIdempotentResponse(cacheKey, payloadHash, response);
    }

    return response;
  }

  async updateSession(params: {
    sessionId: string;
    organizationId: string;
    actorUserId: string;
    startTime?: string;
    endTime?: string;
    timezone?: string;
    status?: "scheduled" | "completed" | "billed" | "unbilled";
    idempotencyKey?: string;
  }) {
    const session = await this.sessionRepository.findById(params.sessionId);
    if (!session) {
      throw new AppError("Session not found", 404, "SESSION_NOT_FOUND");
    }

    if (String(session.organizationId) !== params.organizationId) {
      throw new AppError(
        "Cross-tenant session update rejected",
        403,
        "TENANT_VIOLATION",
      );
    }

    if (session.status === "completed") {
      throw new AppError(
        "Completed sessions cannot be edited",
        409,
        "SESSION_LOCKED",
      );
    }

    const nextStartTime = params.startTime
      ? new Date(params.startTime)
      : new Date(session.startTime as Date);
    const nextEndTime = params.endTime
      ? new Date(params.endTime)
      : new Date(session.endTime as Date);

    const conflict = await this.sessionRepository.findTutorConflict(
      params.organizationId,
      String(session.tutorId),
      nextStartTime,
      nextEndTime,
    );
    if (conflict && String(conflict._id) !== params.sessionId) {
      throw new AppError(
        "Tutor is already booked for that time range",
        409,
        "TUTOR_DOUBLE_BOOKED",
      );
    }

    const billed =
      session.status === "billed" || Boolean(session.billedInvoiceId);
    if (billed && (params.startTime || params.endTime)) {
      const invoiceId = session.billedInvoiceId
        ? String(session.billedInvoiceId)
        : "";
      if (!invoiceId) {
        throw new AppError(
          "Billed session is missing an invoice reference",
          409,
          "INVOICE_REFERENCE_MISSING",
        );
      }
      const invoice = await this.invoiceRepository.findById(invoiceId);
      if (!invoice) {
        throw new AppError(
          "Original invoice not found",
          404,
          "INVOICE_NOT_FOUND",
        );
      }

      await this.adjustmentService.createAdjustment({
        organizationId: params.organizationId,
        sessionId: params.sessionId,
        invoiceId,
        reason: "Rescheduled billed session",
        amountDelta: -50,
        actorUserId: params.actorUserId,
        idempotencyKey: params.idempotencyKey,
      });
    }

    const updatedSession = await this.sessionRepository.updateById(
      params.sessionId,
      {
        startTime: nextStartTime,
        endTime: nextEndTime,
        timezone: params.timezone ?? session.timezone,
        status: params.status ?? session.status,
        lastModifiedAt: new Date(),
      },
    );

    await this.auditService.writeAudit({
      organizationId: params.organizationId,
      actorUserId: params.actorUserId,
      entityType: "Session",
      entityId: params.sessionId,
      action: "session.updated",
      before: session,
      after: updatedSession,
    });

    return { session: updatedSession };
  }

  listSessions(organizationId: string) {
    return this.sessionRepository.findMany({ organizationId });
  }
}
