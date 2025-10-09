import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ViewDetailsSale = () => {
  const [members, setMembers] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const { SelectedUser: memberData } = location.state || {};

  useEffect(() => {
    if (memberData) {
      setMembers(memberData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [memberData]);

  console.log(memberData);

  if (loading)
    return (
      <p className="text-center mt-10 text-lg">Loading member details...</p>
    );
  if (!members)
    return <p className="text-center mt-10 text-lg">No member found.</p>;

  return (
    <div className="h-[80vh] py-6  md:p-6 ">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Member Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 bg-white rounded-3xl p-8 shadow-lg">
          <img
            src={members.livePhoto}
            alt="Member"
            className="w-32 h-32 rounded-full border shadow"
          />
          <div className="text-center sm:text-left space-y-2">
            <h2 className="text-3xl font-bold">{members.fullName}</h2>
            <p className="text-gray-700 text-lg">
              Member ID: {members.memberId}
            </p>
            <p className="text-gray-600 text-base">Email: {members.email}</p>
            <p className="text-gray-600 text-base">
              Contact: {members.contactNumber}
            </p>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-6 border-b pb-2">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base">
            <p>
              <strong>City:</strong> {members.city}
            </p>
            <p>
              <strong>PlanName:</strong> {members.planName}
            </p>
            <p>
              <strong>Plan Duration:</strong> {members.planDuration}
            </p>
            <p>
              <strong>paid Amount:</strong> {members.paidAmount}
            </p>
            <p>
              <strong>startedDate:</strong>{" "}
              {new Date(members.startedDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Expire Date:</strong>{" "}
              {new Date(members.expireDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Admission Date:</strong>{" "}
              {new Date(members.admissionDate).toLocaleDateString()}
            </p>
            <p>
              <strong>PlanPrice:</strong> {members.planPrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsSale;
