// EditPlan.jsx
import React, { useEffect, useState } from "react";
import { Tag, DollarSign, List, FileText, Edit } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDashboardContext } from "../Context/Context";

const EditPlan = () => {
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("1 Month");
  const [type, setType] = useState("");
  const [keyPoints, setKeyPoints] = useState([""]);
  const [loading, setLoading] = useState(false);
  const { refreshPlan } = useDashboardContext();

  const Navigate = useNavigate();
  const location = useLocation();
  const { SelectedUser: memberData } = location.state || {};
  const planId = memberData;


  useEffect(() => {
    const fetchPlan = async () => {
      if (!planId) return;
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/plan/get-plan-by-id/${planId}`
        );
        if (res.data) {
          const plan = res.data;
          setPrice(plan.price || "");
          setDuration(plan.duration || "1 Month");
          setType(plan.type || "");
          setKeyPoints(plan.keyPoints?.length ? plan.keyPoints : [""]);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load plan data");
      }
    };
    fetchPlan();
  }, [planId]);

  const handleKeyPointChange = (index, value) => {
    const updated = [...keyPoints];
    updated[index] = value;
    setKeyPoints(updated);
  };

  const addKeyPoint = () => {
    if (keyPoints.length < 5) {
      setKeyPoints([...keyPoints, ""]);
    } else {
      toast.error("Maximum 5 key points allowed");
    }
  };

  const removeKeyPoint = (index) => {
    const updated = keyPoints.filter((_, i) => i !== index);
    setKeyPoints(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!price || !type) {
      return toast.error("Please fill all required fields");
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/plan/update-plan-by-id/${planId}`,
        {
          price,
          duration,
          type,
          keyPoints,
        }
      );

      if (res.data) {
        toast.success("Plan updated successfully!");
        refreshPlan();
        Navigate("/viewAllPlan");
      } else {
        console.log(res);
        toast.error("Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-[80vh]  items-center py-10">
      <div className="bg-white shadow-2xl md:mt-40 mt:9  rounded-3xl w-full max-w-2xl p-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
          <Edit size={28} /> Edit Plan
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Price */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Price
            </label>
            <div className="flex items-center border rounded-2xl overflow-hidden">
              <DollarSign className="text-gray-400 ml-3" size={20} />
              <input
                type="number"
                className="w-full px-4 py-3 outline-none"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Duration
            </label>
            <select
              className="w-full border rounded-2xl p-3 outline-none"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="1 Month">1 Month</option>
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="12 Months">12 Months</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Type
            </label>
            <div className="flex items-center border rounded-2xl overflow-hidden">
              <Tag className="text-gray-400 ml-3" size={20} />
              <input
                type="text"
                className="w-full px-4 py-3 outline-none"
                placeholder="Enter plan type (e.g., Basic, Premium)"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Key Points */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Key Points
            </label>
            {keyPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <FileText className="text-gray-400" size={20} />
                <input
                  type="text"
                  className="flex-1 border rounded-xl px-3 py-2 outline-none"
                  placeholder={`Key point ${index + 1}`}
                  value={point}
                  onChange={(e) => handleKeyPointChange(index, e.target.value)}
                />
                {keyPoints.length > 1 && (
                  <button
                    type="button"
                    className="text-red-500 font-bold"
                    onClick={() => removeKeyPoint(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            {keyPoints.length < 5 && (
              <button
                type="button"
                onClick={addKeyPoint}
                className="mt-2 text-blue-600 font-semibold"
              >
                + Add Key Point
              </button>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-2xl hover:bg-green-700 transition-colors text-lg"
          >
            {loading ? "Updating..." : "Update Plan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPlan;
