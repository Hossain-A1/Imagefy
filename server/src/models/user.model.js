import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  creditbalance: {
    type: Number,
    default: 5,
  },
});



const userModel = model('User',userSchema)
export default userModel