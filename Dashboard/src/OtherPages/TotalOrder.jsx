import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import orderNotification from "../assets/notification_tone.mp3";
import { useDashboardContext } from "../Context/Context";

function TotalOrder() {
  const [loading, setLoading] = useState(false);
 
  const {audioRef, orders, prevOrderIdsRef, refreshOrder} = useDashboardContext()

 

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/updatastatus/${id}`,
        {
          status: newStatus,
        }
      );

      refreshOrder()
      if (res.data.success) {
        toast.success("Status updated");
       
      } else {
        toast.error(res.data.message || "Failed to update status");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6 w-full mx-auto">
      <audio ref={audioRef} src={orderNotification} />
      <h2 className="text-2xl font-bold mb-4">Total Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-lg shadow-md bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{order.personName}</h3>
                  <p className="text-gray-600">{order.phoneNumber}</p>
                  <p className="text-gray-600">Total: ₹{order.totalPrice}</p>
                  <p className="text-gray-600">
                    Status:{" "}
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </p>
                </div>
                <div className="flex gap-2">
                  {order.items.map((item) => (
                    <img
                      key={item._id}
                      src={item.itemImage}
                      alt={item.itemName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {order.items.map((item) => (
                  <div key={item._id} className="border p-2 rounded">
                    <p className="font-medium">{item.itemName}</p>
                    <p>₹{item.itemPrice}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TotalOrder;
