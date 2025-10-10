import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    gymId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gym",
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
