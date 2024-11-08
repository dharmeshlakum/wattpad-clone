import express from "express";
import cors from "cors";
import authRouter from "./routes/auth/authenticationRouter";

const app = express();
const port = process.env.SERVER_PORT || 5001;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    methods: "*"
}));

// routes
app.use(authRouter);

// listen
app.listen(port, () => {
    console.log("Server is running on port :", port);
});
