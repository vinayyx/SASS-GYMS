import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Hero() {
  const [member, setMember] = useState(null);
  const [loadingMember, setLoadingMember] = useState(false);
  const [email, setEmail] = useState("");

  const [planData, setPlanData] = useState({
    planType: "",
    planDuration: "",
    planId: "",
    startedDate: "",
    expireDate: "",
    price: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const [planTypes, setplanTypes] = useState([]);

  const fatchPlanTypes = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/plan/plansDropdown`
      );

      setplanTypes(data.data);

      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fatchPlanTypes();
  }, []);
  const durations = ["1 Month", "3 Months", "6 Months", "12 Months"];

  // ---------------- Fetch Member ----------------
  const fetchMember = async () => {
    if (!email) return toast.error("Enter email first");
    setLoadingMember(true);
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/member/get-member-by-email?email=${email}`
      );
      if (res.data.success) {
        setMember(res.data.member);
        toast.success("Member found!");
      } else {
        setMember(null);
        toast.error("Member not found");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch member");
      setMember(null);
    }
    setLoadingMember(false);
  };

  // ---------------- Plan Dropdown ----------------
  const handlePlanChange = (e) => {
    const { name, value } = e.target;
    setPlanData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const getPlanDetails = async () => {
      if (planData.planType && planData.planDuration) {
        try {
          const res = await axios.get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/plan/get-Start-end-Date?type=${encodeURIComponent(
              planData.planType
            )}&duration=${encodeURIComponent(planData.planDuration)}`
          );

          console.log(res);
          if (res.data.success) {
            const startParts = res.data.startDate.split("-");
            const endParts = res.data.endDate.split("-");

            const startISO = `${startParts[2]}-${startParts[1]}-${startParts[0]}`;
            const endISO = `${endParts[2]}-${endParts[1]}-${endParts[0]}`;

            setPlanData((prev) => ({
              ...prev,
              startedDate: startISO,
              expireDate: endISO,
              price: res.data.price,
              planId: res.data.planId, // ObjectId from backend
            }));
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    getPlanDetails();
  }, [planData.planType, planData.planDuration]);

  // ---------------- Payment ----------------
  const handlePayment = async () => {
    if (!planData.price) return toast.error("Select plan first");

    if (paymentMethod === "Cash") {
      // Create cash request instead of direct renewal
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/cash/create`,
          {
            memberId: member._id,
            planId: planData.planId,
            price: planData.price,
            startedDate: planData.startedDate,
            expireDate: planData.expireDate,
          }
        );
        if (res.data.success) toast.success("Cash request sent to admin!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to send cash request");
      }
      return;
    }

    try {
      const orderRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/order`,
        { amount: planData.price * 100 }
      );

      const { id: order_id, currency, amount } = orderRes.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "Gym Membership",
        description: "Plan Renewal",
        order_id,
        handler: async function (response) {
          await handleRenew(response);
        },
        prefill: {
          name: member.fullName,
          email: member.email,
          contact: member.contactNumber,
        },
        theme: { color: "#DC2626" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    }
  };

  // ---------------- Renew Plan ----------------
  const handleRenew = async (paymentResponse) => {
    try {
      const data = {
        email: member.email,
        planId: planData.planId,
        paidAmount: planData.price,
        isFullPaid: true,
        startedDate: planData.startedDate,
        expireDate: planData.expireDate,
        method: paymentMethod,
        transactionId: paymentResponse?.razorpay_payment_id || "Cash",
        razorpayOrderId: paymentResponse?.razorpay_order_id || "Cash",
        razorpayPaymentId: paymentResponse?.razorpay_payment_id || "Cash",
        razorpaySignature: paymentResponse?.razorpay_signature || "Cash",
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/plan/renewplan`,
        data
      );

      if (res.data.success) {
        toast.success("Plan renewed successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to renew plan");
    }
  };

  return (
    <div className="w-full  py-6 md:px-8 px-2 sm:p-8 bg-black text-white flex flex-col items-center">
      {/* Email input */}
      <div className="w-full  flex items-center justify-center bg-black md:px-4 md:py-10">
        <div className="w-full max-w-xl sm:max-w-3xl md:max-w-5xl  p-8 md:p-12  shadow-2xl ">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 text-center drop-shadow-lg">
            Enter Your Registered Email
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 p-4 rounded-xl bg-[#222] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all w-full sm:w-auto"
            />
            <button
              onClick={fetchMember}
              className="px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
            >
              {loadingMember ? "Searching..." : "Serach Member"}
            </button>
          </div>
        </div>
      </div>

      {/* Member Info */}
      {member && (
        <div className="w-full max-w-5xl bg-[#222222] p-6 sm:p-8 rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <h2 className="text-xl font-semibold text-red-500 mb-4">
              Member: {member.fullName}
            </h2>
            <p>Email: {member.email}</p>
            <p>Contact: {member.contactNumber}</p>

            <h3 className="mt-4 text-lg font-semibold">Current Plans:</h3>
            {member.plan.map((p, idx) => (
              <div
                key={idx}
                className="p-3 mt-2 bg-[#111] rounded border border-gray-600"
              >
                <p>Plan: {p.Plan.type}</p>
                <p>Price: ₹{p.Plan.price}</p>
                <p>Duration: {p.Plan.duration}</p>
                <p>
                  Expire: {new Date(p.expireDate).toLocaleDateString("en-GB")}
                </p>
              </div>
            ))}
          </div>

          {/* Plan Renewal */}
          <div className="sm:col-span-2">
            <label className="text-sm font-semibold">Plan Type</label>
            <select
              name="planType"
              value={planData.planType}
              onChange={handlePlanChange}
              className="p-3 rounded bg-[#111] border border-gray-600 w-full mb-4"
            >
              <option value="">Select Type</option>
              {planTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <label className="text-sm font-semibold">Duration</label>
            <select
              name="planDuration"
              value={planData.planDuration}
              onChange={handlePlanChange}
              className="p-3 rounded bg-[#111] border border-gray-600 w-full mb-4"
            >
              <option value="">Select Duration</option>
              {durations.map((dur) => (
                <option key={dur} value={dur}>
                  {dur}
                </option>
              ))}
            </select>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <input
                type="date"
                name="startedDate"
                value={planData.startedDate}
                readOnly
                className="p-3 rounded bg-[#111] border border-gray-600"
              />
              <input
                type="date"
                name="expireDate"
                value={planData.expireDate}
                readOnly
                className="p-3 rounded bg-[#111] border border-gray-600"
              />
            </div>

            <input
              type="number"
              name="price"
              value={planData.price || ""}
              readOnly
              placeholder="Price"
              className="p-3 rounded bg-[#111] border border-gray-600 w-full mb-4"
            />

            <label className="text-sm font-semibold">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="p-3 rounded bg-[#111] border border-gray-600 w-full mb-4"
            >
              <option value="UPI">UPI</option>
              <option value="Cash">Cash</option>
            </select>

            <button
              onClick={handlePayment}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition duration-300"
            >
              Pay & Renew Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero;
