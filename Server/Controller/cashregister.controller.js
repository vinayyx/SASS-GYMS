// controllers/cashRegisterController.js
import cashregister from "../Model/cashRegister.js";
import Member from "../Model/member.js";
import Plan from "../Model/plan.js";

// 1. Get all cash requests
export const getAllCashRequests = async (req, res) => {
  try {
    const requests = await cashregister.find().populate("plan.Plan");
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. Get cash request by ID
export const getCashRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await cashregister.findById(id);
    if (!request)
      return res.status(404).json({ success: false, message: "Request not found" });

    res.status(200).json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3. Approve cash request → move to Member collection
export const approveCashRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await cashregister.findById(id);
    if (!request)
      return res.status(404).json({ success: false, message: "Request not found" });

    // Find plan by type and duration from request.plan[0] if exists
    const planInfo = request.plan[0]; // assuming one plan per request
    if (!planInfo)
      return res.status(400).json({ success: false, message: "No plan info found" });

    console.log(planInfo.Plan)

    const planData = await Plan.findById(planInfo.Plan);

    if (!planData)
      return res.status(404).json({ success: false, message: "Plan not found" });

    const startedDate = new Date();
    const expireDate = new Date(startedDate);
    expireDate.setMonth(expireDate.getMonth() + parseInt(planData.duration));

    const memberPlan = {
      Plan: planData._id,
      paidAmount: planInfo.paidAmount,
      isFullPaid: planInfo.paidAmount >= planData.price,
      startedDate,
      expireDate,
      method: "Cash",
      transactionId: planInfo.transactionId || "",
    };

    // Generate memberId
    const lastMember = await Member.findOne().sort({ createdAt: -1 });
    let newMemberId = "M001";
    if (lastMember && lastMember.memberId) {
      const lastIdNum = parseInt(lastMember.memberId.slice(1));
      newMemberId = `M${(lastIdNum + 1).toString().padStart(3, "0")}`;
    }

    // Create new member
    const newMember = new Member({
      fullName: request.fullName,
      fatherName: request.fatherName,
      city: request.city,
      address: request.address,
      contactNumber: request.contactNumber,
      alternativeNumber: request.alternativeNumber,
      email: request.email,
      aadhaarNumber: request.aadhaarNumber,
      dateOfBirth: request.dateOfBirth,
      gender: request.gender,
      admissionDate: request.admissionDate,
      occupation: request.occupation,
      medicalHistory: request.medicalHistory,
      bloodGroup: request.bloodGroup,
      referral: request.referral,
      memberId: newMemberId,
      livePhoto: request.livePhoto,
      plan: [memberPlan],
    });

    await newMember.save();

    // Delete cash request after approval
    await cashregister.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Cash request approved and member created",
      data: newMember,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 4. Delete cash request
export const deleteCashRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await cashregister.findByIdAndDelete(id);
    if (!request)
      return res.status(404).json({ success: false, message: "Request not found" });

    res.status(200).json({ success: true, message: "Cash request deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
