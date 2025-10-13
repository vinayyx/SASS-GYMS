import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [isLogin, setIsLogin] = useState(true); // toggle login/signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // for signup
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        // Login request
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/gym/login`,
          { email, password }
        );
        localStorage.setItem("adminToken", res.data.token);
        toast.success("Login successful! Redirecting...");
      } else {
        // Signup request
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/gym/register`,
          { name, email, password }
        );
        localStorage.setItem("adminToken", res.data.token);
        toast.success("Signup successful! Redirecting...");
      }
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch (err) {
      toast.error(err.response?.data?.error || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black font-poppins px-4">
      <div className="w-full max-w-md p-10 bg-gray-900 rounded-xl shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center mb-2">
          {isLogin ? "Admin Login" : "Admin Signup"}
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Securely manage your gym dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-gray-300 mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          )}
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-full bg-purple-600 hover:bg-purple-700 font-semibold transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Signing up..."
              : isLogin
              ? "Login"
              : "Signup"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400 text-sm">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            className="text-purple-500 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>

        <p className="mt-6 text-center text-gray-500 text-xs">
          For any inquiries, contact us at <span className="text-purple-400">support@xyntech.com</span>
        </p>
      </div>
    </div>
  );
}
