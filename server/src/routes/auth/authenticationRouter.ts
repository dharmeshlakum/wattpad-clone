import express, { Request, Response } from "express";
import userModel, { IUsers } from "../../models/users/userCollection";
import otpModel from "../../models/otps/otpCollection";
import signupValidationMW from "../../middlewares/auth/signupValidationMW";
import getIPaddress from "../../services/request/ipAddress";
import sendMailFN from "../../services/mail/sendMail";
import emailValidationMW from "../../middlewares/auth/emailValidationMW";
import { generateTokenFN } from "../../services/token/tokenServices";
import loginModel from "../../models/logins/loginCollection";
import { dataVerificationFN } from "../../services/hashing/dataHashing";

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
        const otp = Math.floor(1000 + Math.random() * 9000);
        const ipAddress: string | undefined = getIPaddress(req);
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
        const message = `Dear user\n\nuse ${otp} to activate you account ! This otp will be expired in next 10 minutes\n\nif you did't request for the otp then kindly ignore this message.`
        sendMailFN(emailAddress, subject, message);

        res.cookie("emailAddress", emailAddress, {
            maxAge: 1000 * 60 * 10,
            httpOnly: true
        });

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
// interfac to implement user
interface CustomRequest extends Request {
    user?: IUsers
}

// activate account
authRouter.post("/auth/activate", emailValidationMW, async (req: CustomRequest, res: Response) => {

    try {
        const { emailAddress } = req.cookies;
        const { user } = req;
        const { otp } = req.body;

        if (!otp) {
            res.status(400).json({
                success: false,
                message: "OTP is required !"
            });
            return;
        }

        // check if the otps are awailable or not
        const otpData = await otpModel.find({ emailAddress }).sort({ time: -1 });
        if (otpData.length === 0) {
            res.status(404).json({
                success: false,
                message: "No OTP awailable.... try again !"
            });
            return;
        }

        // match the otp to activate the account
        const userAgent = req.headers["user-agent"];
        const ipAddress = getIPaddress(req);

        // 1) match the otp
        const otpMatch = await dataVerificationFN(String(otp), otpData[0].otp)
        if (!otpMatch) {
            res.status(401).json({
                success: false,
                message: "Wrong OTP..."
            });
            return;
        }

        // 2) match the ip address and the userAgent
        if (otpData[0].ipAddress !== ipAddress || otpData[0].userAgent !== userAgent) {
            res.status(401).json({
                success: false,
                message: "IP address or User-Agent mismatch. Please try again from the same device and network."
            });
        }

        const result = await userModel.updateOne({ emailAddress, isEmailVerified: false }, {
            $set: {
                isEmailVerified: true
            }
        });

        if (result.modifiedCount === 0) {
            res.status(400).json({
                success: false,
                message: "Email is either already verified or the user does not exist."
            });

        } else {
            await otpModel.deleteMany({ emailAddress })
            // generate token for the login
            const token: string = generateTokenFN({ id: user?._id });
            const loginData = new loginModel({
                token,
                userId: user?._id,
                userAgent,
                ipAddress
            });
            await loginData.save();

            res.status(200).json({
                success: true,
                message: "Email successfully verified.",
                userId: user?._id,
                token
            });
        }

    } catch (error: any) {
        console.log("Account activation function error :", error);
        res.status(500).json({
            success: false,
            message: "Internal server error !"
        });
    }
});

export default authRouter;