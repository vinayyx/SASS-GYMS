import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    checkInTime: {
      type: Date,
      required: true,
      default: Date.now, // when the person checks in
    },
    checkOutTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["IN", "OUT"],
      required: true,
    },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
