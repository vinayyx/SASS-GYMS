import React from "react";
import { useNavigate } from "react-router-dom";
import { Coffee, ShoppingCart, Users, Box } from "lucide-react";
import { useDashboardContext } from "../Context/Context";
import TotalOrder from "../OtherPages/TotalOrder";

function Canteen() {
  const navigate = useNavigate();

  const {getTotalItem, getAllCompletedOrder , getAllCancelledOrder, orders} = useDashboardContext()

  const cards = [
    {
      label: "Total Items",
      value: getTotalItem.length,
      color: "green",
      icon: <Users size={32} className="text-green-600" />,
      link: "/totalitem",
    },
    {
      label: "Completed Order",
      value: getAllCompletedOrder.length,
      color: "orange",
      icon: <Box size={32} className="text-orange-600" />,
      link: "/CompletedOrders",
    },
    {
      label: "Cancelled Order",
      value: getAllCancelledOrder.length,
      color: "red",
      icon: <Coffee size={32} className="text-red-600" />,
      link: "/CancelledOrders",
    },
    {
      label: "Total Order",
      value: orders.length + getAllCancelledOrder.length + getAllCompletedOrder.length ,
      color: "yellow",
      icon: <ShoppingCart size={32} className="text-yellow-600" />,
      link: "/TotalOrders",
    },
  ];

  return (
    <div className="w-full md:h-[80vh] py-6 md:p-6 bg-white">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {cards.map((card, i) => (
          <div
            onClick={() => card.link && navigate(card.link)}
            key={i}
            className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex items-center justify-between cursor-pointer`}
          >
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <h1 className="text-3xl font-bold text-gray-800 mt-2">
                {card.value}
              </h1>
            </div>
            <div className="p-5 rounded-full bg-gray-100 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
              {card.icon}
            </div>
          </div>
        ))}
      </div>



         <TotalOrder/>

      

     
    </div>
  );
}

export default Canteen;
