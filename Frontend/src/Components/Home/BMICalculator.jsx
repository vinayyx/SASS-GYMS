import React, { useState } from "react";

function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activity, setActivity] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");

  const calculateBMI = () => {
    if (!height || !weight) return;

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) setStatus("UNDERWEIGHT");
    else if (bmiValue >= 18.5 && bmiValue <= 24.9) setStatus("HEALTHY");
    else if (bmiValue >= 25 && bmiValue <= 29.9) setStatus("OVERWEIGHT");
    else setStatus("OBESE");
  };

  const bmiRanges = [
    { range: "BELOW 18.5", label: "UNDERWEIGHT" },
    { range: "18.5 - 24.9", label: "HEALTHY" },
    { range: "25.0 - 29.9", label: "OVERWEIGHT" },
    { range: "30.0 AND ABOVE", label: "OBESE" },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-[#111111] text-white md:py-12 md:px-6 px-2 py-12 flex justify-center items-center">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SIDE - INPUT SECTION */}
        <div className="flex flex-col gap-6 bg-[#181818] p-8 rounded-2xl shadow-lg">
          <div>
            <h2 className="text-gray-400 text-sm uppercase tracking-widest">
              Body Mass Index
            </h2>
            <h1 className="text-4xl md:text-5xl font-bold text-red-500 uppercase mt-2 leading-snug">
              Calculate Your BMI
            </h1>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="p-3 rounded-lg bg-[#222222] placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition"
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="p-3 rounded-lg bg-[#222222] placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition"
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="p-3 rounded-lg bg-[#222222] placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="p-3 rounded-lg bg-[#222222] text-gray-300 focus:ring-2 focus:ring-red-500 outline-none transition"
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Activity Level */}
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="p-3 rounded-lg bg-[#222222] text-gray-300 focus:ring-2 focus:ring-red-500 outline-none transition"
          >
            <option value="">Select Activity Level</option>
            <option value="low">Low Activity</option>
            <option value="medium">Medium Activity</option>
            <option value="high">High Activity</option>
          </select>

          {/* Button */}
          <button
            onClick={calculateBMI}
            className="mt-4 bg-red-600 hover:bg-red-500 transition-all duration-300 text-white font-bold py-3 rounded-lg shadow-lg tracking-widest uppercase"
          >
            Calculate
          </button>

          {/* Result */}
          {bmi && (
            <div className="mt-6 text-lg">
              <p>
                Your BMI:{" "}
                <span className="font-bold text-white">{bmi}</span> –{" "}
                <span
                  className={`font-semibold ${
                    status === "UNDERWEIGHT"
                      ? "text-blue-400"
                      : status === "HEALTHY"
                      ? "text-green-400"
                      : status === "OVERWEIGHT"
                      ? "text-yellow-400"
                      : "text-red-500"
                  }`}
                >
                  {status}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* RIGHT SIDE - BMI CHART */}
        <div className="bg-[#181818] rounded-2xl shadow-lg p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">
              BMI Chart
            </h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-left">
                  <th className="p-3 text-gray-400 uppercase text-sm">BMI</th>
                  <th className="p-3 text-gray-400 uppercase text-sm">
                    Weight Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {bmiRanges.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-800 transition-colors ${
                      status === row.label ? "bg-red-600/40" : "hover:bg-[#222222]"
                    }`}
                  >
                    <td className="p-3">{row.range}</td>
                    <td className="p-3 font-semibold">{row.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-gray-400 text-sm leading-relaxed">
            <span className="font-bold text-white">BMR</span> - Basal Metabolic
            Rate,{" "}
            <span className="font-bold text-white">BMI</span> - Body Mass Index.
            Use this chart to assess your general health condition based on your
            height and weight.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BMICalculator;
