// Hero.jsx
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { gsap } from "gsap";
import axios from "axios";



const Hero = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blog/getAllBlog`);
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(blogs)

  useEffect(() => {
    fetchBlogs()
  }, []);

  useEffect(() => {
    if (!loading && blogs.length > 0) {
      gsap.fromTo(
        ".blog-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [loading, blogs]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <ClipLoader color="#ef4444" size={60} />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white py-16 px-6 md:px-12 lg:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-red-500 mb-12">
        Our Latest Blogs
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="blog-card bg-[#1a1a1a] rounded-2xl shadow-xl overflow-hidden border border-red-600 hover:scale-105 transform transition duration-300"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-red-400 mb-2">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-400 mb-3">
                {blog.author} •{" "}
                {new Date(blog.updatedAt).toLocaleDateString("en-GB")}
              </p>
              <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                {blog.content}
              </p>
              <span className="inline-block text-xs px-4 py-1 rounded-full bg-red-600 text-white">
                {blog.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
