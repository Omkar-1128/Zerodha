import mongoose from "mongoose";
import { WatchlistSchema } from "../schemas/WatchlistSchema.js";

const WatchlistModel = mongoose.model("Watchlist" , WatchlistSchema);

export { WatchlistModel };