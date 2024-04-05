import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    sessionId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Session", sessionSchema);
export { model as Session };
