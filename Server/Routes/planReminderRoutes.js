// routes/planReminderRoutes.js
import express from "express";
import { sendPlanExpiryReminders } from "../Controller/planReminderController.js";

const router = express.Router();

// ✅ GET route
router.get("/send-reminders", sendPlanExpiryReminders);

export default router;
