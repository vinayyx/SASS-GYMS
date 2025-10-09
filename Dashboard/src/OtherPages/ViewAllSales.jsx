import React, { useState } from "react";
import { Eye } from "lucide-react";
import { useDashboardContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";



function ViewAllSales() {
  const { TotalSalesWithDiscription } = useDashboardContext();
  const Navigate = useNavigate()

  console.log(TotalSalesWithDiscription)

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Function to handle "View Full Details"

   const [SelectedUser, setSelectedUser] = useState();
  
    const handleViewDetails = (member) => {
      console.log(member)
      setSelectedUser(member); // optional if you just want ID
      Navigate("/viewsaledetails", { state: { SelectedUser: member } });
    };

 

  return (
    <div className="bg-white rounded-2xl shadow-lg py-6  md:p-6  mb-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Sales</h2>
      <div className="max-h-[70vh] overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="p-3">Member</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Paid Amount</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">Expire Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {TotalSalesWithDiscription.map((sale) => (
              <tr key={sale.id} className="border-b hover:bg-gray-50">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={sale.livePhoto}
                    alt={sale.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-800">
                    {sale.fullName}
                  </span>
                </td>
                <td className="p-3 text-gray-700">{sale.planName}</td>
                <td className="p-3 text-green-600 font-semibold">
                  ₹{sale.paidAmount}
                </td>
                <td className="p-3 text-gray-600">
                  {formatDate(sale.startedDate)}
                </td>
                <td className="p-3 text-gray-600">
                  {formatDate(sale.expireDate)}
                </td>
                <td className="p-3 flex justify-center">
                  <button
                    onClick={() => handleViewDetails(sale)}
                    className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-1"
                  >
                    <Eye size={18} /> View
                  </button>
                </td>
              </tr>
            ))}
            {TotalSalesWithDiscription.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-5 text-gray-500">
                  No sales found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAllSales;
