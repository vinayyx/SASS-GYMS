import express from "express";
import {
  createExense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenses,
  getMonthlyExpense
} from "../Controller/expenseController.js";

const router = express.Router();

// Create a new expense
router.post("/createExpense", createExense);

// Get all expenses (basic, no filters)
router.get("/getAllExpense", getAllExpenses);

// Get expenses with filtering (today, this week, this month, date range)
router.get("/getExpenseByFilter", getExpenses);

// Get expense by ID
router.get("/getExpenseById/:id", getExpenseById);

// Update expense by ID
router.put("/updateExpense/:id", updateExpense);

// Delete expense by ID
router.delete("/deleteExpense/:id", deleteExpense);

router.get("/get-monthlywise-expence",   getMonthlyExpense);


export default router;
