import CashRequest from "../Model/cashRequest.js";
import Member from "../Model/member.js";
import Plan from "../Model/plan.js";

export const createCashRequest = async (req, res) => {
  const {
    memberId,
    planId,
    price,
    startedDate,
    expireDate,
    Name,
    planName,
    email,
    contact,
    plantype,
    duration
  } = req.body;
  try {
    const request = await CashRequest.create({
      memberId,
      planId,
      price,
      startedDate,
      expireDate,
      Name,
      planName,
      email,
      contact,
      plantype,
      duration
    });
    res.json({ success: true, request });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllCashRequests = async (req, res) => {
  try {
    const requests = await CashRequest.find()
      .sort({ requestedAt: -1 }) // latest first
      .populate("memberId", "fullName email contactNumber")
      .populate("planId", "type price duration");

    res.json({ success: true, requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Approve a cash request
export const approveCashRequest = async (req, res) => {
  try {
    const request = await CashRequest.findById(req.params.id);
    if (!request)
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });

    request.status = "Approved";
    await request.save();

    // Update member's plan
    const member = await Member.findById(request.memberId);
    member.plan.push({
      Plan: request.planId,
      paidAmount: request.price,
      isFullPaid: true,
      startedDate: request.startedDate,
      expireDate: request.expireDate,
      method: "Cash",
      transactionId: "Cash",
    });
    await member.save();

    res.json({
      success: true,
      message: "Cash request approved and plan renewed!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Reject a cash request
export const rejectCashRequest = async (req, res) => {
  try {
    const request = await CashRequest.findById(req.params.id);
    if (!request)
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });

    request.status = "Rejected";
    await request.save();

    res.json({ success: true, message: "Cash request rejected!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
