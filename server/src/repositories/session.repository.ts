import { SessionModel } from "../models/Session.js";
import { BaseRepository } from "./base.repository.js";

export class SessionRepository extends BaseRepository<typeof SessionModel> {
  constructor() {
    super(SessionModel);
  }

  findTutorConflict(
    organizationId: string,
    tutorId: string,
    startTime: Date,
    endTime: Date,
  ) {
    return SessionModel.findOne({
      organizationId,
      tutorId,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    });
  }
}
