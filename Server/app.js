import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import cors from "cors";
import { connection } from "./Config/db.js";
import cookieParser from "cookie-parser";

import payment from "./Routes/PaymentRoutes/paymentRoutes.js";
import plan from "./Routes/planRoutes.js";
import member from "./Routes/memberRoutes.js";
import admin from "./Routes/adminRoutes.js";
import expense from "./Routes/expenseRoute.js";
import blog from "./Routes/blogRoutes.js";
import dashboard from "./Routes/dashboardRoutes.js";
import cron from "node-cron";
import planReminderRoutes from "./Routes/planReminderRoutes.js";
import { sendPlanExpiryReminders } from "./Controller/planReminderController.js";
import cashRequest from "./Routes/cashRequest.js";
import attendance from "./Routes/attendanceRoutes.js";
import { sendSMS } from "./Controller/fastToSms.js"; // Did not call this function Every msg ChargeAble
import canteen from "./Routes/CanteenItemsRoutes.js";
import order from "./Routes/orderRoutes.js";
import cashregister from "./Routes/cashRegisterRoutes.js";

//GYM ROUTES
import gym from "./Routes/gymRoutes.js";

dotenv.config();
connection();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server Ruuning");
});

app.use("/api", payment);
app.use("/api/plan", plan);
app.use("/api/member", member);
app.use("/api/admin", admin);
app.use("/api/expense", expense);
app.use("/api/blog", blog);
app.use("/api/dashboard", dashboard);
app.use("/api/reminder", planReminderRoutes);
app.use("/api/cash", cashRequest);
app.use("/api/attendance", attendance);
app.use("/api/canteen", canteen);
app.use("/api/order", order);
app.use("/api/cashregister", cashregister);

//MOUNT GYM ROUTES
app.use("/api/gym", gym);

cron.schedule(
  "0 9 * * *",
  async () => {
    console.log("⏰ Running daily plan expiry reminder job at 9:00 AM IST...");
    await sendPlanExpiryReminders(null, {
      json: (data) => console.log("Reminder Result:", data),
      status: () => ({ json: console.log }),
    });
  },
  {
    timezone: "Asia/Kolkata",
  }
);

app.listen(5000, () => console.log("Server running on port 5000"));
