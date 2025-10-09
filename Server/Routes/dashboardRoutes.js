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

const router = express.Router();


router.get("/all-members", getAllMembers);
router.get("/total-sales", getTotalSales);
router.get("/getTotalExpiringPlans", getExpiringPlans);
router.get("/getTotalExpense", getTotalExpense);
router.get("/on-board-onlast-seven-days", onboardAtLast7Days);
router.get("/sales-graph", salesGraph);
router.get("/total-sales-with-discription", totalSalesWithInformation);







export default router;
