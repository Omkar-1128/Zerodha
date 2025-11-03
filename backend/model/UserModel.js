import mongoose from "mongoose";
import { UserSchema } from "../schemas/UserSchema.js";

const User = mongoose.model("user" , UserSchema);

export { User }