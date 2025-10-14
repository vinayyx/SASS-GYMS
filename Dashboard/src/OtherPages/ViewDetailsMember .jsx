import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDashboardContext } from "../Context/Context";


const ViewDetailsMember = () => {
    const token = localStorage.getItem("adminToken"); // get token from localStorage

  const [loading, setLoading] = useState(true);
  const [showAllPlans, setShowAllPlans] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const Navigate = useNavigate();

  const location = useLocation();
  const { SelectedUser: memberData } = location.state || {};

  const { members, setMembers, updateMember, deleteMember } =
    useDashboardContext();


  useEffect(() => {
    if (memberData) {
      setMembers(memberData);
      setEditForm({
        fullName: memberData.fullName,
        fatherName: memberData.fatherName,
        city: memberData.city,
        address: memberData.address,
        alternativeNumber: memberData.alternativeNumber,
        aadhaarNumber: memberData.aadhaarNumber,
        dateOfBirth: memberData.dateOfBirth,
        gender: memberData.gender,
        occupation: memberData.occupation,
        medicalHistory: memberData.medicalHistory,
        bloodGroup: memberData.bloodGroup,
        referral: memberData.referral,
        contactNumber: memberData.contactNumber,
        email: memberData.email,
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [memberData]);

  if (loading)
    return (
      <p className="text-center mt-10 text-lg">Loading member details...</p>
    );
  if (!members)
    return <p className="text-center mt-10 text-lg">No member found.</p>;

  const latestPlan = members.plan[members.plan.length - 1];
  const previousPlans = members.plan.slice(0, -1).reverse();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditSave = async () => {
    try {
      await updateMember(members._id, editForm); // call context update
      setIsEditing(false);
      toast.success("Member updated successfully!");
    } catch (err) {
      toast.error("Failed to update member.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteMember(members._id); // call context delete
      toast.success("Member deleted successfully!");
      Navigate("/api/memberdetails");
    } catch (err) {
      toast.error("Failed to delete member.");
    }
  };

  return (
    <div className="h-[80vh] py-6 px-4 md:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Member Header */}
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 bg-white rounded-3xl p-6 md:p-8 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
            <img
              src={members.livePhoto}
              alt="Member"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border shadow flex-shrink-0"
            />
            <div className="flex-1 text-center sm:text-left space-y-2">
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={editForm.fullName}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full md:w-auto"
                />
              ) : (
                <h2 className="text-2xl sm:text-3xl font-bold">
                  {members.fullName}
                </h2>
              )}
              <p className="text-gray-700 text-sm md:text-lg">
                Member ID: {members.memberId}
              </p>
              {isEditing ? (
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-1">
                  <input
                    type="text"
                    name="contactNumber"
                    value={editForm.contactNumber}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full md:w-auto"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    disabled
                    className="border px-2 py-1 rounded w-full md:w-auto bg-gray-100 cursor-not-allowed"
                  />
                </div>
              ) : (
                <>
                  <p className="text-gray-600 text-sm md:text-base">
                    Email: {members.email}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base">
                    Contact: {members.contactNumber}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            {isEditing ? (
              <>
                <button
                  onClick={handleEditSave}
                  className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition font-semibold text-sm md:text-base"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-gray-400 text-white hover:bg-gray-500 transition font-semibold text-sm md:text-base"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-xl bg-yellow-500 text-white hover:bg-yellow-600 transition font-semibold text-sm md:text-base"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition font-semibold text-sm md:text-base"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 border-b pb-2">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-sm md:text-base">
            {Object.entries(editForm).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="font-semibold">
                  {key.replace(/([A-Z])/g, " $1")}:
                </span>
                {isEditing && key !== "dateOfBirth" ? (
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : key === "dateOfBirth" ? (
                  <span>{new Date(value).toLocaleDateString()}</span>
                ) : (
                  <span>{value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="space-y-6">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">Plans</h3>

          {/* Latest Plan */}
          <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6">
            <h4 className="text-lg md:text-xl font-bold mb-3">Active Plan</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 text-sm md:text-base bg-gray-50 p-3 md:p-4 rounded-xl shadow-sm">
              <div>
                <p>
                  <strong>Plan:</strong> {latestPlan.Plan.type}
                </p>
                <p>
                  <strong>Paid:</strong> ₹{latestPlan.paidAmount}
                </p>
                <p>
                  <strong>Full Paid:</strong>{" "}
                  {latestPlan.isFullPaid ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(latestPlan.startedDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Expire Date:</strong>{" "}
                  {new Date(latestPlan.expireDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Renewed On:</strong>{" "}
                  {new Date(latestPlan.renewedOn).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="font-semibold underline mb-1 md:mb-2">
                  Payment Details:
                </p>
                <p>
                  <strong>Method:</strong> {latestPlan.method || "N/A"}
                </p>
                <p>
                  <strong>Transaction ID:</strong>{" "}
                  {latestPlan.transactionId || "N/A"}
                </p>
                <p>
                  <strong>Order ID:</strong>{" "}
                  {latestPlan.razorpayOrderId || "N/A"}
                </p>
                <p>
                  <strong>Payment ID:</strong>{" "}
                  {latestPlan.razorpayPaymentId || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Previous Plans */}
          {previousPlans.length > 0 && (
            <div>
              <button
                onClick={() => setShowAllPlans(!showAllPlans)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition text-sm md:text-base font-semibold mb-3"
              >
                {showAllPlans ? "Hide Previous Plans" : "View Previous Plans"}
              </button>

              {showAllPlans &&
                previousPlans.map((p, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl shadow-lg p-4 md:p-6 mb-4"
                  >
                    <h4 className="text-lg md:text-xl font-bold mb-2">
                      {p.Plan.type} ({p.Plan.duration})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 text-sm md:text-base bg-gray-50 p-3 md:p-4 rounded-xl shadow-sm">
                      <div>
                        <p>
                          <strong>Paid:</strong> ₹{p.paidAmount}
                        </p>
                        <p>
                          <strong>Full Paid:</strong>{" "}
                          {p.isFullPaid ? "Yes" : "No"}
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>Start Date:</strong>{" "}
                          {new Date(p.startedDate).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Expire Date:</strong>{" "}
                          {new Date(p.expireDate).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Renewed On:</strong>{" "}
                          {new Date(p.renewedOn).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold underline mb-1 md:mb-2">
                          Payment Details:
                        </p>
                        <p>
                          <strong>Method:</strong> {p.method || "N/A"}
                        </p>
                        <p>
                          <strong>Transaction ID:</strong>{" "}
                          {p.transactionId || "N/A"}
                        </p>
                        <p>
                          <strong>Order ID:</strong>{" "}
                          {p.razorpayOrderId || "N/A"}
                        </p>
                        <p>
                          <strong>Payment ID:</strong>{" "}
                          {p.razorpayPaymentId || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsMember;
