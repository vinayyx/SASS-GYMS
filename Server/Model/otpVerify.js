 
import mongoose from "mongoose";

const emailOtpSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, required: true, unique: true },
  otp: String,
  verify:{
    type:Boolean,
    default: false, 
  },
  createdAt: { type: Date, default: Date.now, expires: 300 } // 5 min expiry
});
const EmailOtp = mongoose.model("EmailOtp", emailOtpSchema);

export default EmailOtp