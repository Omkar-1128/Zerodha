import mongoose from "mongoose";

const WatchlistSchema = new mongoose.Schema( {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    symbol: {
      type: String,
      required: true, 
      unique: true,
      uppercase: true,
    },
    price: {
      type: Number,
      required: true, 
    },
    percent: {
      type: String,
      default: "0.00%",
    },
    isDown: {
      type: Boolean, 
      default: false,
    },
    exchange: {
      type: String, 
      default: "",
    },
    currency: {
      type: String, 
      default: "USD",
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

export { WatchlistSchema };