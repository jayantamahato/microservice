import { CONFIG } from "../config/config.js";
import  mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(CONFIG.DB_URL);
    console.log("DataBase connected Successfully");
  } catch (error) {
    console.log("connection Failed" + error);
  }
};