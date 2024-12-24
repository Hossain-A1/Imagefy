import express from "express";
import hpp from "hpp";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { errorResponse } from "./controllers/response.controller.js";
import userRouter from "./routes/user.route.js";
import imageRouter from "./routes/image.route.js";

const app = express();

//middleware
app.use(express.json());
app.use(cors({ Credential: true }));
app.use(hpp());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.json("test working");
});

//bypass all routes
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

//client error
app.use((req, res, next) => {
  next(errorResponse(res, { statusCode: 404, message: "Route not found" }));
});
//server errors
app.use((err, req, res, next) => {
  return errorResponse(res, { statusCode: err.status, message: err.message });
});

export default app;
