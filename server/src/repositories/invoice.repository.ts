import { InvoiceModel } from "../models/Invoice.js";
import { BaseRepository } from "./base.repository.js";

export class InvoiceRepository extends BaseRepository<typeof InvoiceModel> {
  constructor() {
    super(InvoiceModel);
  }
}
