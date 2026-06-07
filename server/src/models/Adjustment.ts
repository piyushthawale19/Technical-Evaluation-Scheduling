import { Schema, model, type InferSchemaType, Types } from "mongoose";

const adjustmentSchema = new Schema(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: "Session",
      required: true,
      index: true,
    },
    originalInvoiceId: {
      type: Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
      index: true,
    },
    reason: { type: String, required: true },
    amountDelta: { type: Number, required: true },
    createdByUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    effectiveAt: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true },
);

adjustmentSchema.index(
  { organizationId: 1, sessionId: 1, originalInvoiceId: 1 },
  { unique: true },
);

export type AdjustmentDocument = InferSchemaType<typeof adjustmentSchema> & {
  _id: Types.ObjectId;
};
export const AdjustmentModel = model("Adjustment", adjustmentSchema);
