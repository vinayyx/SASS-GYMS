import React, { useEffect, useState } from "react";
import { Plus, Users, UserCheck, UserX } from "lucide-react";
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

  // 📊 Context se data le rhe hain
  const { TotalMember, OnboaringOnLast7Days, Attendance, AttendanceRushData } =
    useDashboardContext();

 

  // 🔹 Cards ke liye data
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
   /* {
      label: "Active Members",
      value: activeMembers,
      color: "green",
      icon: <UserCheck size={28} className="text-green-500" />,
    },
    {
      label: "Inactive Members",
      value: inactiveMembers,
      color: "red",
      icon: <UserX size={28} className="text-red-500" />,
    }, */
  ];

  // Attendance state
  const [attendance, setAttendance] = useState([]);

  // 🔹 Attendance ko format karna
  useEffect(() => {
    if (Attendance && Attendance.length > 0) {
      const formatted = Attendance.map((item) => {
        // Date check-in time se lenge (agar nahi hai toh checkout se)
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

  // Dummy Rush Timing Chart data
  const rushData = [
    { time: "6-7 AM", members: 15 },
    { time: "7-8 AM", members: 40 },
    { time: "8-9 AM", members: 55 },
    { time: "9-10 AM", members: 30 },
    { time: "10-11 AM", members: 20 },
    { time: "5-6 PM", members: 35 },
    { time: "6-7 PM", members: 50 },
    { time: "7-8 PM", members: 60 },
  ];

  return (
    <div className="w-full h-[80vh] py-6 md:p-6">
      {/* 🔹 Cards Grid Section */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {cards.map((card, i) => (
          <div
            onClick={() => card.link && Navigate(card.link)}
            key={i}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex items-center justify-between group cursor-pointer"
          >
            {/* Card Text */}
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <h1 className="text-4xl font-bold text-gray-800 mt-2">
                {card.value}
              </h1>
            </div>
            {/* Card Icon */}
            <div
              className={`p-5 rounded-full bg-${card.color}-100 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}
            >
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Attendance Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Attendance</h2>
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

      {/* 🔹 Rush Timing Graph */}
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
    </div>
  );
}

export default Member;
