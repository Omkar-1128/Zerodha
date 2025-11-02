import express from "express";
import mongoose from "mongoose";
import { HoldingModel } from "./model/HoldingModel.js";
import { PositionModel } from "./model/PositionModel.js";
import dotenv from "dotenv";

import bodyParser from "body-parser";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const DB_URL = process.env.atlas_url;

async function main() {
  await mongoose.connect(DB_URL);
}

main()
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((e) => {
    console.log("DataBase connection error");
    console.log("Error: " + e);
  });

// API Endpoints for Holdings and Positions
// API for Holding
app.get("/getHoldings" , async (req , res) => {
    let allHoldings = await HoldingModel.find();
    res.json(allHoldings)
})

// API for Positions
app.get("/getPositions" , async (req , res) => {
    let allPositions = await PositionModel.find();
    res.json(allPositions);
})

app.get("/", (req, res) => {
  res.send("<h1> Welcome to Zerodha World </h1>");
});
