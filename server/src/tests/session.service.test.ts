import { SessionService } from '../services/session.service.js';

describe('SessionService business rules', () => {
  it('rejects double booking for the same tutor', async () => {
    const sessionRepository = {
      findTutorConflict: jest.fn().mockResolvedValue({ _id: 'conflict-session' }),
      create: jest.fn(),
      findById: jest.fn(),
      updateById: jest.fn(),
      findMany: jest.fn()
    };

    const service = new SessionService(sessionRepository as never, {} as never, { writeAudit: jest.fn() } as never, { createAdjustment: jest.fn() } as never);

    await expect(
      service.createSession({
        organizationId: 'org_1',
        studentName: 'John Carter',
        tutorId: 'tutor_1',
        startTime: '2026-06-10T14:00:00.000Z',
        endTime: '2026-06-10T15:00:00.000Z',
        timezone: 'UTC',
        status: 'scheduled',
        actorUserId: 'user_1'
      })
    ).rejects.toThrow('Tutor is already booked for that time range');
  });

  it('blocks edits to completed sessions', async () => {
    const sessionRepository = {
      findTutorConflict: jest.fn(),
      create: jest.fn(),
      findById: jest.fn().mockResolvedValue({
        _id: 'session_1',
        organizationId: 'org_1',
        tutorId: 'tutor_1',
        startTime: new Date('2026-06-10T14:00:00.000Z'),
        endTime: new Date('2026-06-10T15:00:00.000Z'),
        timezone: 'UTC',
        status: 'completed',
        billedInvoiceId: null
      }),
      updateById: jest.fn(),
      findMany: jest.fn()
    };

    const service = new SessionService(sessionRepository as never, { findById: jest.fn() } as never, { writeAudit: jest.fn() } as never, { createAdjustment: jest.fn() } as never);

    await expect(
      service.updateSession({
        sessionId: 'session_1',
        organizationId: 'org_1',
        actorUserId: 'user_1',
        startTime: '2026-06-10T16:00:00.000Z'
      })
    ).rejects.toThrow('Completed sessions cannot be edited');
  });
});