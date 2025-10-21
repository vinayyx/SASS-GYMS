import express from "express";
import {
  getAllUsers,
  sendMailCampaign,
} from "../Controller/mailCampaignController.js";
import { protect } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/all-users", protect, getAllUsers);
router.post("/send", protect, sendMailCampaign);

export default router;
