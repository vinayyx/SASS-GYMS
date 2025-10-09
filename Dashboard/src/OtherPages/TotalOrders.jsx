// TotalOrders.jsx
import React from "react";
import { useDashboardContext } from "../Context/Context";

const TotalOrders = () => {
  const { getTotalOrder } = useDashboardContext();

  // Helper function to determine status color
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-blue-600";
      case "completed":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="p-6 h-[80vh]">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">All Orders</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Items</th>
              <th className="py-3 px-6 text-left">Total Price</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {getTotalOrder.map((order, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200 text-gray-700"
              >
                <td className="py-3 px-6">{order.personName}</td>
                <td className="py-3 px-6">{order.phoneNumber}</td>
                <td className="py-3 px-6">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-100 px-2 py-1 my-1 rounded border border-gray-200"
                    >
                      {item.itemName} - ₹{item.itemPrice}
                    </div>
                  ))}
                </td>
                <td className="py-3 px-6 font-semibold">
                  ₹{order.totalPrice}
                </td>
                <td className={`py-3 px-6 font-medium ${getStatusClass(order.status)}`}>
                  {order.status}
                </td>
                <td className="py-3 px-6">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalOrders;
