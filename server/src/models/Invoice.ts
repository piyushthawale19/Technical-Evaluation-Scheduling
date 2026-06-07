import { Schema, model, type InferSchemaType, Types } from "mongoose";

const invoiceLineItemSchema = new Schema(
  {
    sessionId: { type: Schema.Types.ObjectId, ref: "Session", required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { _id: false },
);

const invoiceSchema = new Schema(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },
    invoiceNumber: { type: String, required: true, unique: true, index: true },
    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      enum: ["draft", "issued", "paid", "overdue"],
      default: "draft",
    },
    lineItems: { type: [invoiceLineItemSchema], default: [] },
    totalAmount: { type: Number, required: true, default: 0 },
    issuedAt: { type: Date, default: null },
    paidAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export type InvoiceDocument = InferSchemaType<typeof invoiceSchema> & {
  _id: Types.ObjectId;
};
export const InvoiceModel = model("Invoice", invoiceSchema);
