import express from "express";
import { signin, signup,getAuthor, getAuthorById } from "../controller/auth.js";
export const authRouter = express.Router();
authRouter.get("/", getAuthor);
authRouter.get("/:id", getAuthorById);
authRouter.post("/signIn", signin);
authRouter.post("/signUp", signup);
