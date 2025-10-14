import React, { useEffect, useState } from "react";
import { DollarSign, Plus } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useDashboardContext } from "../Context/Context";

function Expance() {

  const { MontlyWiseEXpance, TotalExpence, GetAllExpance } =
    useDashboardContext();

  const Navigate = useNavigate();

  return (
    <div className="w-full h-[80vh] py-6  md:p-6 ">
      {/* Top Section: Total Expense + Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-5 rounded-full bg-red-100">
            <DollarSign size={28} className="text-red-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Expense</p>
            <h1 className="text-3xl font-bold text-gray-800 mt-2">
              ₹{TotalExpence}
            </h1>
          </div>
        </div>
        <button
          onClick={() => Navigate("/api/addexpance")}
          className="mt-4 sm:mt-0 px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 shadow-md"
        >
          <Plus size={20} /> Add Expense
        </button>
      </div>

      {/* Monthly Expense Line Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Monthly Expense
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={MontlyWiseEXpance}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#ef4444"
              strokeWidth={3}
              name="Expense"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Expenses Table */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Expenses
        </h2>
        <div className="max-h-80 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="p-3">Month/Time</th>
                <th className="p-3">Name</th>
                <th className="p-3">Description</th>
                <th className="p-3">Amount</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View All Expenses Button */}
      <div className="flex justify-center">
        <button
        onClick={()=>Navigate("/api/viewallexpence")}
         className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white shadow-md">
          View All Expenses
        </button>
      </div>
    </div>
  );
}

export default Expance;
