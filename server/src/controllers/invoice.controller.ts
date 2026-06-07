import type { Request, Response } from "express";
import { InvoiceService } from "../services/invoice.service.js";

export class InvoiceController {
  constructor(private readonly invoiceService = new InvoiceService()) {}

  create = async (request: Request, response: Response): Promise<void> => {
    const result = await this.invoiceService.createInvoice({
      ...request.body,
      actorUserId: request.user?.userId ?? "",
      organizationId:
        request.user?.organizationId ?? request.body.organizationId,
      idempotencyKey: request.header("idempotency-key") ?? undefined,
    });
    response.status(201).json(result);
  };

  list = async (request: Request, response: Response): Promise<void> => {
    const invoices = await this.invoiceService.listInvoices(
      request.user?.organizationId ?? "",
    );
    response.json({ invoices });
  };
}
