import express from "express";
import { handleRegister } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", handleRegister);

export default userRouter;
