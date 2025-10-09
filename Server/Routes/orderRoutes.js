import express from "express";
import {
  createOrder,
  getAllOrders,
  updateStatus,
  getAllCompletedOrder,
  getAllCancelledApi,
  getTotalorder,
} from "../Controller/orderController.js";

const router = express.Router();

// Create a new order
router.post("/create", createOrder);

// Get all orders
router.get("/all", getAllOrders);
router.get("/completed", getAllCompletedOrder);
router.get("/cancelled", getAllCancelledApi);
router.get("/total", getTotalorder);



router.put("/updatastatus/:id", updateStatus);

export default router;
