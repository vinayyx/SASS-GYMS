import React from "react";

const pricingPlans = [
  {
    name: "Basic",
    price: "999",
    period: "month",
    setup: "1000",
    features: [
      "Gym owner's personalized site",
      "Online member onboarding",
      "Online plan renewals & payments",
      "Biometric attendance setup",
      "24x7 customer support",
      "Secure data storage",
      "Optional gym data sharing",
    ],
  },
  {
    name: "Yearly",
    price: "10,000",
    period: "year",
    setup: "1000",
    features: [
      "Gym owner's personalized site",
      "Online member onboarding",
      "Online plan renewals & payments",
      "Biometric attendance setup",
      "24x7 customer support",
      "Secure data storage",
      "Optional gym data sharing",
    ],
  },
  {
    name: "Lifetime",
    price: "30,000",
    period: "lifetime",
    setup: "1000",
    features: [
      "Gym owner's personalized site",
      "Online member onboarding",
      "Online plan renewals & payments",
      "Biometric attendance setup",
      "24x7 customer support",
      "Secure data storage",
      "Optional gym data sharing",
    ],
  },
];

const Pricing = () => {
  return (
    <section className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-24 bg-black text-white font-poppins">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600 blur-[300px] -z-10"></div>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Gym Management Pricing Plans
        </h2>
        <p className="text-gray-300 text-base md:text-lg">
          Start with a 7-day free trial and choose the plan that suits your gym
          best. All plans include setup, full features, and 24x7 support.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`w-72 p-6 rounded-xl border ${
              plan.name === "Yearly"
                ? "bg-purple-950 border-purple-700"
                : "bg-gray-900 border-gray-800"
            } hover:scale-105 transition transform`}
          >
            {plan.name === "Yearly" && (
              <p className="absolute px-3 text-sm -top-3.5 left-3.5 py-1 bg-purple-600 rounded-full">
                Most Popular
              </p>
            )}
            <p className="font-semibold text-lg">{plan.name}</p>
            <h1 className="text-3xl font-bold mt-2">
              ₹{plan.price}{" "}
              <span className="text-gray-400 text-sm font-normal">
                /{plan.period}
              </span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Setup charge: ₹{plan.setup}
            </p>

            <ul className="mt-6 text-gray-300 text-sm space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                      fill={plan.name === "Yearly" ? "currentColor" : "#6366F1"}
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className="mt-7 w-full py-2 rounded-full text-white font-medium text-sm bg-purple-600 hover:bg-purple-700 transition">
              Get Started
            </button>

            <p className="mt-3 text-gray-500 text-xs text-center">
              7-day free trial included
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
