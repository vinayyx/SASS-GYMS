import React from "react";
import team1 from "../../assets/team-1.jpg";
import team2 from "../../assets/team-2.jpg";
import team3 from "../../assets/team-3.jpg";

function Team() {
  const teamMembers = [
    { name: "John Carter", image: team1 },
    { name: "Emily Davis", image: team2 },
    { name: "Michael Smith", image: team3 },
    { name: "Sophia Lee", image: team3 },
  ];

  return (

    <div  className="w-full  md:px-8" >

      <div className="w-full  mt-4 md:mt-10 bg-[#222222] text-white py-10 md:py-16 px-4 md:px-8 rounded-lg flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <div className="text-left">
          <h1 className="text-xl md:text-2xl font-medium text-white">Team Staff</h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase mt-2 md:mt-4">
            Team of Expert <br /> Coaches
          </h1>
        </div>
      </div>

      {/* Team Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="relative group overflow-hidden rounded-xl shadow-lg w-full aspect-[3/4] cursor-pointer"
          >
            {/* Image */}
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
            />

            {/* Black Transparent Overlay */}
            <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:opacity-40"></div>

            {/* Overlay Name */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
              <h2 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
                {member.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>

    </div>
    
  );
}

export default Team;
