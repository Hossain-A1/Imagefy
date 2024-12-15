import bcrypt from "bcrypt";
import Stripe from "stripe";
import userModel from "../models/user.model.js";
import { errorResponse, successResponse } from "./response.controller.js";
import { creeateJwtToken } from "../helpers/createJwtToken.js";
import transactionModel from "../models/transaction.model.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

const paymentStripe = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { planId } = req.body;
    const { origin } = req.headers;

    const userData = await userModel.findById(id );

    if (!userData || !id) {
      throw new Error("Invalid credentials");
    }

    let credits, plan, amount, date;

    // Determine plan details based on planId
    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 30;
        break;
      case "Business":
        plan = "Business";
        credits = 500;
        amount = 150;
        break;
      default:
        throw new Error("Invalid planId provided");
    }

    date = Date.now();

    // Creating transaction data
    const transactionData = {
      id,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await transactionModel.create(transactionData);

    const updatedCreditBalance =
      (userData.creditBalance || 0) + newTransaction.credits;

    await userModel.findByIdAndUpdate(userData._id, {
      creditBalance: updatedCreditBalance,
    });

    // Set up line item details for Stripe
    const line_items = [
      {
        price_data: {
          currency: "USD",
          product_data: {
            name: planId,
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ];

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}`,
      cancel_url: `${origin}/buy`,
    });

    res.json({ success: true, session_url: session.url });
    return;
  } catch (error) {
    return next(error);
  }
};

export { handleRegister, handleLogin, handleUserCredits, paymentStripe };
