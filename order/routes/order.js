import express from "express";
import Order from "../controller/orderController.js";

const router = express.Router();
const order = new Order(); 

//for all authenticated users
router.get("/:id",order.getOrderDetails);
router.get("/:id",order.getOrderByCustomerId);

// customer authentication
router.post("/createOrder",order.createOrder);
//admin authorization
router.get("/orders",order.getAll);

//vendor and admin authorization

router.post("/paymentStatus",order.paymentStatus);
router.post("/orderStatus",order.orderStatus);
router.get("/:id",order.getOrdersOfVendor);

export {router as OrderRouter};