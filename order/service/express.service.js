import express from "express";

import cors from "cors";
import { OrderRouter } from "../routes/order.js";
import RPC from "../helper/messageBroker.js";


export const startExpress = async(app) => {
  const rpc = new RPC();
  rpc.consumer()
  app.use(express.json());
  app.use(cors());
  app.use("/", OrderRouter);
};
