import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const gymSchema = new mongoose.Schema(
  {
    gymName: { type: String, required: true, trim: true },
    ownerName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true, trim: true },
    alternativeNumber: { type: String, trim: true },
    numberOfMembers: { type: Number, required: true, min: 1 },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true },
    landmark: { type: String, trim: true },
    establishedDate: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
   
  },
  { timestamps: true }
);

gymSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

gymSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("Gym", gymSchema);
