// routes/cashRegisterRoutes.js
import express from "express";
import {
  getAllCashRequests,
  getCashRequestById,
  approveCashRequest,
  deleteCashRequest,
} from "../Controller/cashregister.controller.js";

const router = express.Router();

router.get("/all", getAllCashRequests);
router.get("/getbyid/:id", getCashRequestById);
router.put("/approve/:id", approveCashRequest);
router.delete("delete/:id", deleteCashRequest);

export default router;
