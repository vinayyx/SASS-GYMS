import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, EyeIcon } from "lucide-react";
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
import {useNavigate} from "react-router-dom"

function Plan() {
  const [planSales, setPlanSales] = useState([]);
  const { TotalPlan, TotalRecentPlan, TotalPlanForGraph } = useDashboardContext();
  const Navigate = useNavigate()

  // Transform data from backend -> chart readable format
  useEffect(() => {
    if (TotalPlanForGraph && TotalPlanForGraph.length > 0) {
      const transformed = TotalPlanForGraph.map((item) => ({
        month: item.month,
        Cardio:
          (item["Cardio - 1 Month"] || 0) +
          (item["Cardio - 3 Months"] || 0) +
          (item["Cardio - 6 Months"] || 0) +
          (item["Cardio - 12 Months"] || 0),
        "Weight Training":
          (item["Weight Training - 1 Month"] || 0) +
          (item["Weight Training - 3 Months"] || 0) +
          (item["Weight Training - 6 Months"] || 0) +
          (item["Weight Training - 12 Months"] || 0),
      }));

      setPlanSales(transformed);
    }
  }, [TotalPlanForGraph]);

  return (
    <div className="w-full h-[80vh] py-6 md:p-6">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div>
          <p className="text-sm text-gray-500">Total Plans</p>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">
            {TotalPlan.length}
          </h1>
        </div>

        <div className="flex gap-5">

           <button onClick={()=>Navigate("/addPlan")} className="mt-4 sm:mt-0 px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 shadow-md">
          <Plus size={20} /> Add Plan
        </button>
        <button onClick={()=>Navigate("/viewAllPlan")} className="mt-4 sm:mt-0 px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 shadow-md">
          <EyeIcon size={20} /> View All Plan
        </button>

        </div>
       
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Monthly Plan Sales
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={planSales} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Cardio" stroke="#2563eb" strokeWidth={3} />
            <Line type="monotone" dataKey="Weight Training" stroke="#f59e0b" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Plans */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Plans</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="p-3">Plan Name</th>
                <th className="p-3">Price (₹)</th>
                <th className="p-3">Subscribers</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {TotalRecentPlan.slice(0, 4).map((plan, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-700">{plan.name}</td>
                  <td className="p-3">{plan.price}</td>
                  <td className="p-3">{plan.subscribers}</td>
                  <td className="p-3 flex justify-center gap-3">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Edit2 size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          <button className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow-md">
            View All Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Plan;
