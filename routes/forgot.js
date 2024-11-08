import express from "express";
import { getOtp, resetPassword, verifyOtp } from "../controller/forgot.js";

export const forgotRouter = express.Router();
forgotRouter.post("/sendMail", getOtp);
forgotRouter.post("/verify-otp", verifyOtp);
forgotRouter.post("/reset-password", resetPassword);
