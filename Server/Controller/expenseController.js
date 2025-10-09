import Expense from "../Model/expense.js";

// Create a new expense
export const createExense = async(req, res) => {
    try{
        const expense = new Expense(req.body);
        await expense.save();
        res.status(201).json({ success: true, data: expense, message: "Expense created successfully" });
    }catch(error){
        res.status(400).json({ success: false, error: error.message });
    }

}

// Get all expenses
export const getAllExpenses = async(req, res) => {
    try{    
        const expenses = await Expense.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, 
            data: { 
                TotalExpense : expenses.length,
                AllExpense : expenses 
            } 
        });
    }catch(error){
        res.status(500).json({ success: false, error: error.message });
    }   
}

// Get expense by ID
export const getExpenseById = async(req, res) => {
    try{
        const { id } = req.params;
        const expense = await Expense.findById(id);
        if(!expense){
            return res.status(404).json({ success: false, message: "Expense not found" });
        }
        res.status(200).json({ success: true, data: expense });
    }catch(error){
        res.status(500).json({ success: false, error: error.message });
    }
}

// Update expense by ID
export const updateExpense = async(req, res) => {
    try{
        const { id } = req.params;
        const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if(!updatedExpense){
            return res.status(404).json({ success: false, message: "Expense not found" });
        }
        res.status(200).json({ success: true, data: updatedExpense });
    }catch(error){
        res.status(400).json({ success: false, error: error.message });
    }
}

// Delete expense by ID
export const deleteExpense = async(req, res) => {
    try{
        const { id } = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if(!deletedExpense){
            return res.status(404).json({ success: false, message: "Expense not found" });
        }
        res.status(200).json({ success: true, message: "Expense deleted successfully" });
    }catch(error){
        res.status(500).json({ success: false, error: error.message });
    }
}

// Get expenses with filtering options
export const getExpenses = async (req, res) => {
  try {
    const { filter, from, to } = req.query;
    let query = {};

    // Case 1: Filter by "today" | "this week" | "this month"
    if (filter) {
      const now = new Date();

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

    // Case 3: No filter → show all
    const expenses = await Expense.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// Get Monthly Expense Aggregated
export const getMonthlyExpense = async (req, res) => {
  try {
    const monthlyData = await Expense.aggregate([
      {
        // Group by month (0-11) of createdAt
        $group: {
          _id: { $month: "$createdAt" }, // 1 = Jan, 2 = Feb ...
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id": 1 } // sort by month
      }
    ]);

    // Map aggregation to month names
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const formattedData = months.map((monthName, index) => {
      const monthRecord = monthlyData.find(m => m._id === index + 1);
      return {
        month: monthName,
        amount: monthRecord ? monthRecord.totalAmount : 0
      };
    });

    res.status(200).json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
