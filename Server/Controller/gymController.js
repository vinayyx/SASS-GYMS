import Gym from "../Model/gym.model.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
// Create JWT token
const createToken = (gymId) => {
  return jwt.sign({ id: gymId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register Gym
export const registerGym = async (req, res) => {
  try {
    const {
      email,
      password,
      gymName,
      ownerName,
      contactNumber,
      numberOfMembers,
      address,
      city,
    } = req.body;

    if (
      !email ||
      !password ||
      !gymName ||
      !ownerName ||
      !contactNumber ||
      !numberOfMembers ||
      !address ||
      !city
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message: "All required fields must be filled",
        });
    }

    const existingGym = await Gym.findOne({ email });
    if (existingGym)
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });

    const gym = await Gym.create(req.body);

    const token = createToken(gym._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(201)
      .json({ success: true, message: "Gym registered successfully", gym });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login Gym
export const loginGym = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email & Password required" });

    const gym = await Gym.findOne({ email });
    if (!gym)
      return res.status(400).json({ success: false, message: "Gym not found" });

    const isMatch = await gym.comparePassword(password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const token = createToken(gym._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ success: true, message: "Logged in successfully", gym , token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Logout Gym
export const logoutGym = async (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// Get Current Gym
export const getCurrentGym = async (req, res) => {
  try {
    const gym = await Gym.findById(req.gym.id).select("-password");
    if (!gym)
      return res.status(404).json({ success: false, message: "Gym not found" });
    res.status(200).json({ success: true, gym });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
