import nodemailer from "nodemailer";
import Member from "../Model/member.js";
import EmailOtp from "../Model/otpVerify.js";
import Plan from "../Model/plan.js";
import CashRequest from "../Model/cashRegister.js";
import mongoose from "mongoose";

export const sendOtp = async (req, res) => {
  try {
    const { email, fullName } = req.body;

    if (!email || !fullName) {
      return res
        .status(400)
        .json({ success: false, message: "Name and Email required" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in DB
    const member = await new EmailOtp({
      email,
      fullName,
      otp,
    });
    await member.save();

    // Send OTP via Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification OTP",
      html: `<p>Hello ${fullName},</p>
             <p>Your OTP is <b>${otp}</b></p>`,
    });

    res.status(200).json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const member = await EmailOtp.findOne({ email });
    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
    }

    if (member.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // OTP matched → clear OTP
    member.otp = undefined;
    (member.verify = true), await member.save();

    res.status(200).json({ success: true, message: "Email verified" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/*export const createMember = async (req, res) => {
  try {
    const {
      email,
      planType, // e.g., "Cardio"
      planDuration, // e.g., "1 Month"
      paidAmount,
      method,
      transactionId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      paymentDetails: paymentRaw,
      ...rest
    } = req.body;

    if (!req.file) return res.status(400).json({ message: "Photo required" });

    // Generate Member ID
    const lastMember = await Member.findOne().sort({ createdAt: -1 });
    let newMemberId = "M001";
    if (lastMember && lastMember.memberId) {
      const lastIdNum = parseInt(lastMember.memberId.slice(1));
      newMemberId = `M${(lastIdNum + 1).toString().padStart(3, "0")}`;
    }

    // Parse paymentDetails if string
    const paymentDetails =
      typeof paymentRaw === "string" ? JSON.parse(paymentRaw) : paymentRaw;

    // Check email verification
    const emailRecord = await EmailOtp.findOne({ email });
    if (!emailRecord || !emailRecord.verify) {
      return res
        .status(400)
        .json({ success: false, message: "Email not verified" });
    }

    // Find plan by type and duration
    const planData = await Plan.findOne({
      type: planType,
      duration: planDuration,
    });
    if (!planData) {
      return res
        .status(404)
        .json({ success: false, message: "Selected plan not found" });
    }

    // Determine if full paid
    const isFullPaid = paidAmount >= planData.price;

    // Calculate expire date
    const monthsToAdd = parseInt(planData.duration.split(" ")[0]);
    const startedDate = new Date();
    const expireDate = new Date(startedDate);
    expireDate.setMonth(expireDate.getMonth() + monthsToAdd);

    // Build memberPlan (as array object)
    const memberPlan = {
      Plan: planData._id,
      paidAmount,
      isFullPaid,
      startedDate,
      expireDate,
      method,
      transactionId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    };

    if (method === "Cash") {
      const newMember = new CashRequest({
        email,
        ...rest,
        plan: [memberPlan], // ✅ array ke andar store
        memberId: newMemberId,
        livePhoto: req.file.path,
      });

      await newMember.save();

      res.status(201).json({
        success: true,
        data: newMember,
        message: "Member created successfully",
      });
    }

    const newMember = new Member({
      email,
      ...rest,
      plan: [memberPlan], // ✅ array ke andar store
      memberId: newMemberId,
      livePhoto: req.file.path,
    });

    await newMember.save();

    res.status(201).json({
      success: true,
      data: newMember,
      message: "Member created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}; */

//CREATE MEMBER BY GYM OWNER ONLY
export const createMember = async (req, res) => {
  const gymId = req.gym.id;

  try {
    const {
      email,
      planType,
      planDuration,
      paidAmount,
      method,
      transactionId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      paymentDetails: paymentRaw,
      ...rest
    } = req.body;

    if (!req.file) return res.status(400).json({ message: "Photo required" });

    // Parse paymentDetails if string
    const paymentDetails =
      typeof paymentRaw === "string" ? JSON.parse(paymentRaw) : paymentRaw;

    // Find plan by type and duration
    const planData = await Plan.findOne({
      type: planType,
      duration: planDuration,
    });
    if (!planData) {
      return res
        .status(404)
        .json({ success: false, message: "Selected plan not found" });
    }

    // Determine if full paid
    const isFullPaid = paidAmount >= planData.price;

    // Calculate expire date
    const monthsToAdd = parseInt(planData.duration.split(" ")[0]);
    const startedDate = new Date();
    const expireDate = new Date(startedDate);
    expireDate.setMonth(expireDate.getMonth() + monthsToAdd);

    // Build memberPlan (without memberId yet)
    const memberPlan = {
      Plan: planData._id,
      planType,
      paidAmount,
      isFullPaid,
      startedDate,
      expireDate,
      method,
      transactionId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    };

    // CASE: Cash payment → save request, wait for admin approval
   /* if (method === "Cash") {
      const newCashRequest = new CashRequest({
        email,
        ...rest,
        plan: [memberPlan], // just store requested plan details
        livePhoto: req.file.path,
        status: "pending", // admin will approve
      });

      await newCashRequest.save();

      return res.status(201).json({
        success: true,
        message:
          "Cash payment request submitted. Admin will approve before activation.",
        data: newCashRequest,
      }); 
    } */

    // CASE: Online payment → create member directly
    // Generate Member ID
    const lastMember = await Member.findOne().sort({ createdAt: -1 });
    let newMemberId = "M001";
    if (lastMember && lastMember.memberId) {
      const lastIdNum = parseInt(lastMember.memberId.slice(1));
      newMemberId = `M${(lastIdNum + 1).toString().padStart(3, "0")}`;
    }

    const newMember = new Member({
      email,
      admissionDate: Date.now(),
      ...rest,
      plan: [memberPlan],
      memberId: newMemberId,
      livePhoto: req.file.path,
      gymId,
    });

    await newMember.save();

    res.status(201).json({
      success: true,
      data: newMember,
      message: "Member created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET PERTICULER GYM MEMBER
export const getAllMembersBYGym = async (req, res) => {
  const gymId = req.gym.id;
  try {
    const members = await Member.find({ gymId: gymId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: {
        TotalMember: members.length,
        AllMember: members,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET all members
export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: {
        TotalMember: members.length,
        AllMember: members,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET member by ID
export const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id);
    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    }
    res.status(200).json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// UPDATE member by ID
export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMember = await Member.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedMember) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    }
    res.status(200).json({ success: true, data: updatedMember });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE member by ID
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = await Member.findByIdAndDelete(id);
    if (!deletedMember) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get members with filters (today, this week, this month, custom range)

export const getUserOnboardDetails = async (req, res) => {
  const gymId = req.gym.id;
  if (!gymId) {
    return res.status(400).json({
      success: false,
      message: "Gym ID not found in request",
    });
  }

  try {
    const { filter, from, to } = req.query;
    let query = {
      gymId: new mongoose.Types.ObjectId(gymId), // ✅ include gymId filter
    };

    // Filter by predefined ranges
    if (filter) {
      const now = new Date();

      if (filter === "today") {
        const start = new Date(now.setHours(0, 0, 0, 0));
        const end = new Date(now.setHours(23, 59, 59, 999));
        query.admissionDate = { $gte: start, $lte: end };
      }

      if (filter === "this week") {
        const firstDay = new Date(now.setDate(now.getDate() - now.getDay()));
        firstDay.setHours(0, 0, 0, 0);
        const lastDay = new Date(firstDay);
        lastDay.setDate(lastDay.getDate() + 6);
        lastDay.setHours(23, 59, 59, 999);
        query.admissionDate = { $gte: firstDay, $lte: lastDay };
      }

      if (filter === "this month") {
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        lastDay.setHours(23, 59, 59, 999);
        query.admissionDate = { $gte: firstDay, $lte: lastDay };
      }
    }

    // Custom date range
    if (from && to) {
      query.admissionDate = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }

    const members = await Member.find(query).sort({ admissionDate: -1 });

    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUpcomingPlanExpiries = async (req, res) => {
  try {
    const gymId = req.gym.id;
    if (!gymId) {
      return res.status(400).json({
        success: false,
        message: "Gym ID not found in request",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endOfToday = new Date(today);
    endOfToday.setHours(23, 59, 59, 999);

    const next7Days = new Date(today);
    next7Days.setDate(today.getDate() + 7);

    const next30Days = new Date(today);
    next30Days.setDate(today.getDate() + 30);

    const next1Year = new Date(today);
    next1Year.setFullYear(today.getFullYear() + 1);

    // ✅ Helper function for aggregation with gymId type fix
    const aggregatePlans = async (startDate, endDate) => {
      return await Member.aggregate([
        { $match: { gymId: new mongoose.Types.ObjectId(gymId) } },
        { $unwind: "$plan" },
        {
          $match: {
            "plan.expireDate": {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $project: {
            fullName: 1,
            email: 1,
            planName: "$plan.planName",
            expireDate: "$plan.expireDate",
            _id: 0,
          },
        },
      ]);
    };

    const todayExpiring = await aggregatePlans(today, endOfToday);
    const next7DaysExpiring = await aggregatePlans(today, next7Days);
    const next30DaysExpiring = await aggregatePlans(today, next30Days);
    const next1YearExpiring = await aggregatePlans(today, next1Year);

    res.status(200).json({
      success: true,
      data: {
        today: todayExpiring,
        next7Days: next7DaysExpiring,
        next30Days: next30DaysExpiring,
        next1Year: next1YearExpiring,
      },
    });
  } catch (error) {
    console.error("Error in getUpcomingPlanExpiries:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getMemberByEmail = async (req, res) => {
  const gymId = req.gym.id;
  if (!gymId) {
    return res.status(400).json({
      success: false,
      message: "Gym ID not found in request",
    });
  }

  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // ✅ Find member by email AND gymId
    const member = await Member.findOne({
      email: email.toLowerCase(), // optional: normalize email
      gymId: new mongoose.Types.ObjectId(gymId),
    }).populate("plan.Plan"); // replace 'planId' with your actual reference field

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found with this email in this gym",
      });
    }

    res.status(200).json({
      success: true,
      member,
    });
  } catch (error) {
    console.error("Get Member by Email Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching member",
      error: error.message,
    });
  }
};
