import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function HomeNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-purple-500 font-semibold transition"
      : "text-white hover:text-purple-400 transition";

  return (
    <div className="font-poppins text-white bg-black">
      <nav className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur bg-black/50">
        <NavLink to="/" className="text-2xl font-bold text-purple-500">
          XynTech
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/feature" className={linkClass}>
            Feature
          </NavLink>
          <NavLink to="/pricing" className={linkClass}>
            Plan
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </div>

        <NavLink to="/login">
          <button className="hidden md:block px-6 py-2.5 bg-purple-600 hover:bg-purple-700 active:scale-95 transition-all rounded-full font-semibold">
            Start Free Trial
          </button>
        </NavLink>

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
        <NavLink to="/" className={linkClass} onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/feature" className={linkClass} onClick={() => setMenuOpen(false)}>
          Feature
        </NavLink>
        <NavLink to="/pricing" className={linkClass} onClick={() => setMenuOpen(false)}>
          Pricing
        </NavLink>
        <NavLink to="/contact" className={linkClass} onClick={() => setMenuOpen(false)}>
          Contact
        </NavLink>

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
    </div>
  );
}

export default HomeNavbar;
