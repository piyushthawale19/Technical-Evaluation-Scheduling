import { AppError } from "../middlewares/error.middleware.js";
import {
  readIdempotencyKey,
  getIdempotentResponse,
  setIdempotentResponse,
} from "../utils/idempotency.js";
import { InvoiceRepository } from "../repositories/invoice.repository.js";
import { SessionRepository } from "../repositories/session.repository.js";
import { AuditService } from "./audit.service.js";
import { SessionModel } from "../models/Session.js";

function buildInvoiceNumber(sequence: number): string {
  return `INV-${String(1000 + sequence).padStart(4, "0")}`;
}

export class InvoiceService {
  constructor(
    private readonly invoiceRepository = new InvoiceRepository(),
    private readonly sessionRepository = new SessionRepository(),
    private readonly auditService = new AuditService(),
  ) {}

  async createInvoice(params: {
    organizationId: string;
    periodStart: string;
    periodEnd: string;
    sessionIds: string[];
    actorUserId: string;
    idempotencyKey?: string;
  }) {
    const cacheKey = readIdempotencyKey(
      params.organizationId,
      "POST /invoices",
      params.idempotencyKey,
    );
    const payloadHash = JSON.stringify(params.sessionIds);
    if (cacheKey) {
      const cached = getIdempotentResponse(cacheKey, payloadHash);
      if (cached) {
        return cached;
      }
    }

    const sessions = await SessionModel.find({
      _id: { $in: params.sessionIds },
      organizationId: params.organizationId,
    });
    if (sessions.length !== params.sessionIds.length) {
      throw new AppError(
        "One or more sessions were not found",
        404,
        "SESSIONS_NOT_FOUND",
      );
    }

    const sequence = await this.invoiceRepository.countDocuments({
      organizationId: params.organizationId,
    });
    const invoice = await this.invoiceRepository.create({
      organizationId: params.organizationId,
      invoiceNumber: buildInvoiceNumber(sequence + 1),
      periodStart: new Date(params.periodStart),
      periodEnd: new Date(params.periodEnd),
      status: "issued",
      lineItems: sessions.map((session) => ({
        sessionId: session._id,
        description: `${session.studentName} session`,
        amount: 50,
      })),
      totalAmount: sessions.length * 50,
      issuedAt: new Date(),
      paidAt: null,
    });

    await this.auditService.writeAudit({
      organizationId: params.organizationId,
      actorUserId: params.actorUserId,
      entityType: "Invoice",
      entityId: String(invoice._id),
      action: "invoice.created",
      after: invoice,
      metadata: { idempotencyKey: params.idempotencyKey ?? null },
    });

    const response = { invoice };
    if (cacheKey) {
      setIdempotentResponse(cacheKey, payloadHash, response);
    }

    return response;
  }

  listInvoices(organizationId: string) {
    return this.invoiceRepository.findMany({ organizationId });
  }
}
