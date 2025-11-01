import mongoose from "mongoose";
import { OrderSchema } from "../schemas/OrderSchema.js";

const OrderModel = mongoose.model("Order" , OrderSchema);

export { OrderModel };