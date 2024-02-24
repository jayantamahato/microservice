import mongoose, { connect } from "mongoose";
const URL = "mongodb://127.0.0.1:27017/online_food";

export const dbConnection = async () => {
  try {
   await mongoose.connect(URL);
    console.log("DataBase connected Successfully");
  } catch (error) {
    console.log("connection Failed" + error);
  }
};

export default dbConnection;
