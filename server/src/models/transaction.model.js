import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Number,
    required: true,
  },
});

const transactionModel = model("transaction", transactionSchema);
export default transactionModel;
