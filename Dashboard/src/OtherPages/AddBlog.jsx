import React, { useState } from "react";
import { Pencil, ImageIcon, Tag, User, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDashboardContext } from "../Context/Context";
import {useNavigate} from "react-router-dom"

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null); // file store
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const {refreshBlog} = useDashboardContext()
  const Navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("author", author);
      formData.append("category", category);
      formData.append("isPublished", isPublished);

      if (image) {
        formData.append("blogImage", image); 
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/createBlog`, // 👈 baad me domain de dena
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Blog created successfully!");
        setTitle("");
        setContent("");
        setAuthor("");
        setCategory("");
        setImage(null);
        setIsPublished(false);
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
      refreshBlog()
      Navigate("/blog")
    } catch (err) {
      console.error(err);
      toast.error("Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[80vh] flex justify-center items-start py-6 md:p-6">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-2xl p-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
          <Pencil size={28} /> Add New Blog
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <div className="flex items-center border rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
              <Pencil className="text-gray-400 ml-3" size={20} />
              <input
                type="text"
                className="w-full px-4 py-3 outline-none"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Content</label>
            <textarea
              className="w-full border rounded-2xl p-4 resize-none outline-none focus:ring-2 focus:ring-blue-400"
              rows={6}
              placeholder="Write your blog content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Upload Image</label>
            <div className="flex items-center border rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
              <ImageIcon className="text-gray-400 ml-3" size={20} />
              <input
                type="file"
                accept="image/*"
                className="w-full px-4 py-3 outline-none"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Category</label>
            <div className="flex items-center border rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
              <Tag className="text-gray-400 ml-3" size={20} />
              <input
                type="text"
                className="w-full px-4 py-3 outline-none"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </div>

          {/* Author */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Author</label>
            <div className="flex items-center border rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
              <User className="text-gray-400 ml-3" size={20} />
              <input
                type="text"
                className="w-full px-4 py-3 outline-none"
                placeholder="Author name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
          </div>

          {/* Publish Switch */}
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="publish"
              className="h-5 w-5 text-blue-500"
              checked={isPublished}
              onChange={() => setIsPublished(!isPublished)}
            />
            <label htmlFor="publish" className="font-medium text-gray-700">
              Publish this blog
            </label>
            {isPublished && <CheckCircle className="text-green-500" size={22} />}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-2xl hover:bg-blue-700 transition-colors text-lg"
          >
            {loading ? "Submitting..." : "Submit Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
