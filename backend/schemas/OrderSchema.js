import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    mode: { type: String, enum: ["BUY", "SELL"], required: true },
  },
  { timestamps: true }
)

export { OrderSchema };