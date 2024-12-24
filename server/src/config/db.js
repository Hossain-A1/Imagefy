import mongoose from "mongoose";

const connectDB = async (option = {}) => {
  try {
    await mongoose.connect(process.env.MONGO_URI, option);
    console.log("Connection to the db successfylly");

    mongoose.connection.on("Error", (err) => {
      console.log("Connection error", err);
    });
  } catch (error) {
    console.log(`Could not connect to db -->${error.toString()}`);
  }
};

export default connectDB;
