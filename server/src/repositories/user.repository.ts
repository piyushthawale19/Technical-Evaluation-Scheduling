import { UserModel } from "../models/User.js";
import { BaseRepository } from "./base.repository.js";

export class UserRepository extends BaseRepository<typeof UserModel> {
  constructor() {
    super(UserModel);
  }

  findByEmailAndOrganization(email: string, organizationId: string) {
    return UserModel.findOne({ email, organizationId });
  }
}
