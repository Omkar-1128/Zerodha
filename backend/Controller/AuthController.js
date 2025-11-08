import { User } from "../model/UserModel.js";
import { createSecretToken } from "../util/SecretToken.js";
import bcrypt from "bcryptjs";

// choose cookie options based on environment
// Render sets NODE_ENV=production, but we also check for Render-specific env vars
const isProd = process.env.NODE_ENV === "production" || !!process.env.RENDER;

/**
 * Cross-site cookie rules:
 * - On Render (HTTPS): secure: true, sameSite: "none"
 * - In local dev (http://localhost): secure: false, sameSite: "lax"
 */
const cookieOptions = {
  httpOnly: true,                     // keep token out of JS
  secure: isProd,                     // true on Render (HTTPS)
  sameSite: isProd ? "none" : "lax",  // "none" required for cross-site
  path: "/",                          // send on all routes
  maxAge: 7 * 24 * 60 * 60 * 1000,    // 7 days
  // Don't set domain - let browser handle it for cross-site cookies
};

export const Signup = async (req, res) => {
  try {
    const { fullname, username, email, mobileNo, password, createdAt } = req.body;

    if (!fullname || !username || !email || !mobileNo || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // hash password (recommended)
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      username,
      email,
      mobileNo,
      password: hashed,
      createdAt,
    });

    const token = createSecretToken(user._id);
    
    // Set cookie for same-site requests (backward compatibility)
    res.cookie("token", token, cookieOptions);
    
    // Log cookie setting for debugging
    console.log("Cookie set for signup - Options:", {
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      path: cookieOptions.path,
    });

    // ALSO return token in response body for cross-site usage
    return res.status(201).json({
      success: true,
      message: "User signed up successfully",
      token: token, // Add token to response
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        mobileNo: user.mobileNo,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const isEmail = username.includes("@");
    const user = isEmail
      ? await User.findOne({ email: username })
      : await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = createSecretToken(user._id);
    
    // Set cookie for same-site requests (backward compatibility)
    res.cookie("token", token, cookieOptions);
    
    // Log cookie setting for debugging
    console.log("Cookie set for login - Options:", {
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      path: cookieOptions.path,
    });

    // ALSO return token in response body for cross-site usage
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: token, // Add token to response
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
