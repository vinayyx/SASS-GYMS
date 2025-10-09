import express from "express";
import { payment } from "../../Controller/PaymentController/razorpayController.js";

const router = express.Router();

router.post("/payment/order", payment);

export default router;
