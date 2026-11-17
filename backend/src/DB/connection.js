
import mongoose from "mongoose";
import ApiError from "../utils/apiError.js";

const DB_Connection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
    );

    console.log("DB_Connection Successfully");
  } catch (err) {
    new ApiError("Faild to connect",500)
  }
};

export default DB_Connection;
