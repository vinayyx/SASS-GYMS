import mongoose from "mongoose";

const cashRequestSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  price: { type: Number, required: true },
  startedDate: { type: Date, required: true },
  expireDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  requestedAt: { type: Date, default: Date.now },

  Name: {
    type: String,
  },

  planName: {
    type: String,
  },
  email: {
    type: String,
  },
  contact: {
    type: String,
  },
  plantype:{
     type: String,

  },
  duration: {
     type: String,

  }
});

const CashRequest = mongoose.model("CashRequest", cashRequestSchema);

export default CashRequest;
