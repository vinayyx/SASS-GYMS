import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  personName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CanteenItem",
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
