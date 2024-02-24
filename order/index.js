import express from "express";
import  dotenv  from "dotenv";
import { startExpress } from "./service/express.service.js";
import dbConnection from "./service/db.service.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT ||4005;
await dbConnection();
await startExpress(app);
app.listen(PORT, () => {
  console.log("Order service is running on port :", PORT);
});
