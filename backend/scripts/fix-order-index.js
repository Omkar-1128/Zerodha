import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.atlas_url;

async function fixOrderIndex() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(DB_URL);
    console.log("✅ Connected to MongoDB");

    const db = mongoose.connection.db;
    const ordersCollection = db.collection("orders");

    // List all indexes
    console.log("\n📋 Current indexes on 'orders' collection:");
    const indexes = await ordersCollection.indexes();
    indexes.forEach((index) => {
      console.log(`  - ${index.name}:`, JSON.stringify(index.key));
    });

    // Drop the problematic symbol_1 index if it exists
    try {
      console.log("\n🗑️  Attempting to drop 'symbol_1' index...");
      await ordersCollection.dropIndex("symbol_1");
      console.log("✅ Successfully dropped 'symbol_1' index");
    } catch (error) {
      if (error.code === 27 || error.codeName === "IndexNotFound") {
        console.log("ℹ️  Index 'symbol_1' does not exist (already removed)");
      } else {
        throw error;
      }
    }

    // List indexes after cleanup
    console.log("\n📋 Indexes after cleanup:");
    const newIndexes = await ordersCollection.indexes();
    newIndexes.forEach((index) => {
      console.log(`  - ${index.name}:`, JSON.stringify(index.key));
    });

    console.log("\n✅ Index cleanup complete!");
    console.log("You can now place orders without the duplicate key error.");
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("\n🔌 Disconnected from MongoDB");
    process.exit(0);
  }
}

fixOrderIndex();
