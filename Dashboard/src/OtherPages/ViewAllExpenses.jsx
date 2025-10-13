import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { useDashboardContext } from "../Context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewAllExpenses() {
  const { GetAllExpance, refreshTotalExpense } = useDashboardContext();
  const [SelectedExpance, setSelectedExpance] = useState();
  const token = localStorage.getItem("adminToken");


  const Navigate = useNavigate();

  console.log(GetAllExpance)

  const handleEdit = (exp) => {
    setSelectedExpance(exp._id); 
    Navigate("/editexpence", { state: { expense: exp } });
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/expense/deleteExpense/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      refreshTotalExpense();
      console.log(data);
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete expense. Try again.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg py-6  md:p-6  mb-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Recent Expenses
      </h2>
      <div className="max-h-[70vh] overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="p-3">Month/Time</th>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Amount</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {GetAllExpance.map((exp, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-700">
                  {new Date(exp.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="p-3">{exp.name}</td>
                <td className="p-3">{exp.description}</td>
                <td className="p-3 text-red-600 font-semibold">
                  ₹{exp.amount}
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      handleEdit(exp);
                    }}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {GetAllExpance.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-5 text-gray-500">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAllExpenses;
