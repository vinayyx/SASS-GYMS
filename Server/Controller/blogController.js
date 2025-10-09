import { Blog } from "../Model/blog.js";
import cloudinary from "../Config/cloudnary.js"; // Your Cloudinary config

// CREATE BLOG
export const createBlog = async (req, res) => {
  try {
    const { title, content, author, category, isPublished } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Title and Content are required" });
    }

    // Upload image if provided
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog_images",
        transformation: [{ width: 800, crop: "limit" }],
      });
      imageUrl = result.secure_url;
    }

    const newBlog = new Blog({
      title,
      content,
      author,
      category,
      isPublished,
      image: imageUrl,
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      data: newBlog,
      message: "Blog created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET ALL BLOGS
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET SINGLE BLOG
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// UPDATE BLOG
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    const { title, content, author, category, isPublished } = req.body;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog_images",
        transformation: [{ width: 800, crop: "limit" }],
      });
      blog.image = result.secure_url;
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author;
    blog.category = category || blog.category;
    blog.isPublished =
      isPublished !== undefined ? isPublished : blog.isPublished;

    await blog.save();

    res
      .status(200)
      .json({
        success: true,
        data: blog,
        message: "Blog updated successfully",
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE BLOG
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get expenses with filtering options
export const getBlogs = async (req, res) => {
  try {
    const { filter, from, to } = req.query;
    let query = {};

    // Case 1: Filter by "today" | "this week" | "this month"
    if (filter) {
      const now = new Date();

      if (filter === "today") {
        const start = new Date(now.setHours(0, 0, 0, 0));
        const end = new Date(now.setHours(23, 59, 59, 999));
        query.createdAt = { $gte: start, $lte: end };
      }

      if (filter === "this week") {
        const firstDay = new Date(now.setDate(now.getDate() - now.getDay())); // Sunday
        const lastDay = new Date(firstDay);
        lastDay.setDate(lastDay.getDate() + 6); // Saturday
        query.createdAt = { $gte: firstDay, $lte: lastDay };
      }

      if (filter === "this month") {
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        query.createdAt = { $gte: firstDay, $lte: lastDay };
      }
    }

    // Case 2: Custom Date Range (from, to)
    if (from && to) {
      query.createdAt = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }

    // Case 3: No filter → show all
    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
