import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: { 
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const auth = mongoose.model("auth", authSchema);