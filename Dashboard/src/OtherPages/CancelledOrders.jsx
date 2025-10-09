// CancelledOrders.jsx
import React from "react";
import { useDashboardContext } from "../Context/Context";

const CancelledOrders = () => {
  const { getAllCancelledOrder } = useDashboardContext();

  return (
    <div className="p-6 h-[80vh]">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Cancelled Orders</h2>
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
            {getAllCancelledOrder.map((order, index) => (
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
                <td className="py-3 px-6 font-semibold text-red-600">
                  ₹{order.totalPrice}
                </td>
                <td className="py-3 px-6">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    {order.status}
                  </span>
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

export default CancelledOrders;
