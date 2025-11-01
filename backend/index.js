import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import { HoldingModel } from "./model/HoldingModel.js";
import { holdings ,positions} from "../Dashboard/src/data/data.js";
import { PositionModel } from "./model/PositionModel.js";
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

// insert the starter data
app.get("/addHoldingData", async (req, res) => {
  try {
    await HoldingModel.deleteMany({});
    await HoldingModel.insertMany(holdings);
    console.log("Holdings data saved to dataBase")
    res.send("Holdings Data Saved SuccessFully");
  } catch (e) {
    res.send("Error: " + e);
  }
});

app.get("/addPositionData" , async (req , res) => {
    try {
        await PositionModel.deleteMany({});
        await PositionModel.insertMany(positions)
        console.log("Positions data saved to dataBase")
        res.send("Positions Data Saved SuccessFully");
    } catch (e) {
        res.send("Error: " + e)
    }
})

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
