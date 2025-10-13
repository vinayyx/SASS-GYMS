import React, { useState } from "react";
import { Link } from "react-router-dom";
import sass from "../../assets/sass.png"

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-poppins text-white bg-black min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur bg-black/50">
        <a href="#" className="text-2xl font-bold text-purple-500">
          XynTech
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-white text-sm">
          <a href="#features" className="hover:text-purple-400 transition">
            Features
          </a>
          <a href="#plans" className="hover:text-purple-400 transition">
            Plans
          </a>
          <a href="#analytics" className="hover:text-purple-400 transition">
            Analytics
          </a>
          <a href="#contact" className="hover:text-purple-400 transition">
            Contact
          </a>
        </div>

        <Link to="/login">
          <button className="hidden md:block px-6 py-2.5 bg-purple-600 hover:bg-purple-700 active:scale-95 transition-all rounded-full font-semibold">
            Start Free Trial
          </button>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden active:scale-90 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Nav */}
      <div
        className={`fixed inset-0 z-[100] bg-black/90 text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <a href="#features" onClick={() => setMenuOpen(false)}>
          Features
        </a>
        <a href="#plans" onClick={() => setMenuOpen(false)}>
          Plans
        </a>
        <a href="#analytics" onClick={() => setMenuOpen(false)}>
          Analytics
        </a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>
          Contact
        </a>
        <button
          onClick={() => setMenuOpen(false)}
          className="bg-purple-600 hover:bg-purple-700 p-2 rounded-full flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

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
