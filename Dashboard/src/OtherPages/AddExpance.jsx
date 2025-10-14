import React, { useState } from "react";
import axios from "axios";
import { useDashboardContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";

function AddExpense() {
  const { expense, setExpense, refreshTotalExpense } = useDashboardContext();
  const token = localStorage.getItem("adminToken"); // get token from localStorage

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/expense/createExpense`,
        expense,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      refreshTotalExpense();

      setMessage("Expense added successfully!");

      setExpense({ name: "", amount: "", description: "" });
      Navigate("/api/expance");
      console.log("Expense response:", data);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Failed to add expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[80vh]  flex justify-center items-center py-6  md:p-6 ">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-red-200 p-8 sm:p-10 flex flex-col justify-center h-full overflow-hidden">
        <h2 className="text-3xl font-bold text-red-700 mb-6 text-center tracking-wide">
          Add Expense
        </h2>

        {message && (
          <div
            className={`mb-5 text-sm p-3 rounded-md ${
              message.includes("success")
                ? "bg-red-100 text-red-800"
                : "bg-red-200 text-red-900"
            } text-center shadow-sm`}
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-1 h-full"
        >
          <div>
            <label className="block text-red-700 font-semibold mb-1">
              Expense Name
            </label>
            <input
              type="text"
              name="name"
              value={expense.name}
              onChange={handleChange}
              placeholder="Enter expense name"
              className="w-full px-4 py-3 rounded-xl border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-red-700 font-semibold mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full px-4 py-3 rounded-xl border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm transition-all"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block text-red-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={expense.description}
              onChange={handleChange}
              placeholder="Optional description"
              className="w-full px-4 py-3 rounded-xl border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm transition-all resize-none h-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-bold mt-10 ${
              loading
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            } transition-all duration-200`}
          >
            {loading ? "Submitting..." : "Add Expense"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddExpense;
