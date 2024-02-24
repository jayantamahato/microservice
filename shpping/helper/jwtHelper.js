import Jwt from "jsonwebtoken";
import { APP_KEY } from "../config/appConfig.js";

//get signature

export const getSignature = async (payload) => {
  return Jwt.sign(payload, APP_KEY, { expiresIn: "1d" });
};

//validate

export const validateSignature = async (req) => {
  let signature = req.get("Authorization");

  try {
    if (signature) {
      let payload = Jwt.verify(signature.split(" ")[1], APP_KEY);
      req.user = payload;
      return true;
    } else {

      return false;
    }
  } catch (error) {
    return false;
  }
};
