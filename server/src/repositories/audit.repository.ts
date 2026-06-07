import { AuditLogModel } from "../models/AuditLog.js";
import { BaseRepository } from "./base.repository.js";

export class AuditRepository extends BaseRepository<typeof AuditLogModel> {
  constructor() {
    super(AuditLogModel);
  }
}
