import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Your Fullname is required"],
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  mobileNo: {
    type: String,
    required: [true, "Your mobile number is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

export { UserSchema }
