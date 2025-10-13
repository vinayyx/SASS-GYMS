import Member from "../Model/member.js";
import Plan from "../Model/plan.js";
import Expense from "../Model/expense.js";
import moment from "moment";
import mongoose from "mongoose";


export const getAllMembers = async (req, res) => {
  try {
    const gymId = req.gym?.id;

    if (!gymId) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in.",
      });
    }

    const members = await Member.find({ gymId })
      .sort({ createdAt: -1 })
      .populate({
        path: "plan.Plan",
        select: "name type duration price",
      });

    const membersCount = await Member.countDocuments({ gymId });

    res.status(200).json({
      success: true,
      data: {
        members,
        membersCount,
      },
    });

    console.log(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching members.",
      error: error.message,
    });
  }
};

// get total sales


export const getTotalSales = async (req, res) => {
  try {
    const gymId = req.gym?.id;

    if (!gymId) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in.",
      });
    }

    // Ensure gymId is ObjectId
    const gymObjectId = new mongoose.Types.ObjectId(gymId);

    const result = await Member.aggregate([
      { $match: { gymId: gymObjectId } }, // Only this gym's members
      { $unwind: "$plan" }, // Flatten plans
      { $match: { "plan.paidAmount": { $gt: 0 } } }, // Only valid paid plans
      {
        $group: {
          _id: { month: { $month: "$plan.startedDate" } },
          monthlySales: { $sum: "$plan.paidAmount" },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    const months = [
      { month: "Jan", sale: 0 },
      { month: "Feb", sale: 0 },
      { month: "Mar", sale: 0 },
      { month: "Apr", sale: 0 },
      { month: "May", sale: 0 },
      { month: "Jun", sale: 0 },
      { month: "Jul", sale: 0 },
      { month: "Aug", sale: 0 },
      { month: "Sep", sale: 0 },
      { month: "Oct", sale: 0 },
      { month: "Nov", sale: 0 },
      { month: "Dec", sale: 0 },
    ];

    // Fill monthly sales
    result.forEach((r) => {
      const monthIndex = r._id.month - 1;
      months[monthIndex].sale = r.monthlySales;
    });

    const totalSales = result.reduce((sum, r) => sum + r.monthlySales, 0);

    res.status(200).json({
      success: true,
      totalSales,
      monthlyData: months,
    });
  } catch (error) {
    console.error("Error fetching total sales:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching total sales.",
      error: error.message,
    });
  }
};



// Get plans expiring in next 7 days
export const getExpiringPlans = async (req, res) => {
  try {
    const gymId = req.gym?.id; // Extract gymId from token
    if (!gymId) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in.",
      });
    }

    const gymObjectId = new mongoose.Types.ObjectId(gymId);

    const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);

    // Find members of this gym with at least one plan expiring in next 7 days
    const members = await Member.find({
      gymId: gymObjectId,
      "plan.expireDate": { $gte: today, $lte: sevenDaysLater },
    }).populate({
      path: "plan.Plan", // populate the plan reference inside the plan array
      select: "name type duration price",
    });

    const totalExpiring = members.length;

    res.status(200).json({
      success: true,
      totalExpiring,
      members,
    });
  } catch (error) {
    console.error("Error fetching expiring plans:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get total expense


export const getTotalExpense = async (req, res) => {
  try {
    const gymId = req.gym?.id; // Extract gymId from token

    if (!gymId) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in.",
      });
    }

    const gymObjectId = new mongoose.Types.ObjectId(gymId);

    const result = await Expense.aggregate([
      { $match: { gymId: gymObjectId } }, // Only this gym's expenses
      {
        $group: {
          _id: null,
          totalExpense: { $sum: "$amount" },
        },
      },
    ]);

    const totalExpense = result[0]?.totalExpense || 0;

    res.status(200).json({
      success: true,
      totalExpense,
    });
  } catch (error) {
    console.error("Error fetching total expense:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


// GET MEMBERS DATA WHOS IS ONBOADING A LAST 7 DAYS
export const onboardAtLast7Days = async (req, res) => {
  try {
    const gymId = req.gym?.id; // Extract gymId from token

    if (!gymId) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in.",
      });
    }

    const gymObjectId = new mongoose.Types.ObjectId(gymId);

    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    // Find members of this gym whose admissionDate is in the last 7 days
    const members = await Member.find({
      gymId: gymObjectId,
      admissionDate: { $gte: sevenDaysAgo, $lte: today },
    });

    res.status(200).json({
      success: true,
      totalMembers: members.length,
      data: members,
    });
  } catch (error) {
    console.error("Error fetching recent onboarded members:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get monthly Data for Sales Graph

export const salesGraph = async (req, res) => {
  try {
    const gymId = req.gym?.id;

    if (!gymId) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in.",
      });
    }

    const gymObjectId = new mongoose.Types.ObjectId(gymId);

    // Get all expenses and members for this gym
    const expenses = await Expense.find({ gymId: gymObjectId });
    const members = await Member.find({ gymId: gymObjectId });

    // Month mapping (0-based JS months -> Jan..Dec)
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    // Initialize monthly data
    let monthlyData = months.map((m) => ({
      month: m,
      sale: 0,
      expense: 0,
    }));

    // Aggregate Expenses month-wise
    expenses.forEach((exp) => {
      const monthIndex = new Date(exp.createdAt).getMonth();
      monthlyData[monthIndex].expense += exp.amount;
    });

    // Aggregate Sales month-wise
    members.forEach((member) => {
      member.plan.forEach((p) => {
        if (p.paidAmount) {
          const monthIndex = new Date(p.startedDate).getMonth();
          monthlyData[monthIndex].sale += p.paidAmount;
        }
      });
    });

    res.status(200).json({
      success: true,
      monthlyData,
    });
  } catch (error) {
    console.error("Sales Graph Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get total sale with plan details for Sales page
export const totalSalesWithInformation = async (req, res) => {
  try {
    const gymId = req.gym?.id; // Extract gymId from token

    if (!gymId) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in.",
      });
    }

    const gymObjectId = new mongoose.Types.ObjectId(gymId);

    // Fetch members for this gym
    const members = await Member.find({ gymId: gymObjectId }).populate("plan.Plan");

    // Flatten members + plans into salesData
    let salesData = members.flatMap((member) =>
      member.plan.map((p) => ({
        id: member._id,
        memberId: member.memberId,
        fullName: member.fullName,
        livePhoto: member.livePhoto,
        email: member.email,
        contactNumber: member.contactNumber,
        city: member.city,
        admissionDate: member.admissionDate,

        // Plan details
        planName: p.planName || `${p.Plan?.type} - ${p.Plan?.duration}`,
        paidAmount: p.paidAmount,
        isFullPaid: p.isFullPaid,
        startedDate: p.startedDate,
        expireDate: p.expireDate,
        planPrice: p.Plan?.price || null,
        planType: p.Plan?.type || null,
        planDuration: p.Plan?.duration || null,
      }))
    );

    // Sort latest first (by startedDate)
    salesData.sort((a, b) => new Date(b.startedDate) - new Date(a.startedDate));

    res.status(200).json({
      success: true,
      salesData,
    });
  } catch (error) {
    console.error("Sales Data Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

