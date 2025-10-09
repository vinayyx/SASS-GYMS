import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String, 
      default: "Faiz",
    },
    category: {
      type: String,
      default: "General",
    },
    image: {
      type: String, 
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } 
);

export const Blog = mongoose.model("Blog", blogSchema);
