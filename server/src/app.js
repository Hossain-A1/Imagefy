import express from "express";
import hpp from "hpp";
import cors from "cors";
import helmet from "helmet";
import { errorResponse } from "./controllers/response.controller.js";
import userRouter from "./routes/user.route.js";

const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(hpp());
app.use(helmet());

app.get("/", (req, res) => {
  return res.json("test working");
});

//bypass all routes
app.use('/api/user',userRouter)

//client error
app.use((req, res, next) => {
  next(errorResponse(res, { statusCode: 404, message: "Route not found" }));
});
//server errors
app.use((err, req, res, next) => {
  return errorResponse(res, { statusCode: err.status, message: err.message });
});

export default app;
