// controllers/planReminderController.js
import Member from "../Model/member.js";
import nodemailer from "nodemailer";
import moment from "moment";

// ✅ Mail bhejne ka function
const sendMail = async (to, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail", // tum Gmail use kar rahe ho
      auth: {
        user: process.env.EMAIL_USER, // .env me daalna
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Gym App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
  } catch (err) {
    console.error("Mail error:", err);
  }
};

// ✅ Controller function
export const sendPlanExpiryReminders = async (req, res) => {
  try {
    // Aaj ki date
    const today = moment().startOf("day");
    // Aaj se 7 din baad
    const sevenDaysLater = moment().add(7, "days").endOf("day");

    // DB se members nikaalna jinke plan expire ho rahe hain next 7 din ke andar
    const members = await Member.find({
      "plan.expireDate": {
        $gte: today.toDate(), // aaj ke baad
        $lte: sevenDaysLater.toDate(), // 7 din ke andar
      },
    });

    if (members.length === 0) {
      return res.json({ message: "No plans expiring within 7 days." });
    }

    // Har member ko mail bhejna
    for (let member of members) {
      await sendMail(
        member.email,
        "Your Plan is Expiring Soon",
        `Hello ${
          member.fullName
        },\n\nYour subscription plan will expire on ${moment(
          member.plan[0].expireDate
        ).format("DD/MM/YYYY")}. Please renew it in time.\n\n- Gym Team`
      );
    }

    res.json({
      message: "Reminder emails sent successfully",
      count: members.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
