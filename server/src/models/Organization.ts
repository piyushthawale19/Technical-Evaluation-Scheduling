import { Schema, model, type InferSchemaType } from "mongoose";

const organizationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    timezone: { type: String, required: true, default: "UTC" },
    slug: { type: String, required: true, unique: true, index: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
);

export type OrganizationDocument = InferSchemaType<typeof organizationSchema>;
export const OrganizationModel = model("Organization", organizationSchema);
