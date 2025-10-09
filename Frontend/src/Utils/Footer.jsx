import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#111111] text-gray-400 px-6 md:px-16 lg:px-24 xl:px-32 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Product Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Product</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-red-500 transition">Home</a></li>
            <li><a href="/" className="hover:text-red-500 transition">About</a></li>
            <li><a href="/" className="hover:text-red-500 transition">Plans</a></li>
            <li><a href="/" className="hover:text-red-500 transition">Onboarding</a></li>
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Resources</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-red-500 transition">Fit More</a></li>
            <li><a href="/" className="hover:text-red-500 transition">Blogs</a></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Legal</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-red-500 transition">Privacy</a></li>
            <li><a href="/" className="hover:text-red-500 transition">Terms</a></li>
          </ul>
        </div>

        {/* About + Social */}
        <div className="flex flex-col items-start sm:items-start lg:items-end text-left sm:text-left lg:text-right">
          <p className="text-gray-400 max-w-[260px] mb-4">
            Helping every member achieve their fitness goals, no matter where they start.
          </p>

          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/fit_more_gym_/" className="hover:text-red-500 transition text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37m1.5-4.87h.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            {/* Add more social icons here if needed */}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        <p>© {currentYear} Fit And More Gym. All rights reserved.</p>
      </div>
    </footer>
  );
}
