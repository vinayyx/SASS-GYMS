import React, { useEffect, useState } from "react";
import { BarChart as ChartIcon, DollarSign } from "lucide-react";
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
import { useDashboardContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";

function Sales() {
  const { TotalSales, TotalExpence, MonthlyDataForSaleGraph } =
    useDashboardContext();

  const Navigate = useNavigate();

  return (
    <div className="w-full  h-[80vh] py-6  md:p-6 ">
      {/* Top Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div
          onClick={() => Navigate("/api/viewallsales")}
          className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-gray-500">Total Sale</p>
            <h1 className="text-3xl font-bold text-gray-800 mt-2">
              ₹{TotalSales}
            </h1>
          </div>
          <div className="p-5 rounded-full bg-blue-100">
            <DollarSign size={28} className="text-blue-500" />
          </div>
        </div>
        <div
          onClick={() => Navigate("/api/viewallexpence")}
          className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-gray-500">Total Expense</p>
            <h1 className="text-3xl font-bold text-gray-800 mt-2">
              ₹{TotalExpence}
            </h1>
          </div>
          <div className="p-5 rounded-full bg-red-100">
            <DollarSign size={28} className="text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Profit</p>
            <h1 className="text-3xl font-bold text-gray-800 mt-2">
              ₹{TotalSales - TotalExpence}
            </h1>
          </div>
          <div className="p-5 rounded-full bg-green-100">
            <ChartIcon size={28} className="text-green-500" />
          </div>
        </div>
      </div>

      {/* Monthly Sale vs Expense Line Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Monthly Sale vs Expense
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={MonthlyDataForSaleGraph}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sale"
              stroke="#2563eb"
              strokeWidth={3}
              name="Sale"
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={3}
              name="Expense"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Sales;
