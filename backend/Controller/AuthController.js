import { User } from "../model/UserModel.js";
import { createSecretToken } from "../util/SecretToken.js"
import bcrypt from "bcryptjs";

export const Signup = async (req, res, next) => {
  try {
    const { fullname ,username , email, mobileNo , password, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({fullname ,username , email, mobileNo , password, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};


export const Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if(!username || !password ){
      return res.json({message:'All fields are required'})
    }
    const isEmail = username.includes("@");
    const user = isEmail? await User.findOne({ email: username }) : await User.findOne({ username });
    if(!user){
      return res.json({message:'Incorrect password or username/email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or username/email' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({ message: "User logged in successfully", success: true });
     next()
  } catch (error) {
    console.error(error);
  }
}