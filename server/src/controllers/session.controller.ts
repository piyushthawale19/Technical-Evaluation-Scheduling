import type { Request, Response } from "express";
import { SessionService } from "../services/session.service.js";

export class SessionController {
  constructor(private readonly sessionService = new SessionService()) {}

  create = async (request: Request, response: Response): Promise<void> => {
    const result = await this.sessionService.createSession({
      ...request.body,
      actorUserId: request.user?.userId ?? "",
      organizationId:
        request.user?.organizationId ?? request.body.organizationId,
      idempotencyKey: request.header("idempotency-key") ?? undefined,
    });
    response.status(201).json(result);
  };

  update = async (request: Request, response: Response): Promise<void> => {
    const result = await this.sessionService.updateSession({
      ...request.body,
      sessionId: request.params.id,
      actorUserId: request.user?.userId ?? "",
      organizationId:
        request.user?.organizationId ?? request.body.organizationId,
      idempotencyKey: request.header("idempotency-key") ?? undefined,
    });
    response.status(200).json(result);
  };

  list = async (request: Request, response: Response): Promise<void> => {
    const sessions = await this.sessionService.listSessions(
      request.user?.organizationId ?? "",
    );
    response.json({ sessions });
  };
}
