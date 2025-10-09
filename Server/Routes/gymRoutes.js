import express from "express";
import { registerGym, loginGym, logoutGym, getCurrentGym } from "../Controller/gymController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public
router.post("/register", registerGym);
router.post("/login", loginGym);
router.post("/logout", logoutGym);

// Protected
router.get("/me", protect, getCurrentGym);

export default router;
