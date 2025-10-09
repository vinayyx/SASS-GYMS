import Member from "../Model/member.js";
import Plan from "../Model/plan.js";
import Expense from "../Model/expense.js";

import moment from "moment";


export const getAllMembers = async (req, res) => {
  try {
    // Populate each plan's Plan reference to get the plan details (like name, type, duration)
    const members = await Member.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "plan.Plan",        // populate the nested Plan inside plan array
        select: "name type duration price", // choose the fields you want
      });

    const membersCount = await Member.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        members,
        membersCount,
      },
    });

    console.log(members);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// get total sales
export const getTotalSales = async (req, res) => {
  try {
    const result = await Member.aggregate([
      { $unwind: "$plan" }, // Flatten plans
      {
        $group: {
          _id: {
            month: { $month: "$plan.startedDate" },
            year: { $year: "$plan.startedDate" },
          },
          monthlySales: { $sum: "$plan.paidAmount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Fix months array (0 sales by default)
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

    // Fill sales data in months
    result.forEach((r) => {
      const monthIndex = r._id.month - 1; // 1=Jan, 12=Dec
      months[monthIndex].sale += r.monthlySales;
    });

    // Total sales
    const totalSales = result.reduce((sum, r) => sum + r.monthlySales, 0);

    res.status(200).json({
      success: true,
      totalSales,
      monthlyData: months,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Get plans expiring in next 7 days
export const getExpiringPlans = async (req, res) => {
  try {
    const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);

    // Find members with at least one plan expiring in the next 7 days
    const members = await Member.find({
      "plan.expireDate": { $gte: today, $lte: sevenDaysLater },
    }).populate("plan.Plan"); // populate plan details

    const totalExpiring = members.length;

    res.status(200).json({
      success: true,
      totalExpiring,
      members,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get total expense
export const getTotalExpense = async (req, res) => {
  try {
    const result = await Expense.aggregate([
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
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET MEMBERS DATA WHOS IS ONBOADING A LAST 7 DAYS
export const onboardAtLast7Days = async (req, res) => {
  try {
    // Current date
    const today = new Date();

    // 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    // Find members whose admissionDate is between sevenDaysAgo and today
    const members = await Member.find({
      admissionDate: { $gte: sevenDaysAgo, $lte: today },
    });

    res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get monthly Data for Sales Graph

export const salesGraph = async (req, res) => {
  try {
    // Get all expenses and members
    const expenses = await Expense.find();
    const members = await Member.find();

    // Month mapping (0-based JS months -> Jan..Dec)
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Initialize monthly data
    let monthlyData = months.map((m) => ({
      month: m,
      sale: 0,
      expense: 0,
    }));

    // 1️ Aggregate Expenses month-wise
    expenses.forEach((exp) => {
      const monthIndex = new Date(exp.createdAt).getMonth();
      monthlyData[monthIndex].expense += exp.amount;
    });

    // 2️ Aggregate Sales month-wise
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
    const members = await Member.find().populate("plan.Plan");

    // Flatten members + plans into salesData
    let salesData = members.flatMap((member) =>
      member.plan.map((p) => ({
        id:member._id,
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

    //  Sort latest first (by startedDate)
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

