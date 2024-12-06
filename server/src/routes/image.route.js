import express from "express";
import { isAuthorized } from "../middlewares/authorized.js";
import { handleGenerateImage } from "../controllers/image.controller.js";

const imageRouter = express.Router();

imageRouter.post("/generate-image", isAuthorized,handleGenerateImage);

export default imageRouter;
