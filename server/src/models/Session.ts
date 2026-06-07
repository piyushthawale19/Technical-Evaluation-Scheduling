import { Schema, model, type InferSchemaType, Types } from "mongoose";

const sessionSchema = new Schema(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },
    tutorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    studentName: { type: String, required: true, trim: true },
    startTime: { type: Date, required: true, index: true },
    endTime: { type: Date, required: true },
    timezone: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["scheduled", "completed", "billed", "unbilled"],
      default: "scheduled",
    },
    billedInvoiceId: {
      type: Schema.Types.ObjectId,
      ref: "Invoice",
      default: null,
    },
    recurrenceRuleId: {
      type: Schema.Types.ObjectId,
      ref: "RecurringRule",
      default: null,
    },
    lastModifiedAt: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true },
);

sessionSchema.index(
  { organizationId: 1, tutorId: 1, startTime: 1, endTime: 1 },
  { unique: true },
);

export type SessionDocument = InferSchemaType<typeof sessionSchema> & {
  _id: Types.ObjectId;
};
export const SessionModel = model("Session", sessionSchema);
