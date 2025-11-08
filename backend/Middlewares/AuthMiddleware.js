import { User } from "../model/UserModel.js";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config();

export const userVerification = (req, res) => {
  // Enhanced debugging
  console.log("verify cookies:", req.cookies);
  console.log("Verification request - Origin:", req.headers.origin);
  console.log("Verification request - Headers:", {
    cookie: req.headers.cookie,
    authorization: req.headers.authorization,
    origin: req.headers.origin,
    referer: req.headers.referer
  });
  
  // Try to get token from multiple sources (for cross-site compatibility)
  let token = req.cookies.token; // First try cookie (same-site)
  
  if (!token && req.headers.authorization) {
    // Try Authorization header (cross-site)
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
      console.log("Token found in Authorization header");
    }
  }
  
  if (!token) {
    console.log("Verification failed: No token in cookies or Authorization header");
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