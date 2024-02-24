import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";
import dotenv from "dotenv";
const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 3000;
// const PORT = 3000
console.log(PORT);
app.get("/", (req, res) => {
  return res.status(200).json({ message: "hello from OFS Root" });
});

app.use("/admin", proxy(process.env.ADMIN_URL));
app.use("/cart", proxy(process.env.CART_URL));
app.use("/customer", proxy(process.env.CUSTOMER_URL));
app.use("/order", proxy(process.env.ORDER_URL));
app.use("/product", proxy(process.env.PRODUCT_URL));
app.use("/shopping", proxy(process.env.SHOPPING_URL));
app.use("/vendor", proxy(process.env.VENDOR_URL));
try {
  app.listen(PORT, () => {
    console.clear();
    console.log("Server is running on port ", PORT);
  });
} catch (error) {
  console.log(error);
}
