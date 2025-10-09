import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDashboardContext } from "../Context/Context";
import axios from "axios";
import toast from "react-hot-toast";

function Blog() {
  const { blog, refreshBlog } = useDashboardContext();

  const Navigate = useNavigate();

  const handleEdit = (id) => {
    Navigate("/editblog", { state: { SelectedUser: id } });
  };



  const handleDelte = async (id) => {

    try {
      
      const data = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/blog/deleteBlog/${id}`)

      if(data){
        toast.success("blog is successfully delted")
        refreshBlog()

      }
    } catch (error) {

      console.log(error)
      
    }
   
  };
  return (
    <div className="w-full h-[80vh] py-6  md:p-6 ">
      {/* Top Section: Total Blogs + Add Blog Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div>
          <p className="text-sm text-gray-500">Total Blogs</p>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">
            {blog.length}
          </h1>
        </div>
        <button
          onClick={() => Navigate("/addblog")}
          className="mt-4 sm:mt-0 px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 shadow-md"
        >
          <Plus size={20} /> Add Blog
        </button>
      </div>

      {/* Recent Blogs Section */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Blogs
        </h2>
        <div className="max-h-80 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="p-3">Title</th>
                <th className="p-3">Author</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blog.map((blog, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">{blog.title}</td>
                  <td className="p-3">{blog.author}</td>
                  <td className="p-3">
                    {new Date(blog.updatedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(blog._id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelte(blog._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Optional: View All Blogs Button */}
        <div className="flex justify-center mt-4">
          <button className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow-md">
            View All Blogs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Blog;
