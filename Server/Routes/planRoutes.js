import express from "express";
import {
  createPlan,
  getAllPlans,
  getPlansByType,
  getPlanById,
  updatePlan,
  deletePlan,
  getTopSellingPlans,
  getPlanDates,
  renewPlan,
  getTopSellingPlanMonthly,
  planDropdown,
  getAllPlanByGymId,
} from "../Controller/planController.js";

import {protect} from "../middlewares/authMiddleware.js"

const router = express.Router();

// CRUD routes
router.post("/create", protect, createPlan);
router.get("/getPlanByGym", protect, getAllPlanByGymId); //GET ALL PLAN BY GYM
router.get("/all", protect, getAllPlans); // get all
router.get("/plansDropdown", protect, planDropdown); // get plans dropdown
router.get("/by-type", protect, getPlansByType); // get by type
router.get("/top-plan", protect, getTopSellingPlans); // get top seeling plan
router.get("/get-plan-by-id/:id", protect, getPlanById); // get single by id
router.put("/update-plan-by-id/:id",protect ,  updatePlan); // update by id
router.delete("/delete-plan-by-id/:id", protect, deletePlan); // delete by id
router.get("/get-Start-end-Date", protect, getPlanDates); // get plans for dropdown
router.get("/getallplanforplangraph",protect, getTopSellingPlanMonthly); // get plans for dropdown
router.post("/renewplan", protect, renewPlan); // get Renew Plan api










export default router;
