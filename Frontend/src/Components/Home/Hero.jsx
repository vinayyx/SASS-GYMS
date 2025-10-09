import React from "react";
import hero from "../../assets/hero.jpg";
import {useNavigate} from "react-router-dom"

function Hero() {

  const Navigate = useNavigate()
  return (
    <div className="   relative w-full h-[50vh] md:h-[100vh] sm:h-[50vh]">
      {/* Background Image */}
      <img
        className="w-full h-full object-cover"
        src={hero}
        alt="Hero"
      />

      {/* Overlay */}
      <div className="absolute top-0 right-0 w-full h-full bg-black/50" />

      {/* Content */}
      <div className="absolute top-0 w-full h-full flex flex-col justify-center items-center text-center text-white px-6
                      md:items-end md:text-left md:px-16">
        <div>
          <h1 className="text-2xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="text-white">The Mind is Primary</span>
          </h1>
          <p className="text-sm md:text-lg mb-6 max-w-[600px]">
            Push your limits and achieve your fitness goals with our expert <br />
            trainers and world-class facilities.
          </p>

          <button onClick={()=>Navigate("/onboarding")} className="bg-red-700 hover:bg-red-600 transition-all px-6 py-3 rounded-xl font-semibold">
            Join us Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
