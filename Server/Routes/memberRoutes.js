import express from "express";
import { sendOtp, verifyOtp , createMember ,getMemberByEmail , getAllMembers , getMemberById , updateMember, deleteMember , getUserOnboardDetails, getUpcomingPlanExpiries, getAllMembersBYGym } from "../Controller/memberContoller.js";
import upload from "../Config/multer.js";
import { protect } from "../middlewares/authMiddleware.js";



const router = express.Router();


router.post("/send-otp",  sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/create-member", protect,  upload.single("livePhoto"),  createMember);
router.get("/get-all-member", protect,   getAllMembersBYGym);


router.get("/get-all-member",  getAllMembers);
router.get("/get-member-by-id/:id",  getMemberById);
router.put("/update/:id",  updateMember);
router.delete("/delete/:id",  deleteMember);
router.get("/getuseronboardDetails", protect,  getUserOnboardDetails);
router.get("/get-expire-details", protect,  getUpcomingPlanExpiries);
router.get("/get-member-by-email", protect,  getMemberByEmail); 








export default router;
