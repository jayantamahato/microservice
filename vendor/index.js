import express from "express";
import cors from "cors"
import { CONFIG } from "./config/config.js"
import { dbConnection } from "./utils/database.util.js";
import { router } from "./routes/vendor.route.js";
await dbConnection();
const app = express();
const PORT = CONFIG.PORT;
app.use(express.json());
app.use(cors());
app.use('/', router)


app.listen(PORT, () => {
  console.log("Vendor is running on :", PORT);
});
