import mongoose from "mongoose";
import  dotenv  from "dotenv";

dotenv.config();

export const dbConnection = async () => {
  const URL = process.env.DB_URL
  try {
   await mongoose.connect(URL);
   console.clear()
    console.log("Customer connected");
  } catch (error) {
    console.log("connection Failed" + error);
  }
};

export default dbConnection;
