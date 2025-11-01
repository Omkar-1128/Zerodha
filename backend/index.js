import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
const app = express();
dotenv.config(); 
const port = 8080;

app.listen(port , () => {
    console.log(`Listening on port ${port}`)
})

const DB_URL = process.env.atlas_url;

async function main() {
    await mongoose.connect(DB_URL)
}

main()
.then(() => {
    console.log("Connected to Database")
})
.catch((e) => {
    console.log("DataBase connection error")
    console.log("Error: " + e)
}) 

// Trying to access the data from database Zerodha_Data
// Step 1 : Creating Schema 

const userSchema = new mongoose.Schema({
    name: String,
    Marks: Number,
    city: String
})


// step 2 : Creating Model

const User = mongoose.model("User" , userSchema)

async function getData() {
    let users = await User.find();
    let n = users.length;

    for (let i = 0 ; i < n ; i++) {
        console.log(users[i].name);
    }
}

getData();