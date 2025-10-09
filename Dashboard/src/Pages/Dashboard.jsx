import React from "react";
import { Sparkles } from "lucide-react";
import SalesChart from "../Components/SalesChart";

import { useDashboardContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  
  const Navigate = useNavigate()

  const { TotalMember, TotalExpence, ExpringIn7Days, TotalSales } =
    useDashboardContext();

  // Count

  const cards = [
    {
      label: "Total Member",
      value: TotalMember,
      color: "blue",
      link: "/memberdetails",
    },
    { label: "Total Sale", value: TotalSales, color: "yellow", link: "/viewallsales", },
    { label: "Expire in 7 Days", value: ExpringIn7Days, color: "green", link: "/viewexpireinsevendays" },
    { label: "Total Expense", value: TotalExpence, color: "red", link: "/viewallexpence" },
  ];

  return (
    <div className="w-full md:h-[80vh]  py-6  md:p-6 ">
      {/* Cards Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {cards.map((card, i) => (
          <div
            onClick={() => card.link && Navigate(card.link)}
            key={i}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex items-center justify-between group"
          >
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <h1 className="text-4xl font-bold text-gray-800 mt-2">
                {card.value}
              </h1>
            </div>
            <div
              className={`p-5 rounded-full bg-${card.color}-100 group-hover:scale-110 transition-transform duration-300`}
            >
              <Sparkles className={`text-${card.color}-500`} size={32} />
            </div>
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <SalesChart />
    </div>
  );
}

export default Dashboard;
