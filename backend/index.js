import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { HoldingModel } from "./model/HoldingModel.js";
import { PositionModel } from "./model/PositionModel.js";
import { OrderModel } from "./model/OrderModel.js";
import { WatchlistModel } from "./model/WatchlistModel.js";
import { User } from "./model/UserModel.js";

import { router } from "./Routes/AuthRoute.js";
import { orderRouter } from "./Routes/OrderRoute.js";

dotenv.config();

// Validate required environment variables
const requiredEnvVars = {
  atlas_url: process.env.atlas_url,
  TOKEN_KEY: process.env.TOKEN_KEY,
};

const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error("❌ Missing required environment variables:", missingVars.join(", "));
  console.error("Please set these in your Render environment variables.");
  process.exit(1);
}

const app = express();

/* ===================== CORS (SIMPLE & RELIABLE) ===================== */
// Allow our Netlify app and localhost, echo others, and include credentials.
const allowedOrigins = [
  /\.netlify\.app$/,
  "https://courageous-lamington-58f1b4.netlify.app",
  "https://astonishing-panda-8254a4.netlify.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.some((o) => (o instanceof RegExp ? o.test(origin) : o === origin))) {
        return callback(null, true);
      }
      // fallback: allow for now; tighten if needed
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    exposedHeaders: ["Set-Cookie"],
  })
);
// Note: app.options("*", cors()) removed - Express 5.x doesn't support "*" wildcard
// The global CORS middleware above already handles OPTIONS requests automatically

/* ===================== Parsers / Cookies / Proxy ===================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Behind reverse proxy (Render) so secure cookies work
app.set("trust proxy", 1);

/* ===================== Database ===================== */
const DB_URL = process.env.atlas_url;
async function connectDatabase() {
  try {
    if (!DB_URL) {
      throw new Error("Database URL is not defined");
    }
    await mongoose.connect(DB_URL, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    console.log("✅ Connected to Database");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    console.error("⚠️  Server will continue to run, but database operations will fail.");
    // Don't exit - let the server start even if DB fails
  }
}

// Connect to database (non-blocking)
connectDatabase();

/* ===================== Health Check ===================== */
app.get("/health", (_req, res) => res.status(200).send("ok"));

/* ===================== API Endpoints ===================== */
// Holdings
app.get("/getHoldings", async (_req, res) => {
  try {
    const allHoldings = await HoldingModel.find();
    res.json(allHoldings);
  } catch (error) {
    console.error("Error fetching holdings:", error);
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

// Positions
app.get("/getPositions", async (_req, res) => {
  try {
    const allPositions = await PositionModel.find();
    res.json(allPositions);
  } catch (error) {
    console.error("Error fetching positions:", error);
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

// Orders
app.get("/orders", async (_req, res) => {
  try {
    const allOrders = await OrderModel.find();
    res.json(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Users
app.get("/getUserDetails", async (_req, res) => {
  try {
    const userDetails = await User.find();
    res.json(userDetails);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
});

// Watchlist
app.get("/watchlist", async (_req, res) => {
  try {
    const allWatchlist = await WatchlistModel.find();
    res.json(allWatchlist);
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
});

/* ===================== Routers ===================== */
app.use("/", orderRouter);
app.use("/", router);

/* ===================== Root ===================== */
app.get("/", (_req, res) => {
  res.send("<h1> Welcome to Zerodha World </h1>");
});

/* ===================== Start Server ===================== */
const port = process.env.PORT || 8080;

try {
  app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server listening on http://0.0.0.0:${port}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
  });
} catch (error) {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
}
