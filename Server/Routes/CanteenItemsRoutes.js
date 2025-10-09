import express from "express";
import {
  addItem,
  getAllItems,
  updateItem,
  deleteItem,
  getItemById,
} from "../Controller/CanteenItem.Controller.js";
import upload from "../Config/multer.js";

const router = express.Router();

// POST -> Add new item
router.post("/add", upload.single("itemImage"), addItem);

// GET -> Fetch all items
router.get("/getall", getAllItems);

// PUT -> Update item by id
router.post("/update/:id",upload.single('itemImage'), updateItem);

// DELETE -> Delete item by id
router.delete("/delete/:id", deleteItem);

// GET BY ID
router.get("/getitembyid/:id", getItemById);

export default router;
