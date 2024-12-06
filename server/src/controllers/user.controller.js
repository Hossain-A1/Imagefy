import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";

import { errorResponse, successResponse } from "./response.controller.js";
import { creeateJwtToken } from "../helpers/createJwtToken.js";

const handleRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Please fill all fields",
      });
    }

    //exist email

    const existed = await userModel.findOne({ email });

    if (existed) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Email already used.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashPass,
    };

    const user = await userModel.create(userData);

    const token = creeateJwtToken(user._id);

    return successResponse(res, {
      statusCode: 201,
      message: "User was created successfully!",
      payload: { token, name: user.name },
    });
  } catch (error) {
    next(error);
  }
};

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Please fill all fields",
      });
    }

    //exist email

    const user = await userModel.findOne({ email });

    if (!user) {
      return errorResponse(res, {
        statusCode: 404,
        message: "With this email user not exist",
      });
    }

    const matchPass = bcrypt.compare(password, user.password);

    if (!matchPass) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Invalid credentials",
      });
    }

    const token = creeateJwtToken(user._id);

    return successResponse(res, {
      statusCode: 200,
      message: "User was login successfully!",
      payload: { token, name: user.name },
    });
  } catch (error) {
    next(error);
  }
};

const handleUserCredits = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await userModel.findById(id);

    if (!user) {
      return errorResponse(res, { statusCode: 404, message: "User not found" });
    }

    return successResponse(res, {
      statusCode: 200,
      message: "User credits was returned successfully!",
      payload: user.creditBalance,
    });
  } catch (error) {
    next(error);
  }
};
export { handleRegister, handleLogin, handleUserCredits };
