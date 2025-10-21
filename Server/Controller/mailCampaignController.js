import { sendMail } from "../utils/mailer.js";
import member from "../Model/member.js";

export const getAllUsers = async (req, res) => {
  try {
    const gymId = req.gym.id; // from middleware

    // Fetch all members belonging to this gym
    const users = await member.find({ gymId }).select("fullName email");

    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "No members found for this gym.",
      });
    }

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

export const sendMailCampaign = async (req, res) => {
  try {
    const gymId = req.gym.id;
    const { userIds, subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Subject and message are required.",
      });
    }

    let recipients = [];

    // 🟢 If no specific users selected → send to all gym members
    if (!userIds || userIds.length === 0) {
      const allUsers = await member.find({ gymId }).select("email");
      recipients = allUsers.map((u) => u.email);
    } 
    // 🟡 If specific users selected → filter within this gym only
    else {
      const selectedUsers = await member.find({
        _id: { $in: userIds },
        gymId,
      }).select("email");

      recipients = selectedUsers.map((u) => u.email);
    }

    if (recipients.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No valid recipients found for this gym.",
      });
    }

    // 📨 Email HTML template
    const htmlContent = `
      <div style="font-family: Arial; background: #f9f9f9; padding: 20px; border-radius: 8px;">
        <h2 style="color: #333;">${subject}</h2>
        <p style="color: #555; line-height: 1.5;">${message}</p>
        <br/>
        <p style="color: #888;">Best Regards,<br/><b>Xyntech Gym Team</b></p>
      </div>
    `;

    // 🧾 Send email (using your sendMail utility)
    const { success, error } = await sendMail(recipients, subject, htmlContent);

    if (success) {
      return res.status(200).json({
        success: true,
        message: `Email sent to ${recipients.length} member(s) successfully.`,
      });
    } else {
      throw error;
    }
  } catch (error) {
    console.error("Mail Campaign Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send campaign.",
      error: error.message,
    });
  }
};
