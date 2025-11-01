import mongoose from "mongoose";
import { PositionsSchema } from "../schemas/PositionSchema.js";

const PositionModel = mongoose.model("Position" , PositionsSchema);

export { PositionModel }