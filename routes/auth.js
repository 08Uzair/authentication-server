import express from "express";
import { signin, signup,getAuthor } from "../controller/auth.js";
export const authRouter = express.Router();
authRouter.get("/", getAuthor);
authRouter.post("/signIn", signin);
authRouter.post("/signUp", signup);
