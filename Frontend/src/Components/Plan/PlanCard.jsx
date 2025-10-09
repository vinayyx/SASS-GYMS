import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function PlanCard() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/plan/all`
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          setPlans(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-black">
        <ClipLoader color="#ef4444" size={60} />
      </div>
    );
  }

  const groupedPlans = plans.reduce((acc, plan) => {
    if (!acc[plan.type]) acc[plan.type] = [];
    acc[plan.type].push(plan);
    return acc;
  }, {});

  return (
    <div className="py-12 px-4 md:px-12 text-white bg-[#0f0f0f]">
      {Object.entries(groupedPlans).map(([type, typePlans], idx) => (
        <div key={idx} className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-10 tracking-wide">
            {type}
          </h2>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                       gap-8 place-items-center"
          >
            {typePlans.map((plan) => (
              <div
                key={plan._id}
                className="relative w-full max-w-sm bg-gradient-to-br from-[#1a1a1a] to-[#111] 
                           border border-red-700/40 text-white p-6 rounded-2xl shadow-lg 
                           hover:shadow-red-600/40 hover:scale-[1.03] 
                           transition-all duration-300 flex flex-col"
              >
                {/* Plan duration */}
                <p className="font-bold text-2xl text-center mb-6">
                  {plan.duration}
                </p>

                {/* Features */}
                <ul className="list-none text-gray-300 text-sm mt-2 space-y-3 flex-1">
                  {plan.keyPoints.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-left leading-relaxed"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0 mt-1"
                      >
                        <path
                          d="M7.162 13.5 2.887 9.225l1.07-1.069 
                             3.205 3.207 6.882-6.882 1.069 1.07z"
                          fill="#ef4444"
                        />
                      </svg>
                      <p>{point}</p>
                    </li>
                  ))}
                </ul>

                {/* Price Button */}
                <div className="mt-8">
                  <button
                    type="button"
                    className="bg-red-600 text-lg w-full py-3 rounded-lg 
                               text-white font-semibold hover:bg-red-500 
                               hover:shadow-lg hover:shadow-red-700/40 transition-all"
                  >
                    ₹{plan.price}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
