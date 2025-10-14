import React, { useEffect, useState } from "react";

export default function GymProfile() {
  const [gym, setGym] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("No token found in localStorage (adminToken)");
      setLoading(false);
      return;
    }

    const fetchGym = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/gym/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch gym info");
        const data = await res.json();
        if (data.success && data.gym) setGym(data.gym);
        else throw new Error("Unexpected API response");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGym();
  }, []);

  const formatDate = (iso) => {
    if (!iso) return "-";
    return new Date(iso).toLocaleDateString("en-IN");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg p-8">
        {loading ? (
          <div className="text-center text-sky-600 font-medium">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600 font-medium">Error: {error}</div>
        ) : gym ? (
          <>
            {/* Top Profile Header */}
            <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 pb-6 mb-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-sky-600 to-blue-600 flex items-center justify-center text-white font-bold text-2xl">
                  {gym.gymName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{gym.gymName}</h1>
                  <p className="text-gray-500 text-sm">Owner: {gym.ownerName}</p>
                  <p className="text-gray-500 text-sm">
                    Contact: {gym.contactNumber}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Email: {gym.email || "-"}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-md font-medium shadow">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md font-medium shadow">
                  Delete
                </button>
              </div>
            </div>

            {/* Gym Info Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Gym Information
              </h2>
              <hr className="border-gray-300 mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold text-gray-700">
                      Gym Name:
                    </span>{" "}
                    {gym.gymName}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">
                      Owner Name:
                    </span>{" "}
                    {gym.ownerName}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">
                      Contact Number:
                    </span>{" "}
                    {gym.contactNumber}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">
                      Alternative Number:
                    </span>{" "}
                    {gym.alternativeNumber || "-"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">
                      Established Date:
                    </span>{" "}
                    {formatDate(gym.establishedDate)}
                  </p>
                </div>

                <div className="space-y-2">
                  <p>
                    <span className="font-semibold text-gray-700">City:</span>{" "}
                    {gym.city}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">State:</span>{" "}
                    {gym.state}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">
                      Address:
                    </span>{" "}
                    {gym.address}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">
                      Landmark:
                    </span>{" "}
                    {gym.landmark}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">
                      Verified:
                    </span>{" "}
                    {gym.isVerified ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer JSON (optional) */}
            <div className="mt-10 bg-gray-100 rounded-lg p-4 text-xs text-gray-700 overflow-auto">
              <pre>{JSON.stringify(gym, null, 2)}</pre>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600">No gym data found</div>
        )}
      </div>
    </div>
  );
}
