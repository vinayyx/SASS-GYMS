import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Hero = () => {
  const [memberId, setMemberId] = useState("");
  const [status, setStatus] = useState("IN"); // default IN
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/attendance/markAttendance`,
        {
          memberId,
          status,
        }
      );

      toast.success(res.data.message || "Attendance marked successfully!");
      setMemberId(""); // clear input after success
      setStatus("IN");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-black shadow-lg rounded-xl p-8 w-full max-w-md border border-red-600">
        <h2 className="text-2xl font-bold text-center mb-6 text-red-500">
          Mark Your Attendance
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Member ID */}
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Member ID
            </label>
            <input
              type="text"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              placeholder="Enter your Member ID"
              className="w-full px-4 py-2 border border-red-600 bg-black text-white rounded-lg focus:ring focus:ring-red-400 focus:outline-none"
              required
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-red-600 bg-black text-white rounded-lg focus:ring focus:ring-red-400 focus:outline-none"
            >
              <option value="IN">IN</option>
              <option value="OUT">OUT</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {loading ? "Submitting..." : "Submit Attendance"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
