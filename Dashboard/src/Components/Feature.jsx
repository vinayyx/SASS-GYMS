import React from "react";
import { useNavigate } from "react-router-dom";

export default function Feature() {
  const accent = "#7E22CE";

  const Navigate = useNavigate()

  return (
    <div
      id="features"
      className="min-h-screen bg-black text-gray-200 px-4 sm:px-8 md:px-16 pt-28 pb-16"
    >
      {/* HERO */}
      <header className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">
            All-in-one Gym Management —{" "}
            <span style={{ color: accent }}>Powerful</span>,{" "}
            <span style={{ color: accent }}>Secure</span>,{" "}
            <span style={{ color: accent }}>Affordable</span>
          </h1>

          <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
            Manage members, plans, payments, attendance and marketing — a single
            control panel for your gym. Free core features + Premium plan for
            website, hosting, domain and advanced automation.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a 
             
              onClick={()=>Navigate("/login")} 
              className="px-5 py-3 cursor-pointer rounded-md font-semibold"
              style={{ background: accent, color: "#fff" }}
            >
              Start Free
            </a>
            <a
              onClick={()=>Navigate("/pricing")} 
              className="px-5 py-3 cursor-pointer rounded-md bg-gray-800 text-white border border-gray-700"
            >
              See Pricing
            </a>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-400">
            <div>✔️ Free core features</div>
            <div>🔒 Secure payments</div>
            <div>⚡ Auto renewals & emails</div>
            <div>💳 Card / UPI support</div>
          </div>
        </div>

        <div className="w-full lg:w-96">
          <div className="bg-[#0b0b0b] border border-gray-800 p-5 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-white">
              Quick Feature Snapshot
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-300">
              <li>• Member management (add/edit/search)</li>
              <li>• Plan & pricing controls</li>
              <li>• Attendance via QR or biometric</li>
              <li>• Auto billing & renewals</li>
              <li>• Bulk SMS / Email (₹0.25 / SMS)</li>
              <li>• Advanced monthly analytics</li>
            </ul>
          </div>
        </div>
      </header>

      {/* FEATURES SECTION */}
      <main className="max-w-6xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT FEATURES */}
        <section className="lg:col-span-2 space-y-6">
          {/* Member & Plan */}
          <div className="bg-[#0b0b0b] p-6 rounded-lg border border-gray-800">
            <h4 className="text-xl font-semibold text-white">
              Member Onboarding & Plans
            </h4>
            <p className="text-gray-400 mt-2 text-sm leading-relaxed">
              Fast onboarding for walk-ins & online signups. Create flexible
              plans: 1/3/6/12 months, fixed price or unlimited member packages.
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-black rounded border border-gray-800">
                <p className="text-xs text-gray-400">New in 7 days</p>
                <h3 className="text-2xl font-bold text-white mt-1">27</h3>
              </div>
              <div className="p-4 bg-black rounded border border-gray-800">
                <p className="text-xs text-gray-400">Expiring soon</p>
                <h3 className="text-2xl font-bold text-yellow-400 mt-1">3</h3>
                <p className="text-xs text-gray-500">Auto-email alert</p>
              </div>
              <div className="p-4 bg-black rounded border border-gray-800">
                <p className="text-xs text-gray-400">Total Members</p>
                <h3 className="text-2xl font-bold text-white mt-1">1,284</h3>
              </div>
            </div>
          </div>

          {/* Attendance */}
          <div className="bg-[#0b0b0b] p-6 rounded-lg border border-gray-800">
            <h4 className="text-xl font-semibold text-white">Attendance</h4>
            <ul className="mt-3 text-sm text-gray-300 space-y-1">
              <li>• Biometric device setup (₹1000 service)</li>
              <li>• QR-code check-in for free users</li>
            </ul>
          </div>

          {/* Messaging */}
          <div className="bg-[#0b0b0b] p-6 rounded-lg border border-gray-800">
            <h4 className="text-xl font-semibold text-white">
              Bulk Messaging & Offers
            </h4>
            <p className="text-gray-400 mt-2 text-sm">
              Send targeted SMS / email campaigns. Cost per SMS: ₹0.25.
            </p>
          </div>

          {/* Analytics */}
          <div className="bg-[#0b0b0b] p-6 rounded-lg border border-gray-800">
            <h4 className="text-xl font-semibold text-white">
              Analytics & Finance
            </h4>
            <p className="text-gray-400 mt-2 text-sm">
              Visual insights for monthly revenue, expenses, and new signups.
            </p>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div className="p-3 bg-black rounded border border-gray-800">
                Revenue<div className="mt-1 font-semibold">₹24,000</div>
              </div>
              <div className="p-3 bg-black rounded border border-gray-800">
                Expense<div className="mt-1 font-semibold">₹15,000</div>
              </div>
              <div className="p-3 bg-black rounded border border-gray-800">
                Net<div className="mt-1 font-semibold">₹9,000</div>
              </div>
              <div className="p-3 bg-black rounded border border-gray-800">
                New<div className="mt-1 font-semibold">27</div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-6">
          <div className="bg-[#0b0b0b] p-6 rounded-lg border border-gray-800">
            <h4 className="text-lg font-semibold text-white">Free vs Premium</h4>
            <ul className="mt-3 text-sm text-gray-300 space-y-1">
              <li>Free → core tools (member mgmt, QR attendance)</li>
              <li>
                Premium → all tools + website, domain, hosting, automation
              </li>
            </ul>
          </div>

          <div className="bg-[#0b0b0b] p-6 rounded-lg border border-gray-800">
            <h4 className="text-lg font-semibold text-white">
              Hosting & Website
            </h4>
            <p className="text-sm text-gray-400 mt-2">
              We provide domain + hosting setup. Online payments, renewals &
              onboarding included.
            </p>
          </div>

          <div className="bg-[#0b0b0b] p-6 rounded-lg border border-gray-800">
            <h4 className="text-lg font-semibold text-white">
              Automation & Emails
            </h4>
            <p className="text-sm text-gray-400 mt-2">
              Auto reminders to members whose plans expire within 7 days.
            </p>
          </div>
        </aside>
      </main>

      <footer className="max-w-6xl mx-auto mt-16 text-center text-sm text-gray-500 border-t border-gray-800 pt-6">
        © 2025 XynTech — Biometric setup ₹1000 (one-time)
      </footer>
    </div>
  );
}
