import { User } from "../model/UserModel.js";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config();

export const userVerification = (req, res) => {
  const token = req.cookies.token;
  
  // Log for debugging (remove in production if needed)
  console.log("Verification request - Cookie present:", !!token);
  console.log("Verification request - Origin:", req.headers.origin);
  
  if (!token) {
    console.log("Verification failed: No token in cookies");
    return res.json({ status: false });
  }
  
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      console.log("Verification failed: Token invalid", err.message);
      return res.json({ status: false });
    } else {
      try {
        const user = await User.findById(data.id);
        if (user) {
          console.log("Verification successful for user:", user.username);
          return res.json({ status: true, user: user.username });
        } else {
          console.log("Verification failed: User not found");
          return res.json({ status: false });
        }
      } catch (dbError) {
        console.error("Verification failed: Database error", dbError);
        return res.json({ status: false });
      }
    }
  });
};