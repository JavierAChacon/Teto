import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();    

connectDB();


app.listen(4000, () => console.log("Running on port 4000..."));