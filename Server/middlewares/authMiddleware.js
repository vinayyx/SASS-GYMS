import jwt from "jsonwebtoken";
import Gym from "../Model/gym.model.js";
import { configDotenv } from "dotenv";
configDotenv()

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const gym = await Gym.findById(decoded.id);
    if (!gym) return res.status(401).json({ success: false, message: "Not authorized" });

    req.gym = gym;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
};
