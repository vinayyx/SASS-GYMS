import express from "express";
import {
  createExpense ,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenses,
  getMonthlyExpense
} from "../Controller/expenseController.js";
import { protect } from "../middlewares/authMiddleware.js";



const router = express.Router();

// Create a new expense
router.post("/createExpense", protect,  createExpense);

// Get all expenses (basic, no filters)
router.get("/getAllExpense", protect, getAllExpenses);

// Get expenses with filtering (today, this week, this month, date range)
router.get("/getExpenseByFilter" ,  getExpenses);

// Get expense by ID
router.get("/getExpenseById/:id",  protect, getExpenseById);

// Update expense by ID
router.put("/updateExpense/:id",   protect, updateExpense);

// Delete expense by ID
router.delete("/deleteExpense/:id", protect, deleteExpense);

router.get("/get-monthlywise-expence", protect,  getMonthlyExpense);


export default router;
