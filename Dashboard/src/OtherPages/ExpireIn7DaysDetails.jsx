import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { useDashboardContext } from "../Context/Context";
import {useNavigate} from "react-router-dom"

function ExpireIn7DaysDetails() {
  const { ExpireIn7DaysDetails } = useDashboardContext();
  const [expiringPlans, setExpiringPlans] = useState([]);
    const [SelectedUser, setSelectedUser] = useState([]);


  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Days left until expiry
  const daysUntilExpire = (expireDate) => {
    const today = new Date();
    const expire = new Date(expireDate);
    const diffDays = Math.ceil((expire - today) / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Check if plan is expiring within 7 days
  const isExpiringSoon = (expireDate) => {
    const daysLeft = daysUntilExpire(expireDate);
    return daysLeft <= 7 && daysLeft >= 0;
  };

useEffect(() => {
  if (!ExpireIn7DaysDetails || ExpireIn7DaysDetails.length === 0) return;

  // Flatten members + plans and include type
  const flattenedPlans = ExpireIn7DaysDetails.flatMap((member) =>
    member.plan.map((p) => ({
      _id: member,
      fullName: member.fullName,
      livePhoto: member.livePhoto,
      planType: p.Plan.type || p.planName, // agar type nahi hai to planName fallback
      paidAmount: p.paidAmount,
      startedDate: p.startedDate,
      expireDate: p.expireDate,
    }))
  );

  // Filter plans expiring in 7 days
  const filtered = flattenedPlans.filter((plan) =>
    isExpiringSoon(plan.expireDate)
  );

  setExpiringPlans(filtered);
}, [ExpireIn7DaysDetails]);


const Navigate = useNavigate();





  const handleViewDetails = (member) => {
   console.log(member)
    setSelectedUser(member); // optional if you just want ID
    Navigate("/api/viewmemberdetails", { state: { SelectedUser: member } });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg py-6  md:p-6  mb-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Plans Expiring in 7 Days
      </h2>
      <div className="max-h-[70vh] overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="p-3">Member</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Paid Amount</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">Expire Date</th>
              <th className="p-3">Expires In</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expiringPlans.map((plan) => (
              <tr
                key={plan._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={plan.livePhoto}
                    alt={plan.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-800">
                    {plan.fullName}
                  </span>
                </td>
                <td className="p-3 text-gray-700">{plan.planType}</td>
                <td className="p-3 text-green-600 font-semibold">
                  ₹{plan.paidAmount}
                </td>
                <td className="p-3 text-gray-600">{formatDate(plan.startedDate)}</td>
                <td className="p-3 text-gray-600">{formatDate(plan.expireDate)}</td>
                <td className="p-3 text-gray-800 font-semibold">
                  {daysUntilExpire(plan.expireDate)} days
                </td>
                <td className="p-3 flex justify-center">
                  <button
                    onClick={() => handleViewDetails(plan._id)}
                    className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-1"
                  >
                    <Eye size={18} /> View
                  </button>
                </td>
              </tr>
            ))}
            {expiringPlans.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center p-5 text-gray-500">
                  No plans expiring in the next 7 days.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpireIn7DaysDetails;
