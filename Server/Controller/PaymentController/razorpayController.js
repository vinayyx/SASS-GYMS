import { razorpay } from "../../Config/razorpay.js";


 export const payment = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const options = {
      amount: amount,
      currency: currency,
      receipt: "receipt_" + Date.now(),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};
