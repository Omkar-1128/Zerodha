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

/* ===================== CORS (SIMPLE & RELIABLE) ===================== */
// Allow our Netlify app and localhost, echo others, and include credentials.
const allowedOrigins = [
  /\.netlify\.app$/,
  "https://courageous-lamington-58f1b4.netlify.app",
  "https://astonishing-panda-8254a4.netlify.app/",
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
app.options("*", cors());

/* ===================== Parsers / Cookies / Proxy ===================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Behind reverse proxy (Render) so secure cookies work
app.set("trust proxy", 1);

/* ===================== Database ===================== */
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

/* ===================== Health Check ===================== */
app.get("/health", (_req, res) => res.status(200).send("ok"));

/* ===================== API Endpoints ===================== */
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

/* ===================== Routers ===================== */
app.use("/", orderRouter);
app.use("/", router);

/* ===================== Root ===================== */
app.get("/", (_req, res) => {
  res.send("<h1> Welcome to Zerodha World </h1>");
});

/* ===================== Start Server ===================== */
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`Listening on http://0.0.0.0:${port}`);
});
