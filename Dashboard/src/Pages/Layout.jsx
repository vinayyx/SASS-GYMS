import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { BanknoteArrowDown, Menu, X } from "lucide-react";

function Layout() {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col bg-zinc-50 overflow-hidden">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full h-[10vh] bg-white shadow-md z-50 flex items-center justify-between px-[5vw]">
        <h1
          onClick={() => navigate("/api")}
          className="text-2xl font-bold italic text-zinc-700 cursor-pointer"
        >
          Xyntech
        </h1>

        <div className="flex items-center gap-6">
          <BanknoteArrowDown
            onClick={() => navigate("/api/cashrequest")}
            className="h-6 w-6 text-zinc-700 cursor-pointer"
          />

          {/* Mobile Menu Toggle */}
          <div className="sm:hidden">
            {sidebar ? (
              <X
                onClick={() => setSidebar(false)}
                className="h-7 w-7 cursor-pointer"
              />
            ) : (
              <Menu
                onClick={() => setSidebar(true)}
                className="h-7 w-7 cursor-pointer"
              />
            )}
          </div>
        </div>
      </nav>

      {/* Page Body */}
      <div className="flex flex-1 pt-[10vh]">
        {/* Sidebar (fixed left) */}
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        {/* Main Content */}
        <main
          className="flex-1 h-[90vh] overflow-y-auto px-6 py-6
          sm:ml-60 transition-all duration-300"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
