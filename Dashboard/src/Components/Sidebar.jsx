import { Home, Users, BarChart, CreditCard, FileText, Calendar, Sandwich } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Sidebar({ sidebar, setSidebar }) {
    const navigate = useNavigate();

  const navitems = [
    { name: 'Dashboard', path: '/api', Icon: Home },
    { name: 'Member', path: '/api/member', Icon: Users },
    { name: 'Sales', path: '/api/sales', Icon: BarChart },
    { name: 'Expance', path: '/api/expance', Icon: CreditCard },
    { name: 'Blog', path: '/api/blog', Icon: FileText },
    { name: 'Plan', path: '/api/plan', Icon: Calendar },
    { name: 'Canteen', path: '/api/canteen', Icon: Sandwich },

  ];

    const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/gym/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("adminToken"); // agar token store ho
      navigate("/login"); // redirect to login page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div
      className={`
        h-[86vh] w-60 bg-white shadow-md z-50
        sm:relative sm:translate-x-0
        fixed mt-6 right-0
        transform ${sidebar ? 'translate-x-0' : 'translate-x-full'}
        transition-transform duration-300 ease-in-out
      `}
    >
      <div className="w-full flex flex-col items-center px-4">
        {/* Sidebar Header */}
        <h1 className="mt-2 text-lg font-semibold text-center text-zinc-700">
          Admin
        </h1>

        {/* Navigation Items */}
        <div className="mt-6 w-full px-2">
          {navitems.map(({ name, path, Icon }) => (
            <NavLink
              key={path}
              to={path}
              end
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 text-zinc-900 rounded-md hover:bg-zinc-100 transition-all duration-200
                 ${isActive ? 'bg-zinc-200 font-semibold' : ''}`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom Section (Profile / Logout) */}
      <div className='border-t border-zinc-200 w-full absolute bottom-0 flex flex-col items-center py-4 gap-2'>
        <NavLink 
          to="/api/gymProfile"
          className='flex items-center gap-2 text-zinc-900 hover:bg-zinc-100 p-2 rounded-md w-11/12 justify-center'
        >
          <Users className='h-5 w-5' />
          <span>Profile</span>
        </NavLink>

        <NavLink 
           onClick={()=>handleLogout()}
          className='flex items-center gap-2 text-zinc-900 hover:bg-zinc-100 p-2 rounded-md w-11/12 justify-center'
        >
          <CreditCard className='h-5 w-5' />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
