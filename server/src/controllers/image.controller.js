import userModel from "../models/user.model.js";
import axios from "axios";
import { errorResponse, successResponse } from "./response.controller.js";
import FormData from "form-data";

export const handleGenerateImage = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { prompt } = req.body;

    const user = await userModel.findById(id);

    if (!user || !prompt) {
      return errorResponse(res, { statusCode: 404, message: "missing details" });
    }

    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return errorResponse(res, {
        statusCode: 400,
        message: "No credits Balance",
      });
    }

    const formData = new FormData();

    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: { "x-api-key": process.env.CLIPDROP_API },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "Image was generated successfully!",
      payload: { resultImage },
    });
  } catch (error) {
    next(error);
  }
};
