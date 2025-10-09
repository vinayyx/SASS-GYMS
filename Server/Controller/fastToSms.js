import cron from "node-cron";
import Member from "../Model/member.js";
import axios from "axios";

// ✅ SMS Sender Function
export const sendSMS = async (mobile, message) => {
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message: message,
        language: "english",
        numbers: mobile,
      },
      {
        headers: {
          authorization: "6AFGUBToD6daUl0E8RTmlLUk8cSoeopc88zlDCBxrvpts3gRySuTbMu70F49", // <-- apni key yaha
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.return) {
      console.log("✅ SMS Sent to", mobile);
      return true;
    } else {
      console.log("❌ SMS Failed:", response.data);
      return false;
    }
  } catch (err) {
    console.error("Error sending SMS:", err.response?.data || err.message);
    return false;
  }
};

// ✅ Reminder Controller
export const sendPlanExpiryReminders = async (req, res) => {
  try {
    const today = new Date();
    const upcoming = new Date();
    upcoming.setDate(today.getDate() + 7); // 7 din baad tak ke plans

    const members = await Member.find({
      "plan.expireDate": { $lte: upcoming, $gte: today },
    }).select("fullName contactNumber plan");

    if (!members || members.length === 0) {
      if (res) res.json({ message: "No members with plans expiring in 7 days" });
      return;
    }

    // Har member ko SMS bhejna
    for (const member of members) {
      const activePlan = member.plan.find(
        (p) => p.expireDate >= today && p.expireDate <= upcoming
      );

      if (activePlan && member.contactNumber) {
        const message = `Hello ${member.fullName}, your gym plan is expiring on ${activePlan.expireDate.toDateString()}. Please renew soon to continue without interruption.`;
       // await sendSMS(member.contactNumber, message);
      }
    }

    if (res) res.json({ success: true, count: members.length });
  } catch (err) {
    console.error("Error in reminders:", err);
    if (res) res.status(500).json({ error: err.message });
  }
};

// ✅ Cron Job to run daily at 9 AM IST
cron.schedule(
  "42 23 * * *", // 23:42 IST,
  async () => {
    console.log("⏰ sms  Running daily plan expiry reminder job at 9:00 AM IST...");
    await sendPlanExpiryReminders(null, {
      json: (data) => console.log("Reminder Result:", data),
      status: () => ({ json: console.log }),
    });
  },
  {
    timezone: "Asia/Kolkata",
  }
);
