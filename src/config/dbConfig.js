import mongoose from "mongoose";
import DB_URL from "./serverConfig.js";

async function connectDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log("something went wrong while creating mongoDb");
    console.log(error);
  }
}

export default connectDB;
