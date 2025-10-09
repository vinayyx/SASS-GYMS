import React from "react";
import faiz from "../../assets/faiz.jpeg";
import danis from "../../assets/danish.jpeg";


const Achievements = () => {
  const achievements = [
    {
      title: "Faiz",
      description: "Awarded for excellence in training and community impact.",
      image: faiz,
    },
    {
      title: "danish",
      description: "Awarded for excellence in training and community impact.",
      image: danis,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-[#1a0000] text-white py-20 px-6 relative overflow-hidden">
      {/* HEADER */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-red-500 uppercase tracking-widest font-semibold mb-3 text-sm md:text-base">
          Celebrating Excellence
        </h2>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-wide mb-6">
          Meet with Our Team
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base"></p>
      </div>

      {/* TROPHY GALLERY */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 max-w-6xl mx-auto">
        {achievements.map((item, i) => (
          <div
            key={i}
            className="relative group transition-transform duration-500 hover:scale-105"
          >
            {/* Trophy Image */}
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-md">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500"></div>
            </div>

            {/* Title + Desc */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 backdrop-blur-sm bg-black/50 rounded-b-3xl">
              <h3 className="text-xl font-bold text-red-400 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm">{item.description}</p>
            </div>

            {/* Soft Glow Ring */}
            <div className="absolute inset-0 rounded-3xl border border-red-700/20 opacity-0 group-hover:opacity-40 transition-all duration-500"></div>
          </div>
        ))}
      </div>

      {/* FOOTNOTE */}
      <div className="text-center mt-20 text-gray-500 text-sm relative z-10">
        “Success is earned, not given — every award is proof of our members’
        hard work.”
      </div>
    </div>
  );
};

export default Achievements;
