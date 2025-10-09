import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogs,
  
} from "../Controller/blogController.js";

import upload from "../Config/multer.js";


const router = express.Router();

// Create a new expense
router.post("/createBlog", upload.single("blogImage"), createBlog);

// Get all expenses (basic, no filters)
router.get("/getAllBlog", getAllBlogs);

// Get expenses with filtering (today, this week, this month, date range)
router.get("/getBlogsByFilter", getBlogs);

// Get expense by ID
router.get("/getBlogById/:id", getBlogById);

// Update expense by ID
router.put("/updateBlog/:id",  upload.single("blogImage"), updateBlog);

// Delete expense by ID
router.delete("/deleteBlog/:id", deleteBlog);

export default router;
