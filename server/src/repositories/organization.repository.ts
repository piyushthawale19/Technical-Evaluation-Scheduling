import { OrganizationModel } from "../models/Organization.js";
import { BaseRepository } from "./base.repository.js";

export class OrganizationRepository extends BaseRepository<
  typeof OrganizationModel
> {
  constructor() {
    super(OrganizationModel);
  }
}
