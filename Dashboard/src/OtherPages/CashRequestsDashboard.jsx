import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CashRequestsDashboard = () => {
  const [renewalRequests, setRenewalRequests] = useState([]);
  const [membershipRequests, setMembershipRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const renewalRef = useRef([]);
  const membershipRef = useRef([]);

  // Fetch Renewal Cash Requests
  const fetchRenewalRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cash/all`
      );
      const newData = res.data.requests || [];
      if (JSON.stringify(newData) !== JSON.stringify(renewalRef.current)) {
        setRenewalRequests(newData);
        renewalRef.current = newData;
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch renewal requests");
    }
  };

  // Fetch Membership Cash Requests
  const fetchMembershipRequests = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/cashregister/all`
      );
      const newData = res.data.data || [];
      if (JSON.stringify(newData) !== JSON.stringify(membershipRef.current)) {
        setMembershipRequests(newData);
        membershipRef.current = newData;
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch membership requests");
    }
  };

  useEffect(() => {
    fetchRenewalRequests();
    fetchMembershipRequests();
    const interval = setInterval(() => {
      fetchRenewalRequests();
      fetchMembershipRequests();
    }, 5000);

    setLoading(false);
    return () => clearInterval(interval);
  }, []);

  // Handle actions for Renewal Requests
  const handleRenewalAction = async (id, type) => {
    try {
      const endpoint =
        type === "approve"
          ? `${import.meta.env.VITE_BACKEND_URL}/api/cash/approve/${id}`
          : type === "reject"
          ? `${import.meta.env.VITE_BACKEND_URL}/api/cash/reject/${id}`
          : `${import.meta.env.VITE_BACKEND_URL}/api/cash/delete/${id}`;
      const method = type === "delete" ? axios.delete : axios.put;
      const res = await method(endpoint);
      if (res.data.success) {
        toast.success(res.data.message);
        fetchRenewalRequests();
      }
    } catch (err) {
      console.error(err);
      toast.error("Action failed");
    }
  };

  // Handle actions for Membership Requests
  const handleMembershipAction = async (id, type) => {
    try {
      let endpoint = "";
      let method = "put";

      if (type === "approve") {
        endpoint = `http://localhost:5000/api/cashregister/approve/${id}`;
      } else if (type === "reject") {
        endpoint = `http://localhost:5000/api/cashregister/reject/${id}`;
      } else {
        endpoint = `http://localhost:5000/api/cashregister/delete/${id}`;
        method = "delete";
      }

      const res =
        method === "put" ? await axios.put(endpoint) : await axios.delete(endpoint);

      if (res.data.success) {
        toast.success(res.data.message || "Action successful");
        fetchMembershipRequests();
      }
    } catch (err) {
      console.error(err);
      toast.error("Action failed");
    }
  };

  const renderRequestCard = (req, type) => {
    const isMembership = type === "membership";
    const planInfo = isMembership ? req.plan[0]?.Plan : req.planId; // populated Plan

    return (
      <div
        key={req._id}
        className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col md:flex-row md:justify-between gap-4"
      >
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          {/* Member Info */}
          <div>
            <p className="text-gray-700">
              <span className="font-semibold">Member:</span>{" "}
              {isMembership ? req.fullName : req.memberId?.fullName || req.Name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span>{" "}
              {isMembership ? req.email : req.memberId?.email || req?.email}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Contact:</span>{" "}
              {isMembership
                ? req.contactNumber
                : req.memberId?.contactNumber || req?.contact}
            </p>
          </div>

          {/* Plan Info */}
          <div>
            <p className="text-gray-700">
              <span className="font-semibold">Plan:</span>{" "}
              {planInfo?.type || "N/A"} ({planInfo?.duration || "N/A"}) ₹
              {isMembership ? req.plan[0]?.paidAmount : req.price}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`font-medium ${
                  req.status.toLowerCase() === "pending"
                    ? "text-blue-600"
                    : req.status.toLowerCase() === "completed"
                    ? "text-green-600"
                    : req.status.toLowerCase() === "cancelled"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {req.status}
              </span>
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Requested At:</span>{" "}
              {new Date(isMembership ? req.createdAt : req.requestedAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-3 md:mt-0">
          <button
            onClick={() =>
              isMembership
                ? handleMembershipAction(req._id, "approve")
                : handleRenewalAction(req._id, "approve")
            }
            disabled={req.status.toLowerCase() !== "pending"}
            className={`px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition ${
              req.status.toLowerCase() !== "pending"
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Approve
          </button>
          <button
            onClick={() =>
              isMembership
                ? handleMembershipAction(req._id, "reject")
                : handleRenewalAction(req._id, "reject")
            }
            disabled={req.status.toLowerCase() !== "pending"}
            className={`px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition ${
              req.status.toLowerCase() !== "pending"
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Reject
          </button>
          <button
            onClick={() =>
              isMembership
                ? handleMembershipAction(req._id, "delete")
                : handleRenewalAction(req._id, "delete")
            }
            className="px-4 py-2 rounded-lg bg-gray-400 text-white font-semibold hover:bg-gray-500 transition"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[80vh] p-4 md:p-6 overflow-y-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Cash Requests Dashboard
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading requests...</p>
      ) : renewalRequests.length === 0 && membershipRequests.length === 0 ? (
        <p className="text-center text-gray-500">No requests found</p>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Membership Requests */}
          {membershipRequests.length > 0 && (
            <>
              <h3 className="text-xl font-semibold text-gray-700">
                Membership Cash Requests
              </h3>
              {membershipRequests.map((req) => renderRequestCard(req, "membership"))}
            </>
          )}

          {/* Renewal Requests */}
          {renewalRequests.length > 0 && (
            <>
              <h3 className="text-xl font-semibold text-gray-700">
                Renewal Cash Requests
              </h3>
              {renewalRequests.map((req) => renderRequestCard(req, "renewal"))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CashRequestsDashboard;
