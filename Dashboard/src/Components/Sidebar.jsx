import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Home,
  Users,
  BarChart,
  CreditCard,
  FileText,
  Calendar,
  Sandwich,
  Mail,
} from "lucide-react";

function Sidebar({ sidebar, setSidebar }) {
  const navigate = useNavigate();

  const navitems = [
    { name: "Dashboard", path: "/api", Icon: Home },
    { name: "Member", path: "/api/member", Icon: Users },
    { name: "Sales", path: "/api/sales", Icon: BarChart },
    { name: "Expance", path: "/api/expance", Icon: CreditCard },
    { name: "Blog", path: "/api/blog", Icon: FileText },
    { name: "Plan", path: "/api/plan", Icon: Calendar },
    { name: "Canteen", path: "/api/canteen", Icon: Sandwich },
    { name: "Mails", path: "/api/mail", Icon: Mail },
  ];

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/gym/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("adminToken");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div
      className={`fixed top-[10vh] left-0 h-[90vh] w-60 bg-white shadow-lg z-40
      transform ${sidebar ? "translate-x-0" : "-translate-x-full "}
      transition-transform duration-300 ease-in-out sm:translate-x-0`}
    >
      {/* Header */}
      <div className="flex flex-col items-center w-full py-4 border-b border-zinc-200">
        <h1 className="text-lg font-semibold text-zinc-700">Admin</h1>
      </div>

      {/* Navigation */}
      <div className="mt-4  h-[60vh] overflow-auto px-3 flex flex-col gap-1">
        {navitems.map(({ name, path, Icon }) => (
          <NavLink
            key={path}
            to={path}
            end
            onClick={() => setSidebar(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md text-zinc-800 transition-all 
              duration-200 hover:bg-zinc-100 ${
                isActive ? "bg-zinc-200 font-semibold" : ""
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span>{name}</span>
          </NavLink>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 w-full border-t border-zinc-200 py-4 flex flex-col items-center gap-2">
        <NavLink
          to="/api/gymProfile"
          onClick={() => setSidebar(false)}
          className="flex items-center gap-2 text-zinc-900 hover:bg-zinc-100 p-2 rounded-md w-11/12 justify-center"
        >
          <Users className="h-5 w-5" />
          <span>Profile</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-zinc-900 hover:bg-zinc-100 p-2 rounded-md w-11/12 justify-center"
        >
          <CreditCard className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
