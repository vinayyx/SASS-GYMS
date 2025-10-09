import CanteenItem from "../Model/canteenItem.js";

//  Add New Item
export const addItem = async (req, res) => {
  try {
    const { itemName, itemPrice, itemDescription, category, isAvailable } = req.body;
    const itemImage = req.file ? req.file.path : null; // agar image upload ho

    const newItem = await CanteenItem.create({
      itemName,
      itemPrice,
      itemDescription,
      category,
      isAvailable,
      itemImage
    });

    res.status(201).json({ success: true, message: "Item added successfully", data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add item", error: error.message });
  }
};


//  Get All Items
export const getAllItems = async (req, res) => {
  try {
    const items = await CanteenItem.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch items", error: error.message });
  }
};

//  Update Item
export const updateItem = async (req, res) => {
  try {
    const { itemName, itemPrice, itemDescription, category, isAvailable } = req.body;
    const updateData = {
      itemName,
      itemPrice: Number(itemPrice),
      itemDescription,
      category,
      isAvailable: isAvailable === "true",
    };

    if (req.file) updateData.itemImage = req.file.path;

    const updatedItem = await CanteenItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({ success: true, message: "Item updated successfully", data: updatedItem });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed", error: error.message });
  }
};


//  Delete Item
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await CanteenItem.findByIdAndDelete(id);

    if (!deletedItem) return res.status(404).json({ success: false, message: "Item not found" });

    res.status(200).json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete item", error: error.message });
  }
};

// Get single item by ID
export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find item by ID
    const item = await CanteenItem.findById(id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch item", error: error.message });
  }
};

