import { useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import gsap from "gsap";
import { useDashboardContext } from "../Context/Context";

export default function SalesChart() {
  const { MonthlySale } = useDashboardContext();

  const chartRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      chartRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div
      ref={chartRef}
      className="w-full h-[400px] bg-white rounded-2xl shadow-lg p-6"
    >
      <h2 className="text-gray-800 text-xl font-semibold mb-4">
        Sales Chart (Jan - Dec)
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={MonthlySale}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#374151" />
          <YAxis stroke="#374151" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              color: "#111827",
            }}
          />
          <Line
            type="monotone"
            dataKey="sale"
            stroke="#2563eb" // Blue line
            strokeWidth={3}
            dot={{ r: 5, fill: "#dc2626" }} // Red dots
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
