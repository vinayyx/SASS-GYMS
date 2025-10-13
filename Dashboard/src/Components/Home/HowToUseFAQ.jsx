import React from "react";

const HowToUseFAQ = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqs = [
    {
      question: "How do I add a new gym plan?",
      answer:
        "To add a new gym plan, go to your dashboard, click 'Add Plan', and fill in the plan details like duration, pricing, and features. Once saved, it will be available for members.",
    },
    {
      question: "How can I add new members?",
      answer:
        "After creating a plan, you can add members by selecting the plan and clicking 'Add Member'. Fill in their personal and membership details, and they will be added to your gym database.",
    },
    {
      question: "Where can I see my sales and member information?",
      answer:
        "All your gym's sales, active members, and membership statuses are available in the dashboard. You can track renewals, pending payments, and member activity from a single place.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, all data including member information, payments, and attendance is securely stored and encrypted. Only authorized gym owners can access it.",
    },
    {
      question: "Can I try this before subscribing?",
      answer:
        "Yes! You can use a 7-day free trial which includes full gym management features. Website features for members will be unlocked after subscribing to a plan.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start justify-center gap-8 px-4 md:px-0 py-16 bg-[#0f172a] rounded-xl shadow-xl">
      <img
        className="max-w-sm w-full rounded-xl h-auto shadow-lg"
        src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
        alt="Gym Management"
      />
      <div>
        <p className="text-purple-500 text-sm font-medium">How to Use</p>
        <h1 className="text-3xl font-semibold text-white mt-1">Getting Started with Gym Management</h1>
        <p className="text-gray-400 text-sm mt-2 pb-4 max-w-md">
          Easily manage your gym plans, members, payments, and attendance. Everything is visible from your dashboard with secure and real-time updates.
        </p>

        {faqs.map((faq, index) => (
          <div
            className="border-b border-gray-700 py-4 cursor-pointer"
            key={index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-white">{faq.question}</h3>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  openIndex === index ? "rotate-180" : ""
                } transition-all duration-500 ease-in-out stroke-purple-500`}
              >
                <path
                  d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p
              className={`text-sm text-gray-400 transition-all duration-500 ease-in-out max-w-md ${
                openIndex === index
                  ? "opacity-100 max-h-[300px] translate-y-0 pt-4"
                  : "opacity-0 max-h-0 -translate-y-2"
              }`}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowToUseFAQ;
