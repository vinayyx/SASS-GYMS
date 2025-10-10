import Expense from "../Model/expense.js";

// Create a new expense
export const createExpense = async (req, res) => {
  try {
    // Gym ID from token middleware
    const gymId = req.gym.id;

    if (!gymId) {
      res.status(401).json({
        success: false,
        message: "Please Login first",
      });
    }

    // Add gymId to the expense data
    const expense = new Expense({
      ...req.body,
      gymId: gymId,
    });

    await expense.save();

    res.status(201).json({
      success: true,
      data: expense,
      message: "Expense created successfully",
    });
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(400).json({
      success: false,
      message: "Error creating expense",
      error: error.message,
    });
  }
};

// Get all expenses
export const getAllExpenses = async (req, res) => {
  try {
    // Gym ID from middleware
    const gymId = req.gym?.id;

    // If no gymId found in request (user not logged in)
    if (!gymId) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in.",
      });
    }

    // Find all expenses for this gym only
    const expenses = await Expense.find({ gymId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        totalExpense: expenses.length,
        allExpenses: expenses,
      },
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching expenses",
      error: error.message,
    });
  }
};

// Get expense by ID
export const getExpenseById = async (req, res) => {
  try {
    const gymId = req.gym?.id; // token se gym id
    const { id } = req.params;

    // Check login
    if (!gymId) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in.",
      });
    }

    // Find expense by ID and gymId (to ensure ownership)
    const expense = await Expense.findOne({ _id: id, gymId });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found or does not belong to your gym.",
      });
    }

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    console.error("Error fetching expense:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching expense.",
      error: error.message,
    });
  }
};

// Update expense by ID
export const updateExpense = async (req, res) => {
  try {
    const gymId = req.gym?.id; // token se gym id
    const { id } = req.params;

    // Agar login nahi hai
    if (!gymId) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in.",
      });
    }

    // Expense sirf usi gym ka update ho jo login hai
    const expense = await Expense.findOne({ _id: id, gymId });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found or does not belong to your gym.",
      });
    }

    // Update expense
    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Expense updated successfully.",
      data: updatedExpense,
    });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(400).json({
      success: false,
      message: "Error updating expense.",
      error: error.message,
    });
  }
};

// Delete expense by id

export const deleteExpense = async (req, res) => {
  try {
    const gymId = req.gym?.id; // set by auth middleware
    const { id } = req.params;

    // Check login / token
    if (!gymId) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in.",
      });
    }


    // Find and delete only if expense belongs to this gym
    const deletedExpense = await Expense.findOneAndDelete({ _id: id, gymId });

    if (!deletedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found or does not belong to your gym.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Expense deleted successfully.",
      data: deletedExpense,
    });
  } catch (error) {
    console.error("Error deleting expense:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting expense.",
      error: error.message,
    });
  }
};


// Get expenses with filtering options

export const getExpenses = async (req, res) => {
  try {
    const gymId = req.gym?.id; // From token middleware
    const { filter, from, to } = req.query;

    if (!gymId) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in.",
      });
    }

    let query = { gymId }; // Only fetch expenses for this gym

    const now = new Date();

    // Case 1: Filter by "today" | "this week" | "this month"
    if (filter) {
      if (filter === "today") {
        const start = new Date(now.setHours(0, 0, 0, 0));
        const end = new Date(now.setHours(23, 59, 59, 999));
        query.createdAt = { $gte: start, $lte: end };
      }

      if (filter === "this week") {
        const firstDay = new Date(now.setDate(now.getDate() - now.getDay())); // Sunday
        const lastDay = new Date(firstDay);
        lastDay.setDate(lastDay.getDate() + 6); // Saturday
        query.createdAt = { $gte: firstDay, $lte: lastDay };
      }

      if (filter === "this month") {
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        query.createdAt = { $gte: firstDay, $lte: lastDay };
      }
    }

    // Case 2: Custom Date Range (from, to)
    if (from && to) {
      query.createdAt = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }

    // Fetch expenses for this gymId only
    const expenses = await Expense.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching expenses.",
      error: error.message,
    });
  }
};


// Get Monthly Expense Aggregated
export const getMonthlyExpense = async (req, res) => {
  try {
    const gymId = req.gym?.id; // Extract from token middleware

    if (!gymId) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in.",
      });
    }

    const monthlyData = await Expense.aggregate([
      {
        $match: { gymId: gymId }, // Filter only expenses of this gym
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month (1–12)
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const formattedData = months.map((monthName, index) => {
      const monthRecord = monthlyData.find((m) => m._id === index + 1);
      return {
        month: monthName,
        amount: monthRecord ? monthRecord.totalAmount : 0,
      };
    });

    res.status(200).json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching monthly expense:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching monthly expenses.",
      error: error.message,
    });
  }
};