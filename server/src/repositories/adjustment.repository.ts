import { AdjustmentModel } from "../models/Adjustment.js";
import { BaseRepository } from "./base.repository.js";

export class AdjustmentRepository extends BaseRepository<
  typeof AdjustmentModel
> {
  constructor() {
    super(AdjustmentModel);
  }
}
