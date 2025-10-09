import express from "express";
import { 
    markAttendance,
    getAttendanceByDate,
    getAttendanceById ,
    getAllAttendanceRush
} from "../Controller/attendanceController.js";

const router = express.Router();

router.post("/markAttendance", markAttendance);
router.get("/getAttendanceByDate", getAttendanceByDate);
router.get("/getAttendanceById/:id", getAttendanceById);
router.get("/getAllAttendanceRush", getAllAttendanceRush);


export default router;