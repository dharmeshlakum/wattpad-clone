import express, { Request, Response } from "express";
import userModel from "../../models/users/userCollection";
import otpModel from "../../models/otps/otpCollection";
import signupValidationMW from "../../middlewares/auth/signupValidationMW";
import getIPaddress from "../../services/request/ipAddress";
import sendMailFN from "../../services/mail/sendMail";

const authRouter = express.Router();

// sign api
authRouter.post("/auth/signup", signupValidationMW, async (req: Request, res: Response) => {

    try {
        const { username, password, emailAddress, fullName } = req.body;

        // create new user
        const user = new userModel({
            emailAddress,
            username,
            password,
            fullName
        });
        await user.save();

        // generate otp
        const otp = Math.floor(Math.random() * 9999 - 1000);
        const ipAddress = getIPaddress(req);
        const userAgent = req.headers["user-agent"];
        const saveOtp = new otpModel({
            otp,
            emailAddress,
            userAgent,
            ipAddress
        });
        await saveOtp.save();

        // send otp to the gamil
        const subject = "activating account";
        const message = `Dear user\n user ${otp} to activate you account !\n\nif you did't request for the otp then kindly ignore this message.`
        sendMailFN(emailAddress, subject, message);

        res.status(201).json({
            success: true,
            message: "User created successfully !"
        })

    } catch (error: any) {
        console.log("Signup api error :", error);
        res.status(500).json({
            success: false,
            message: "Internal server error !"
        });
    }
});

export default authRouter;