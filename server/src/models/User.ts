import { Schema, model, type InferSchemaType, Types } from "mongoose";

const userSchema = new Schema(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    roles: [
      { type: String, enum: ["admin", "staff", "tutor"], required: true },
    ],
    isActive: { type: Boolean, default: true, required: true },
  },
  { timestamps: true },
);

userSchema.index({ organizationId: 1, email: 1 }, { unique: true });

export type UserDocument = InferSchemaType<typeof userSchema> & {
  _id: Types.ObjectId;
};
export const UserModel = model("User", userSchema);
