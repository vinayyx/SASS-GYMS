import Member from "../Model/member.js";
import Attendance from "../Model/attendance.js";

// POST - check-in / check-out
export const markAttendance = async (req, res) => {
  try {
    const { memberId, status } = req.body;

    if (!memberId || !status) {
      return res
        .status(400)
        .json({ message: "memberId and status are required" });
    }

    // find member
    const member = await Member.findOne({ memberId: memberId });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // get today's date range
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    if (status === "IN") {
      // check if already checked in today
      const alreadyIn = await Attendance.findOne({
        member: member._id,
        checkInTime: { $gte: startOfDay, $lte: endOfDay },
      });

      if (alreadyIn) {
        return res.status(400).json({ message: "Already checked in today" });
      }

      const attendance = await Attendance.create({
        member: member._id,
        status: "IN",
        checkInTime: new Date(), // backend time
      });

      return res.status(201).json({
        message: "Checked in successfully",
        checkInTime: attendance.checkInTime,
      });
    }

    if (status === "OUT") {
      // must have checked in today and not checked out
      const todayIn = await Attendance.findOne({
        member: member._id,
        checkInTime: { $gte: startOfDay, $lte: endOfDay },
        status: "IN",
        checkOutTime: null,
      });

      if (!todayIn) {
        return res
          .status(400)
          .json({ message: "No active check-in found for today" });
      }

      todayIn.checkOutTime = new Date(); // backend time
      todayIn.status = "OUT";
      await todayIn.save();

      return res.status(200).json({
        message: "Checked out successfully",
        checkOutTime: todayIn.checkOutTime,
      });
    }

    return res
      .status(400)
      .json({ message: "Invalid status. Must be IN or OUT" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// GET attendance by date and memberId
export const getAttendanceByDate = async (req, res) => {
  try {
    const { date, memberId } = req.query;

    // if no date provided, take today's date
    const queryDate = date ? new Date(date) : new Date();

    const startOfDay = new Date(queryDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(queryDate);
    endOfDay.setHours(23, 59, 59, 999);

    // build base query
    const query = {
      checkInTime: { $gte: startOfDay, $lte: endOfDay },
    };

    // if memberId is provided (custom field)
    if (memberId) {
      const member = await Member.findOne({ memberId: memberId });
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      query.member = member._id;
    }

    const records = await Attendance.find(query).populate(
      "member",
      "fullName memberId"
    );

    res.status(200).json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getAttendanceById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    const attendance = await Attendance.findById(id).populate(
      "member",
      "fullName memberId"
    );
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    res.status(200).json(attendance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// time slots definend
const timeSlots = [
  { label: "6-7 AM", start: 6, end: 7 },
  { label: "7-8 AM", start: 7, end: 8 },
  { label: "8-9 AM", start: 8, end: 9 },
  { label: "9-10 AM", start: 9, end: 10 },
  { label: "10-11 AM", start: 10, end: 11 },
  { label: "11-12 PM", start: 11, end: 12 },
  { label: "12-1 PM", start: 12, end: 13 },
  { label: "1-2 PM", start: 13, end: 14 },
  { label: "2-3 PM", start: 14, end: 15 },
  { label: "3-4 PM", start: 15, end: 16 },
  { label: "4-5 PM", start: 16, end: 17 },
  { label: "5-6 PM", start: 17, end: 18 },
  { label: "6-7 PM", start: 18, end: 19 },
  { label: "7-8 PM", start: 19, end: 20 },
  { label: "8-9 PM", start: 20, end: 21 },
  { label: "9-10 PM", start: 21, end: 22 },
];

export const getAllAttendanceRush = async (req, res) => {
  try {
    // saare attendance records lao
    const allAttendance = await Attendance.find().populate(
      "member",
      "fullName memberId"
    );

    if (!allAttendance || allAttendance.length === 0) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    // time slot ka counter bnao
    const rushData = timeSlots.map((slot) => ({
      time: slot.label,
      members: 0,
    }));

    // loop and count
    allAttendance.forEach((record) => {
      const checkIn = new Date(record.checkInTime); // apne schema me jis field ka naam h usko use karna
      const hour = checkIn.getHours();

      // check kis slot me fall karta h
      const slot = timeSlots.find((s) => hour >= s.start && hour < s.end);
      if (slot) {
        const slotIndex = rushData.findIndex((r) => r.time === slot.label);
        if (slotIndex !== -1) {
          rushData[slotIndex].members += 1;
        }
      }
    });

    return res.status(200).json({
      success: true,
      totalRecords: allAttendance.length,
      rushData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
