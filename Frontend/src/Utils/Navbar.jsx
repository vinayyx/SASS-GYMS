import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  // Sidebar animation
  useEffect(() => {
    if (open) {
      gsap.to(sidebarRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
    } else {
      gsap.to(sidebarRef.current, { x: "100%", duration: 0.5, ease: "power3.in" });
    }
  }, [open]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about-us" },
    { name: "Plans", path: "/plan" },
    { name: "Blogs", path: "/blog" },
    { name: "Contact", path: "/contact" },
    {
      name: "Onboarding",
      path: "/onboarding",
      subLinks: [{ name: "Renew Plan", path: "/renewplan" }], // Only desktop dropdown
    },
    { name: "Canteen", path: "/canteen" },
  ];

  const navLinksforPHone = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about-us" },
    { name: "Plans", path: "/plan" },
    { name: "Blogs", path: "/blog" },
    { name: "Contact", path: "/contact" },
    { name: "Onboarding", path: "/onboarding" },
    { name: "Renew Plan", path: "/renewplan" },
    { name: "Canteen", path: "/canteen" },
  ];

  return (
    <div className="w-full absolute top-0 h-[12vh] z-30 flex px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 justify-between items-center bg-black bg-opacity-10 text-white">
      {/* Logo */}
      <div className="h-full flex items-center w-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold italic text-white">
          FitMore
        </h1>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden min-[821px]:flex h-full items-center gap-4 lg:gap-3 xl:gap-6 w-auto justify-end relative">
        {navLinks.map((link) =>
          link.subLinks ? (
            <li
              key={link.name}
              className="relative"
              onMouseEnter={() => setDesktopDropdown(true)}
              onMouseLeave={() => setDesktopDropdown(false)}
            >
              <Link
                to={link.path}
                className={`py-1 px-3 sm:px-4 lg:px-6 xl:px-8 rounded-2xl cursor-pointer transition-all duration-300 ${
                  location.pathname === link.path ? "bg-red-700 text-white font-semibold" : "hover:text-gray-300"
                }`}
              >
                {link.name}
              </Link>

              {/* Desktop dropdown */}
              {desktopDropdown && (
                <div className="absolute top-full left-0 bg-black text-white mt-2 rounded-lg shadow-lg w-40 z-50">
                  {link.subLinks.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.path}
                      className="block px-4 py-2 hover:bg-red-700 rounded-md"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ) : (
            <li
              key={link.name}
              className={`py-1 px-3 sm:px-4 lg:px-6 xl:px-8 rounded-2xl cursor-pointer transition-all duration-300 ${
                location.pathname === link.path ? "bg-red-700 text-white font-semibold" : "hover:text-gray-300"
              }`}
            >
              <Link to={link.path}>{link.name}</Link>
            </li>
          )
        )}
      </ul>

      {/* Mobile Hamburger */}
      <div className="flex min-[821px]:hidden">
        {open ? (
          <X className="w-8 text-white h-8 cursor-pointer" onClick={() => setOpen(false)} />
        ) : (
          <Menu className="w-8 h-8 cursor-pointer" onClick={() => setOpen(true)} />
        )}
      </div>

      {/* Sidebar for mobile */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 w-64 h-full bg-black text-white z-50 p-6 transform translate-x-full"
      >
        <button className="absolute top-4 right-4" onClick={() => setOpen(false)}>
          <X className="w-7 h-7 cursor-pointer text-white" />
        </button>

        <ul className="flex flex-col gap-6 mt-16">
          {navLinksforPHone.map((link) => (
            <li
              key={link.name}
              onClick={() => setOpen(false)}
              className="py-2 px-4 rounded-xl cursor-pointer transition-all duration-300 hover:text-gray-300"
            >
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
