import mongoose from "mongoose";

const canteenItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    itemPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    itemDescription: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    itemImage: {
      type: String, // Cloudinary ya local image URL
    },
  },
  { timestamps: true }
);

const CanteenItem = mongoose.model("CanteenItem", canteenItemSchema);

export default CanteenItem;
