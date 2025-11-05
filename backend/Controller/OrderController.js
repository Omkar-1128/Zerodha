import { OrderModel } from "../model/OrderModel.js";

export const createOrder = async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    if (!name || !qty || !price || !mode) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields." });
    }

    const order = await OrderModel.create({
      name,
      qty: Number(qty),
      price: Number(price),
      mode,
    });

    return res.json({ success: true, message: "Order placed.", order });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Server error while placing order." });
  }
};
