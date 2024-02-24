import express from "express";
// import{ dbConnection,startExpress} from "./service/index.js";
import dbConnection from "./service/DbService.js";
import {startExpress} from "./service/expressService.js"

const app = express();
const PORT = 3000;
await dbConnection();
await startExpress(app);
app.listen(PORT, () => {
  console.log("app is running on port :", PORT);
});
