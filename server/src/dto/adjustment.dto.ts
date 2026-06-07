export type CreateAdjustmentDto = {
  organizationId: string;
  sessionId: string;
  invoiceId: string;
  reason: string;
  amountDelta: number;
};
