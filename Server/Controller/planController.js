import Plan from "../Model/plan.js";
import Member from "../Model/member.js";
import moment from "moment";
import mongoose from "mongoose";

// CERATE NEW PLAN
export const createPlan = async (req, res) => {
  const gymId = req.gym.id;
  const { price, duration, type, keyPoints } = req.body;

  try {
    if (!price || !duration || !type || !keyPoints) {
      return res
        .status(401)
        .json({ success: false, message: "Please required All feild" });
    }

    if (!gymId) {
      return res
        .status(401)
        .json({ success: false, message: "Please Login first" });
    }

    const newPlan = await Plan({
      price,
      duration,
      type,
      keyPoints,
      gymId,
    });

    await newPlan.save();

    res.status(201).json(newPlan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET ALL PLAN FOR PERTICULER GYM
export const getAllPlanByGymId = async (req, res) => {
  const gymId = req.gym.id;
  try {
    const plans = await Plan.find({ gymId: gymId });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all plans
export const getAllPlans = async (req, res) => {
  const gymId = req.gym.id;
  if (!gymId) {
    return res.status(400).json({
      success: false,
      message: "Gym ID not found in request",
    });
  }

  try {
    // Fetch all plans for this gym
    const plans = await Plan.find({ gymId });

    // Get total count
    const totalCount = await Plan.countDocuments({ gymId });

    const response = {
      totalPlans: totalCount,
      plans: plans,
    };

    res.status(200).json({
      success: true,
      message: "Plans fetched successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching plans",
      error: error.message,
    });
  }
};

// Get all plans by type (query: ?type=Cardio)
export const getPlansByType = async (req, res) => {
  const gymId = req.gym?.id;
  if (!gymId) {
    return res.status(400).json({
      success: false,
      message: "Gym ID not found in request",
    });
  }

  try {
    const { type } = req.query;
    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Type is required in query",
      });
    }

    const plans = await Plan.find({ type, gymId });

    res.status(200).json({
      success: true,
      message: "Plans fetched successfully",
      data: plans,
    });
  } catch (error) {
    console.error("Error fetching plans by type:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching plans",
      error: error.message,
    });
  }
};

// Get a single plan by ID
export const getPlanById = async (req, res) => {
  try {
    const gymId = req.gym?.id; // Extract gymId from auth
    if (!gymId) {
      return res.status(400).json({
        success: false,
        error: "Gym ID not found in request",
      });
    }

    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid Plan ID" });
    }

    // Find plan that matches both ID and gymId
    const plan = await Plan.findOne({ _id: id, gymId });

    if (!plan) {
      return res.status(404).json({ success: false, error: "Plan not found for this gym" });
    }

    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    console.error("Error fetching plan by ID:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


// Update a plan
export const updatePlan = async (req, res) => {
  try {
    const gymId = req.gym?.id; // Get gymId from auth
    if (!gymId) {
      return res.status(400).json({
        success: false,
        error: "Gym ID not found in request",
      });
    }

    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid Plan ID" });
    }

    // Find plan belonging to this gym
    const plan = await Plan.findOne({ _id: id, gymId });
    if (!plan) {
      return res.status(404).json({
        success: false,
        error: "Plan not found for this gym",
      });
    }

    // Update plan fields
    Object.keys(req.body).forEach((key) => {
      plan[key] = req.body[key];
    });

    await plan.save(); // Run validators automatically

    res.status(200).json({
      success: true,
      message: "Plan updated successfully",
      data: plan,
    });
  } catch (error) {
    console.error("Error updating plan:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete a plan
export const deletePlan = async (req, res) => {
  try {
    const gymId = req.gym?.id; // Get gymId from auth
    if (!gymId) {
      return res.status(400).json({
        success: false,
        error: "Gym ID not found in request",
      });
    }

    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid Plan ID" });
    }

    // Find and delete plan belonging to this gym
    const plan = await Plan.findOneAndDelete({ _id: id, gymId });

    if (!plan) {
      return res.status(404).json({
        success: false,
        error: "Plan not found for this gym",
      });
    }

    res.status(200).json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting plan:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// TOP SELING PLAN
export const getTopSellingPlans = async (req, res) => {
  const gymId = req.gym?.id;
  if (!gymId) {
    return res.status(400).json({
      success: false,
      message: "Gym ID not found in request",
    });
  }

  try {
    const plans = await Member.aggregate([
      { $match: { gymId: new mongoose.Types.ObjectId(gymId) } }, // filter by gymId
      { $unwind: "$plan" }, // each member plan as separate row
      {
        $group: {
          _id: "$plan.Plan", // Plan ObjectId
          subscribers: { $sum: 1 }, // Count members per plan
        },
      },
      {
        $lookup: {
          from: "plans", // Plan collection
          localField: "_id",
          foreignField: "_id",
          as: "planDetails",
        },
      },
      { $unwind: "$planDetails" },
      {
        $project: {
          _id: 0,
          name: {
            $concat: [
              { $ifNull: ["$planDetails.type", "Unknown Type"] },
              " - ",
              { $ifNull: ["$planDetails.duration", "Unknown Duration"] },
            ],
          },
          price: "$planDetails.price",
          subscribers: 1,
        },
      },
      { $sort: { subscribers: -1 } },
    ]);

    res.status(200).json({
      success: true,
      message: "Top selling plans fetched successfully",
      data: plans,
    });
  } catch (error) {
    console.error("Error in getTopSellingPlans:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching top selling plans",
      error: error.message,
    });
  }
};


export const getPlanDates = async (req, res) => {
  try {
    const gymId = req.gym?.id;
    if (!gymId) {
      return res
        .status(400)
        .json({ success: false, message: "Gym ID not found in request" });
    }

    const { type, duration, startDate } = req.query;

    if (!type || !duration) {
      return res
        .status(400)
        .json({ success: false, message: "type and duration are required" });
    }

    const validDurations = ["1 Month", "3 Months", "6 Months", "12 Months"];
    if (!validDurations.includes(duration)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid duration" });
    }

    // ✅ Fetch plan only for this gym
    const plan = await Plan.findOne({ type, duration, gymId });
    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found for this gym" });
    }

    const price = plan.price;
    const planId = plan._id;

    // Parse start date if provided, else use today
    let start = startDate
      ? moment(startDate, "DD-MM-YYYY")
      : moment().startOf("day");

    if (!start.isValid()) {
      return res.status(400).json({
        success: false,
        message: "Invalid start date format. Use DD-MM-YYYY",
      });
    }

    const monthsToAdd = parseInt(duration.split(" ")[0]); // extract number
    const end = moment(start).add(monthsToAdd, "months").subtract(1, "day");

    res.status(200).json({
      success: true,
      planId,
      type,
      duration,
      price,
      startDate: start.format("DD-MM-YYYY"),
      endDate: end.format("DD-MM-YYYY"),
    });
  } catch (error) {
    console.error("Error in getPlanDates:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


export const renewPlan = async (req, res) => {
  try {
    const gymId = req.gym?.id;
    if (!gymId) {
      return res.status(400).json({
        success: false,
        message: "Gym ID not found in request",
      });
    }

    const {
      email,
      planId,
      paidAmount,
      isFullPaid,
      startedDate,
      expireDate,
      method,
      transactionId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = req.body;

    // Required fields validation
    if (
      !email ||
      !planId ||
      paidAmount === undefined ||
      isFullPaid === undefined ||
      !startedDate ||
      !expireDate ||
      !method ||
      !transactionId ||
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Email, planId, paidAmount, isFullPaid, startedDate, expireDate, method, transactionId, razorpayOrderId, razorpayPaymentId, and razorpaySignature are required",
      });
    }

    // Member find by email AND gymId
    const member = await Member.findOne({ email, gymId: gymId });
    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found with this email for this gym",
      });
    }


      const plan = await Plan.findOne({ _id :planId , gymId: gymId });
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan is not found for this gym",
      });
    }

    // Push new plan into plans array
    member.plan.push({
      Plan: planId,
      paidAmount: paidAmount || 0,
      isFullPaid: isFullPaid || false,
      startedDate,
      expireDate,
      renewedOn: new Date(),
      method,
      transactionId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });

    await member.save();

    res.status(200).json({
      success: true,
      message: "Plan renewed successfully",
      member,
    });
  } catch (error) {
    console.error("Renew Plan Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while renewing plan",
      error: error.message,
    });
  }
};


