export type CreateInvoiceDto = {
  organizationId: string;
  periodStart: string;
  periodEnd: string;
  sessionIds: string[];
};
