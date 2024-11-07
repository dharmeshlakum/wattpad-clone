import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const protocol = process.env.DATABASE_PROTOCOL || "";
const username = process.env.DATABASE_USERNAME || "";
const password = process.env.DATABASE_PASSWORD || "";
const url = process.env.DATABASE_URL || "";
const name = process.env.DATABASE_NAME || "";

const connectionString = protocol + "://" + username + ":" + password + "@" + url + "/" + name;
const databaseConnection = mongoose.connect(connectionString).then(() => {
    console.log("Database connected successfully !");

}).catch((error: Error) => {
    console.log("Database connection error :", error.stack);
})
