import express from "express";
import {
    getAllMembers,
  getTotalSales,
  getExpiringPlans,
  getTotalExpense,
  onboardAtLast7Days,
  salesGraph,
  totalSalesWithInformation,
} from "../Controller/dashboardController.js";
import { protect } from "../middlewares/authMiddleware.js";


const router = express.Router();


router.get("/all-members", protect, getAllMembers);
router.get("/total-sales", protect, getTotalSales);
router.get("/getTotalExpiringPlans", protect,  getExpiringPlans);
router.get("/getTotalExpense", protect,  getTotalExpense);
router.get("/on-board-onlast-seven-days", protect, onboardAtLast7Days);
router.get("/sales-graph", protect,  salesGraph);
router.get("/total-sales-with-discription", protect,  totalSalesWithInformation);







export default router;
