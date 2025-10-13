import React from "react";

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-gray-300 bg-[#0f172a] pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
          {/* Logo & About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="/">
              <svg
                width="157"
                height="40"
                viewBox="0 0 157 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.75 11.3 15.5 15.184 22.25 11.3M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754M2.405 15.408 15.5 22.954l13.095-7.546M15.5 38V22.939M29 28.915V16.962a2.98 2.98 0 0 0-1.5-2.585L17 8.4a3.01 3.01 0 0 0-3 0L3.5 14.377A3 3 0 0 0 2 16.962v11.953A2.98 2.98 0 0 0 3.5 31.5L14 37.477a3.01 3.01 0 0 0 3 0L27.5 31.5a3 3 0 0 0 1.5-2.585"
                  stroke="#7c3aed"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <p className="text-gray-400 text-sm mt-6">
              Xyntech is a modern Gym Management solution offering website and
              app integrations, secure data management, and 24x7 support for gym owners.
            </p>
          </div>

          {/* Company Links */}
          <div className="flex flex-col lg:items-center lg:justify-center">
            <div className="flex flex-col text-sm space-y-2.5">
              <h2 className="font-semibold mb-5 text-white">Company</h2>
              <a className="hover:text-purple-400 transition" href="#">About us</a>
              <a className="hover:text-purple-400 transition" href="#">
                Careers<span className="text-xs text-black bg-purple-500 rounded-md ml-2 px-2 py-1">We’re hiring!</span>
              </a>
              <a className="hover:text-purple-400 transition" href="#">Contact us</a>
              <a className="hover:text-purple-400 transition" href="#">Privacy policy</a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="font-semibold text-white mb-5">Subscribe to our newsletter</h2>
            <div className="text-sm space-y-6 max-w-sm">
              <p>Get the latest updates and resources from Xyntech delivered weekly.</p>
              <div className="flex items-center justify-center gap-2 p-2 rounded-md bg-gray-800">
                <input
                  className="focus:ring-2 ring-purple-500 outline-none w-full max-w-64 py-2 rounded px-2 bg-gray-900 text-white placeholder-gray-400"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="bg-purple-600 px-4 py-2 text-white rounded hover:bg-purple-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="py-4 text-center border-t mt-10 border-gray-700 text-gray-500">
          Copyright 2025 © <a href="/">Xyntech</a>. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}
