import React, { useState } from "react";
import { Link, Links } from "react-router-dom";
import sass from "../../assets/sass.png";

const Hero = () => {

  return (
    <div className="font-poppins text-white bg-black min-h-screen">

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 md:px-16 lg:px-24 xl:px-32 pt-32 pb-20">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-600 blur-[250px] rounded-full -z-10"></div>

        <h1 className="text-5xl md:text-6xl font-extrabold max-w-3xl">
          Gym Management, Simplified
        </h1>
        <p className="text-slate-300 text-lg mt-4 max-w-xl">
          Automate memberships, track plans & payments, send bulk emails, and
          monitor your gym’s growth with ease.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Link to="/login">
            <button className="bg-purple-600 hover:bg-purple-700 rounded-full px-8 py-3 font-semibold transition-all">
              Get Started
            </button>
          </Link>
          <button className="border border-purple-500 hover:bg-purple-950/50 rounded-full px-8 py-3 flex items-center gap-2 justify-center transition-all">
            Watch Demo
          </button>
        </div>

        <img
          src={sass}
          className="w-full max-w-4xl rounded-xl mt-16"
          alt="Gym management showcase"
        />
      </section>
    </div>
  );
};

export default Hero;
