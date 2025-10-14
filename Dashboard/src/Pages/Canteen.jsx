import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Coffee, ShoppingCart, Users, Box } from "lucide-react";
import { useDashboardContext } from "../Context/Context";
import axios from "axios";
import toast from "react-hot-toast";
import TotalOrder from "../OtherPages/TotalOrder";

function Canteen() {
  const navigate = useNavigate();
  const { getTotalItem, getAllCompletedOrder, getAllCancelledOrder, orders } =
    useDashboardContext();

  const [gymData, setGymData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Gym Info for verification
  useEffect(() => {
    const fetchGym = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/gym/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGymData(data.gym);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch gym data");
      } finally {
        setLoading(false);
      }
    };
    fetchGym();
  }, []);

  const cards = [
    {
      label: "Total Items",
      value: getTotalItem.length,
      color: "green",
      icon: <Users size={32} className="text-green-600" />,
      link: "/totalitem",
    },
    {
      label: "Completed Orders",
      value: getAllCompletedOrder.length,
      color: "orange",
      icon: <Box size={32} className="text-orange-600" />,
      link: "/CompletedOrders",
    },
    {
      label: "Cancelled Orders",
      value: getAllCancelledOrder.length,
      color: "red",
      icon: <Coffee size={32} className="text-red-600" />,
      link: "/CancelledOrders",
    },
    {
      label: "Total Orders",
      value:
        orders.length +
        getAllCancelledOrder.length +
        getAllCompletedOrder.length,
      color: "yellow",
      icon: <ShoppingCart size={32} className="text-yellow-600" />,
      link: "/TotalOrders",
    },
  ];

  // Loading UI
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-600 text-lg">
        Loading...
      </div>
    );
  }

  // 🚫 Not Verified Section
  if (!gymData?.isVerified) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] bg-white shadow-md rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Access Restricted
        </h2>
        <p className="text-gray-600 max-w-md">
          The Canteen Management feature is available only in the Premium Plan.
          Upgrade your account to access order management and analytics.
        </p>
      </div>
    );
  }

  // ✅ Verified → Show Canteen Dashboard
  return (
    <div className="w-full min-h-[80vh] py-6 md:p-6 bg-gray-50">
      {/* Dashboard Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => card.link && navigate(card.link)}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex items-center justify-between cursor-pointer group"
          >
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <h1 className="text-3xl font-bold text-gray-800 mt-2">
                {card.value}
              </h1>
            </div>
            <div
              className={`p-5 rounded-full bg-${card.color}-50 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}
            >
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Orders Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <TotalOrder />
      </div>
    </div>
  );
}

export default Canteen;
