import type { Request, Response } from "express";
import { AuditRepository } from "../repositories/audit.repository.js";

export class AuditController {
  constructor(private readonly auditRepository = new AuditRepository()) {}

  list = async (request: Request, response: Response): Promise<void> => {
    const logs = await this.auditRepository.findMany({
      organizationId: request.user?.organizationId ?? "",
    });
    response.json({ logs });
  };
}
