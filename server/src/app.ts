import express from "express";
import cors from "cors";
import { join } from "path";
import authRouter from "./routes/authentication/authenticationRoute";

const app = express();
const port = process.env.PORT || 5000;

// path setups
const profilePicturesPath = join(__dirname, "./assets/profilePictures");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    methods: "*"
}));
app.use("/user/profile-pic", express.static(profilePicturesPath));

// routes
app.use(authRouter);

// server listen
app.listen(port, ()=>{
    console.log("Server is running on port :", port);
});