import express from "express";
import { login, createSuperAdmin } from "../Controller/adminController.js";

const router = express.Router();

router.post("/login", login);
router.post("/create", createSuperAdmin);


export default router;
