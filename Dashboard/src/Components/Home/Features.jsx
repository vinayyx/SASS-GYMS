import React from "react";
import {  UserCheck, TrendingUp, Mail } from "lucide-react";

const featuresData = [
  {
    icon: <UserCheck className="w-8 h-8 text-purple-400" />,
    title: "Automated Workflows",
    description:
      "Save time with automated tasks for members, plans, and gym management.",
  },
  {
    icon: <UserCheck className="w-8 h-8 text-purple-400" />,
    title: "Member Management",
    description:
      "Easily manage member profiles, attendance, and subscription plans.",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
    title: "Sales Tracking",
    description:
      "Track which plans are selling the most and monitor revenue growth.",
  },
  {
    icon: <Mail className="w-8 h-8 text-purple-400" />,
    title: "Bulk Email Notifications",
    description:
      "Send automated emails to members about updates, promotions, or reminders.",
  },
];

const Features = () => {
  return (
    <section className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-24 bg-black text-white font-poppins">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600 blur-[300px] -z-10"></div>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Powerful Features for Your Gym
        </h2>
        <p className="text-gray-300 text-base md:text-lg">
          Everything you need to manage your gym efficiently, track members,
          payments, and boost growth—all in one platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-6 bg-gray-900 rounded-xl border border-gray-800 hover:bg-purple-950 transition"
          >
            <div className="flex-shrink-0">{feature.icon}</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
