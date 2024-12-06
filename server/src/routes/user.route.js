import express from "express";
import { handleLogin, handleRegister, handleUserCredits } from "../controllers/user.controller.js";
import { isAuthorized } from "../middlewares/authorized.js";

const userRouter = express.Router();

userRouter.post("/register", handleRegister);
userRouter.post("/login", handleLogin);
userRouter.get("/credits", isAuthorized, handleUserCredits);

export default userRouter;
