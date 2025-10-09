import Order from "../Model/order.js";
import CanteenItem from "../Model/canteenItem.js";

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { personName, phoneNumber, items } = req.body;

    if (!personName || !phoneNumber || !items || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // 🔹 Step 1: Count quantity of each item id
    const itemCountMap = {};
    items.forEach((id) => {
      itemCountMap[id] = (itemCountMap[id] || 0) + 1;
    });

    // 🔹 Step 2: Fetch unique items from DB
    const itemDocs = await CanteenItem.find({ _id: { $in: Object.keys(itemCountMap) } });

    // 🔹 Step 3: Calculate total price with quantity
    const totalPrice = itemDocs.reduce((acc, item) => {
      const qty = itemCountMap[item._id.toString()] || 0;
      return acc + item.itemPrice * qty;
    }, 0);

    // 🔹 Step 4: Create new order
    const newOrder = await Order.create({
      personName,
      phoneNumber,
      items,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};


// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "pending" })
      .populate("items") // populate CanteenItem details
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};


export const getTotalorder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items") // populate CanteenItem details
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export const getAllCompletedOrder = async (req, res) => {
  try {
    const orders = await Order.find({ status: "completed" })
      .populate("items") // populate CanteenItem details
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export const getAllCancelledApi = async (req, res) => {
  try {
    const orders = await Order.find({ status: "cancelled" })
      .populate("items") // populate CanteenItem details
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const allowedStatus = ["pending", "completed", "cancelled"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid status",
      });
    }

    const data = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Status updated successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update status",
      error: error.message,
    });
  }
};
