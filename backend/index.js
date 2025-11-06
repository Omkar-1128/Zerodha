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

const app = express();

// ===== CORS (allow Netlify, local dev, and handle preflight) =====
const allowedOrigins = [
  "https://courageous-lamington-58f1b4.netlify.app", // frontend
  "https://storied-hamster-46f20c.netlify.app",      // dashboard
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000"
];

// optionally allow all Netlify preview subdomains
const isAllowed = (origin) => {
  if (!origin) return true; // allow server-to-server, Postman, curl, etc.
  if (allowedOrigins.includes(origin)) return true;
  try {
    const u = new URL(origin);
    if (u.hostname.endsWith(".netlify.app")) return true; // preview deploys
  } catch (_) {}
  return false;
};

const corsOptions = {
  origin: (origin, cb) => (isAllowed(origin) ? cb(null, true) : cb(new Error("Not allowed by CORS"))),
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // respond to all preflight requests

// ===== Parsers / cookies =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// behind reverse proxy (Render) so cookies with `secure: true` work correctly
app.set("trust proxy", 1);

// ===== Database =====
const DB_URL = process.env.atlas_url;
async function main() {
  await mongoose.connect(DB_URL);
}
main()
  .then(() => console.log("Connected to Database"))
  .catch((e) => {
    console.log("DataBase connection error");
    console.log("Error: " + e);
  });

// ===== Health check (optional, useful on Render) =====
app.get("/health", (_req, res) => res.status(200).send("ok"));

// ===== API Endpoints =====

// Holdings
app.get("/getHoldings", async (_req, res) => {
  const allHoldings = await HoldingModel.find();
  res.json(allHoldings);
});

// Positions
app.get("/getPositions", async (_req, res) => {
  const allPositions = await PositionModel.find();
  res.json(allPositions);
});

// Orders
app.get("/orders", async (_req, res) => {
  const allOrders = await OrderModel.find();
  res.json(allOrders);
});

// Users
app.get("/getUserDetails", async (_req, res) => {
  const userDetails = await User.find();
  res.json(userDetails);
});

// Watchlist
app.get("/watchlist", async (_req, res) => {
  const allWatchlist = await WatchlistModel.find();
  res.json(allWatchlist);
});

// Order routes & auth routes
app.use("/", orderRouter);
app.use("/", router);

// Root
app.get("/", (_req, res) => {
  res.send("<h1> Welcome to Zerodha World </h1>");
});

// ===== Start server (bind 0.0.0.0 for Render) =====
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`Listening on http://0.0.0.0:${port}`);
});
