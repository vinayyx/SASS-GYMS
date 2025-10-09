import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  duration: {
    type: String,
    enum: ["1 Month", "3 Months", "6 Months", "12 Months"],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  keyPoints: {
    type: [String],
    validate: {
      validator: function (arr) {
        return arr.length <= 5;
      },
      message: "Maximum 5 key points allowed",
    },
  },
  createdAt: { type: Date, default: Date.now },
  gymId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gym",
  },
});

const Plan = mongoose.model("Plan", planSchema);

export default Plan;
