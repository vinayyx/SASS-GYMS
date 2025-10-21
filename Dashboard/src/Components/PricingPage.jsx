import React from "react";

const pricingPlans = [
  {
    name: "Basic",
    price: "999",
    period: "month",
    setup: "1000",
    popular: false,
    features: [
      "Gym owner's personalized site",
      "Online member onboarding",
      "Online plan renewals & payments",
      "QR attendance system",
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
    popular: true,
    features: [
      "Gym owner's personalized site",
      "Online member onboarding",
      "Online plan renewals & payments",
      "Biometric attendance setup",
      "24x7 customer support",
      "Secure data storage",
      "Auto email for expiring members",
      "Advanced analytics dashboard",
    ],
  },
  {
    name: "Lifetime",
    price: "30,000",
    period: "lifetime",
    setup: "1000",
    popular: false,
    features: [
      "All Yearly plan benefits",
      "Lifetime support & hosting",
      "Unlimited members and branches",
      "Free renewal & payment gateway",
      "Dedicated manager support",
      "Custom domain setup",
      "Priority bug fixes & updates",
    ],
  },
];

export default function PricingPage() {
  return (
    <section className="relative bg-black text-white font-poppins px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 py-24 overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-[#7E22CE]/30 blur-[180px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-purple-900/20 blur-[180px] rounded-full -z-10"></div>

      {/* Header */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Choose Your Perfect Plan
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-base md:text-lg">
          Whether you're managing a small local gym or a franchise — we’ve got
          a plan designed for your growth. Start free and scale anytime.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-wrap justify-center gap-10">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`relative w-80 p-8 rounded-2xl border shadow-lg transition-all duration-300 
              ${
                plan.popular
                  ? "bg-gradient-to-b from-purple-900/60 to-black border-purple-700 shadow-purple-800/50 scale-105"
                  : "bg-gradient-to-b from-gray-900 to-black border-gray-800 hover:border-purple-700"
              } hover:scale-105 hover:shadow-purple-700/30`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-3 left-5 bg-purple-600 text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </div>
            )}

            <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
            <div className="mt-3 text-4xl font-extrabold">
              ₹{plan.price}
              <span className="text-sm text-gray-400 font-normal">
                /{plan.period}
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Setup charge: ₹{plan.setup}
            </p>

            <ul className="mt-6 text-gray-300 text-sm space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-1"
                  >
                    <path
                      d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
                      fill="#7E22CE"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`mt-8 w-full py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                plan.popular
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-gray-800 hover:bg-purple-600"
              }`}
            >
              {plan.popular ? "Start Now" : "Get Started"}
            </button>

            <p className="mt-3 text-gray-500 text-xs text-center">
              7-day free trial included
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Note */}
      <div className="text-center mt-16 text-gray-400 text-sm">
        All plans include 24x7 support • Secure Cloud Hosting • Free Setup
        Assistance
      </div>
    </section>
  );
}
