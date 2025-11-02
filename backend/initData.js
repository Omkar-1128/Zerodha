import { HoldingModel } from "./model/HoldingModel.js";
import { holdings ,positions} from "../Dashboard/src/data/data.js";
import { PositionModel } from "./model/PositionModel.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

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
async function addHoldingData() {
  try {
    await HoldingModel.deleteMany({});
    await HoldingModel.insertMany(holdings);
    console.log("Holdings data saved to dataBase")
  } catch (e) {
    console.log("Error: " + e);
  }
};

async function addPositionsdata() {
    try {
        await PositionModel.deleteMany({});
        await PositionModel.insertMany(positions)
        console.log("Positions data saved to dataBase")
    } catch (e) {
        console.log("Error: " + e)
    }
};

addHoldingData();

addPositionsdata();