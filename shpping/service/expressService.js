import express from "express";
import {
  adminRouer,
  vendorRouer,
  ShoppingRouter,
  customerRouter,
} from "../routes/index.js";
import cors from "cors";
import { CartRouter } from "../routes/cart.route.js";

export const startExpress = async (app) => {
  app.use(express.json());
  app.use(
    cors({
      origin: "*.localhost.com",
    })
  );
  app.use("/vendor", vendorRouer);
  app.use("/admin", adminRouer);
  app.use("/shopping", ShoppingRouter);
  app.use("/customer", customerRouter);
  app.use("/cart", CartRouter);
};
