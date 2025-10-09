import express from "express";
import {
  createCashRequest,
  getAllCashRequests,
  approveCashRequest,
  rejectCashRequest
} from "../Controller/cashRequestControler.js";

const router = express.Router();





router.post("/create", createCashRequest);
router.put("/approve/:id", approveCashRequest);
router.put("/reject/:id", rejectCashRequest);
router.get("/all", getAllCashRequests); // get all cash requests

export default router;
