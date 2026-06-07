import { AuditRepository } from "../repositories/audit.repository.js";

type WriteAuditParams = {
  organizationId: string;
  actorUserId: string;
  entityType: string;
  entityId: string;
  action: string;
  before?: unknown;
  after?: unknown;
  metadata?: Record<string, unknown>;
};

export class AuditService {
  constructor(private readonly auditRepository = new AuditRepository()) {}

  writeAudit(entry: WriteAuditParams) {
    return this.auditRepository.create({
      organizationId: entry.organizationId,
      actorUserId: entry.actorUserId,
      entityType: entry.entityType,
      entityId: entry.entityId,
      action: entry.action,
      before: entry.before ?? null,
      after: entry.after ?? null,
      metadata: entry.metadata ?? {},
      occurredAt: new Date(),
    });
  }
}
