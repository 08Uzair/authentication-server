import express from "express";
import { signin, signup } from "../controller/auth.js";
export const authRouter = express.Router();
authRouter.post("/signIn", signin);
authRouter.post("/signUp", signup);
