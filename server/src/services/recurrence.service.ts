import { addDays, toUtcDate } from "../utils/time.js";
import { SessionRepository } from "../repositories/session.repository.js";
import { AuditService } from "./audit.service.js";

type CreateWeeklyRecurrenceParams = {
  organizationId: string;
  tutorId: string;
  studentName: string;
  startDate: string;
  endDate: string;
  startTimeIso: string;
  endTimeIso: string;
  timezone: string;
  actorUserId: string;
};

export class RecurrenceService {
  constructor(
    private readonly sessionRepository = new SessionRepository(),
    private readonly auditService = new AuditService(),
  ) {}

  async createWeeklyRecurrence(params: CreateWeeklyRecurrenceParams) {
    const sessions = [] as unknown[];
    const recurrenceStart = toUtcDate(params.startDate);
    const recurrenceEnd = toUtcDate(params.endDate);
    let cursor = recurrenceStart;

    while (cursor <= recurrenceEnd) {
      const startTime = new Date(
        `${cursor.toISOString().slice(0, 10)}T${params.startTimeIso}`,
      );
      const endTime = new Date(
        `${cursor.toISOString().slice(0, 10)}T${params.endTimeIso}`,
      );
      const createdSession = await this.sessionRepository.create({
        organizationId: params.organizationId,
        tutorId: params.tutorId,
        studentName: params.studentName,
        startTime,
        endTime,
        timezone: params.timezone,
        status: "scheduled",
        recurrenceRuleId: null,
        billedInvoiceId: null,
        lastModifiedAt: new Date(),
      });
      sessions.push(createdSession);
      cursor = addDays(cursor, 7);
    }

    await this.auditService.writeAudit({
      organizationId: params.organizationId,
      actorUserId: params.actorUserId,
      entityType: "Session",
      entityId: params.tutorId,
      action: "recurrence.created",
      after: { sessionsCreated: sessions.length },
    });

    return { sessions };
  }
}
