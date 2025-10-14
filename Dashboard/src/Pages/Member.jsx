import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Users } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDashboardContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";

function Member() {
  const Navigate = useNavigate();

  const { TotalMember, OnboaringOnLast7Days, Attendance, AttendanceRushData } =
    useDashboardContext();

  const [attendance, setAttendance] = useState([]);
  const [gymInfo, setGymInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch gym info using Axios
  useEffect(() => {
    const fetchGym = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/gym/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setGymInfo(res.data.gym);
        }
      } catch (err) {
        console.error("Error fetching gym info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGym();
  }, []);

  // 🔹 Format Attendance Data
  useEffect(() => {
    if (Attendance && Attendance.length > 0) {
      const formatted = Attendance.map((item) => {
        const dateSource = item.checkInTime || item.checkOutTime;
        const date = dateSource
          ? new Date(dateSource).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "-";

        return {
          id: item.member?.memberId || "N/A",
          name: item.member?.fullName || "Unknown",
          date,
          inTime: item.checkInTime
            ? new Date(item.checkInTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-",
          outTime: item.checkOutTime
            ? new Date(item.checkOutTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-",
        };
      });
      setAttendance(formatted);
    }
  }, [Attendance]);

  // 🔹 Cards Data
  const cards = [
    {
      label: "Add Member",
      value: TotalMember,
      color: "blue",
      icon: <Plus size={28} className="text-blue-500" />,
      link: "/memberdetails",
    },
    {
      label: "Onboarded (Last 7 Days)",
      value: OnboaringOnLast7Days.length,
      color: "yellow",
      icon: <Users size={28} className="text-yellow-500" />,
      link: "/last7days",
    },
  ];

  const isVerified = gymInfo?.isVerified;

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-gray-600">Loading...</p>
      </div>
    );

  return (
    <div className="w-full min-h-[80vh] py-6 md:p-6">
      {/* 🔹 Cards Section */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {cards.map((card, i) => (
          <div
            onClick={() => card.link && Navigate(card.link)}
            key={i}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex items-center justify-between group cursor-pointer"
          >
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <h1 className="text-4xl font-bold text-gray-800 mt-2">
                {card.value}
              </h1>
            </div>
            <div
              className={`p-5 rounded-full bg-${card.color}-100 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}
            >
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Conditional Render: Premium Only Section */}
      {isVerified ? (
        <>
          {/* Attendance Table */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Attendance
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th className="p-3">Emp ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">In Time</th>
                    <th className="p-3">Out Time</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((att, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-700">{att.id}</td>
                      <td className="p-3">{att.name}</td>
                      <td className="p-3 text-gray-600">{att.date}</td>
                      <td className="p-3 text-green-600 font-semibold">
                        {att.inTime}
                      </td>
                      <td className="p-3 text-red-600 font-semibold">
                        {att.outTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rush Timing Graph */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Gym Rush Timing
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={AttendanceRushData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="members" fill="#2563eb" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        // 🔹 Show Message for Non-Verified Gym
        <div className="flex flex-col items-center justify-center h-[60vh] bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Premium Feature Locked
          </h2>
          <p className="text-gray-600 text-center max-w-md mb-6">
            Attendance Tracking and Rush Timing analytics are available only for
            <span className="font-semibold text-blue-600"> Premium Plan </span>
            users. Upgrade now to access these insights and manage your gym more efficiently.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300">
            Upgrade to Premium
          </button>
        </div>
      )}
    </div>
  );
}

export default Member;