export const getTopSellingPlanMonthly = async (req, res) => {
  try {
    const gymId = req.gym?.id;
    if (!gymId) {
      return res.status(400).json({
        success: false,
        message: "Gym ID not found in request",
      });
    }

    const plans = await Member.aggregate([
      { $match: { gymId: new mongoose.Types.ObjectId(gymId) } }, // filter by gym
      { $unwind: "$plan" },
      {
        $group: {
          _id: {
            planId: "$plan.Plan",
            month: { $month: "$plan.startedDate" }, // Month number 1-12
          },
          subscribers: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "plans",
          localField: "_id.planId",
          foreignField: "_id",
          as: "planDetails",
        },
      },
      { $unwind: "$planDetails" },
      {
        $project: {
          month: "$_id.month",
          planName: {
            $concat: ["$planDetails.type", " - ", "$planDetails.duration"],
          },
          subscribers: 1,
        },
      },
    ]);

    // All months from Jan → Dec
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    // Initialize months array with empty plans
    const monthlyData = monthNames.map((m) => ({ month: m }));

    // Fill actual subscriber data
    plans.forEach((p) => {
      const monthIndex = p.month - 1; // 0-based index
      const monthRow = monthlyData[monthIndex];
      monthRow[p.planName] = (monthRow[p.planName] || 0) + p.subscribers;
    });

    // Ensure months with no plan data still have plan keys as 0 if needed
    const allPlanNames = [...new Set(plans.map((p) => p.planName))];
    monthlyData.forEach((month) => {
      allPlanNames.forEach((plan) => {
        if (!month[plan]) month[plan] = 0;
      });
    });

    res.status(200).json({ success: true, data: monthlyData });
  } catch (error) {
    console.error("Error in getTopSellingPlanMonthly:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};






export const planDropdown = async (req, res) => {
  const gymId = req.gym.id;
  if (!gymId) {
    return res.status(400).json({
      success: false,
      message: "Gym ID not found in request",
    });
  }

  try {
    // Get distinct plan types for the specific gym
    const planTypes = await Plan.distinct("type", { gymId });

    res.status(200).json({
      success: true,
      message: "Plan types fetched successfully",
      data: planTypes,
    });
  } catch (err) {
    console.error("Error fetching plan types:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching plan types",
      error: err.message,
    });
  }
};
