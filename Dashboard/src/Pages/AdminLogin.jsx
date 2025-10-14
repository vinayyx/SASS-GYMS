import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

export default function AdminLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup specific fields
  const [gymName, setGymName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [alternativeNumber, setAlternativeNumber] = useState("");
  const [numberOfMembers, setNumberOfMembers] = useState(1);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !email ||
      !password ||
      (!isLogin &&
        (!gymName || !ownerName || !contactNumber || !numberOfMembers || !address || !city))
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        // LOGIN
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/gym/login`,
          { email, password }
        );

        localStorage.setItem("adminToken", res.data.token);
        toast.success("Login successful!");

        // Redirect and refresh dashboard
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 300);
      } else {
        // SIGNUP
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/gym/register`, {
          gymName,
          ownerName,
          email,
          password,
          contactNumber,
          alternativeNumber,
          numberOfMembers,
          address,
          city,
          state,
          pincode,
          landmark,
        });

        toast.success("Signup successful! Please login now.");
        setIsLogin(true); // move to login page
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black font-poppins px-4">
      <div className="w-full max-w-lg p-10 bg-gray-900 rounded-xl shadow-2xl text-white relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/home")}
          className="absolute top-4 left-4 text-gray-300 hover:text-white text-sm flex items-center gap-1"
        >
          <span className="text-lg">←</span> Back
        </button>

        <h2 className="text-3xl font-bold text-center mb-2">
          {isLogin ? "Admin Login" : "Gym Signup"}
        </h2>
        <p className="text-center text-gray-400 mb-8">
          {isLogin
            ? "Securely manage your gym dashboard"
            : "Register your gym to start managing"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <div>
                <label className="block text-gray-300 mb-1">Gym Name</label>
                <input
                  type="text"
                  placeholder="Enter gym name"
                  value={gymName}
                  onChange={(e) => setGymName(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Owner Name</label>
                <input
                  type="text"
                  placeholder="Enter owner name"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Contact Number</label>
                <input
                  type="text"
                  placeholder="Enter contact number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Alternative Number</label>
                <input
                  type="text"
                  placeholder="Enter alternative number"
                  value={alternativeNumber}
                  onChange={(e) => setAlternativeNumber(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Number of Members</label>
                <input
                  type="number"
                  min={1}
                  value={numberOfMembers}
                  onChange={(e) => setNumberOfMembers(Number(e.target.value))}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">City</label>
                <input
                  type="text"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">State</label>
                <input
                  type="text"
                  placeholder="Enter state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Pincode</label>
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Landmark</label>
                <input
                  type="text"
                  placeholder="Enter landmark"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </>
          )}

          {/* Common fields */}
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

          {/* Button with spinner */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 p-3 rounded-full bg-purple-600 hover:bg-purple-700 font-semibold transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <BeatLoader color="#fff" size={10} />
              </>
            ) : isLogin ? (
              "Login"
            ) : (
              "Signup"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-purple-500 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>

        <p className="mt-6 text-center text-gray-500 text-xs">
          For any inquiries, contact us at{" "}
          <span className="text-purple-400">support@xyntech.com</span>
        </p>
      </div>
    </div>
  );
}
