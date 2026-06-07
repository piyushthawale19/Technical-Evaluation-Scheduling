import type { Request, Response } from "express";
import { AdjustmentService } from "../services/adjustment.service.js";

export class AdjustmentController {
  constructor(private readonly adjustmentService = new AdjustmentService()) {}

  create = async (request: Request, response: Response): Promise<void> => {
    const result = await this.adjustmentService.createAdjustment({
      ...request.body,
      actorUserId: request.user?.userId ?? "",
      organizationId:
        request.user?.organizationId ?? request.body.organizationId,
      idempotencyKey: request.header("idempotency-key") ?? undefined,
    });
    response.status(201).json(result);
  };

  list = async (request: Request, response: Response): Promise<void> => {
    const adjustments = await this.adjustmentService.listAdjustments(
      request.user?.organizationId ?? "",
    );
    response.json({ adjustments });
  };
}
