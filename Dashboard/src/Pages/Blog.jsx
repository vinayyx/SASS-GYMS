import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDashboardContext } from "../Context/Context";
import axios from "axios";
import toast from "react-hot-toast";

function Blog() {
  const { blog, refreshBlog } = useDashboardContext();
  const [gymData, setGymData] = useState(null);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  // ✅ Fetch Gym Info for verification
  useEffect(() => {
    const fetchGym = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/gym/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGymData(data.gym);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch gym data");
      } finally {
        setLoading(false);
      }
    };
    fetchGym();
  }, []);

  const handleEdit = (id) => {
    Navigate("/editblog", { state: { SelectedUser: id } });
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/deleteBlog/${id}`
      );
      if (data) {
        toast.success("Blog deleted successfully");
        refreshBlog();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-600 text-lg">
        Loading...
      </div>
    );
  }

  // 🚫 Not verified message
  if (!gymData?.isVerified) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] bg-white shadow-md rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your Gym Account is Not Verified
        </h2>
        <p className="text-gray-600 max-w-md">
          Blog management is available only for verified (Premium) gym accounts.
          Please upgrade to premium or contact support to enable this feature.
        </p>
      </div>
    );
  }

  // ✅ If verified: show full blog management UI
  return (
    <div className="w-full min-h-[80vh] py-6 md:p-6 bg-gray-50">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div>
          <p className="text-sm text-gray-500">Total Blogs</p>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">
            {blog.length}
          </h1>
        </div>
        <button
          onClick={() => Navigate("/api/addblog")}
          className="mt-4 sm:mt-0 px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 shadow-md transition-all"
        >
          <Plus size={20} /> Add Blog
        </button>
      </div>

      {/* Blog Table Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Blogs
        </h2>
        <div className="max-h-80 overflow-y-auto rounded-lg border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50 text-blue-600 uppercase text-sm">
                <th className="p-3">Title</th>
                <th className="p-3">Author</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blog.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-blue-50 transition-all"
                >
                  <td className="p-3 font-medium text-gray-700">
                    {item.title}
                  </td>
                  <td className="p-3 text-gray-600">{item.author}</td>
                  <td className="p-3 text-gray-600">
                    {new Date(item.updatedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="text-blue-500 hover:text-blue-700 transition-all"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-4">
          <button className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow-md transition-all">
            View All Blogs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Blog;
