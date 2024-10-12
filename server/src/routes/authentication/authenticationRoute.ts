import express, { Request, Response } from "express";
import { userModel, IUser } from "../../models/users/userCollection";
import { signupValidationMW } from "../../middlewares/authentication/signupValidation";
import { loginModel } from "../../models/login/loginCollection";
import loginValidationMW from "../../middlewares/authentication/loginValidation";
import { generateTokenFN } from "../../services/token/tokenServices";
import { getIpAddressFN } from "../../services/request/IPaddressFetching";

const authRouter = express.Router();

// interface to handle custom request
interface IAuthRequest extends Request {
    user?: IUser;
}

// signup api
authRouter.post("/auth/signup", signupValidationMW, async (req: Request, res: Response) => {

    try {
        const username = req.body.username;
        const emailAddress = req.body.emailAddress;
        const fullName = req.body.fullName;
        const password = req.body.password;

        // generate new user
        const user = new userModel({
            username,
            emailAddress,
            fullName,
            password
        });
        const saveData = await user.save();

        // generate token for the user
        const token = generateTokenFN({ id: saveData._id });
        const userAgent = req.headers["user-agent"];
        const ipAddress = getIpAddressFN(req);

        // generate new login document
        const login = new loginModel({
            userId: saveData._id,
            userAgent,
            ipAddress,
            token
        });
        await login.save();

        res.status(201).json({
            success: true,
            message: `new user created successfully`,
            token,
            user: {
                id: saveData._id,
                username: saveData.username,
                fullName: saveData.fullName,
                avatar: saveData.profilePicture
            }
        });

    } catch (error: any) {
        console.log("Signup api error :", error);
        res.status(500).json({
            success: false,
            message: "Internal server error !",
            error: error
        });
    }
});

// login api
authRouter.post("/auth/login", loginValidationMW, async (req: IAuthRequest, res: Response) => {

    try {
        const user = req.user;

        // check if the user data is fetching from the request
        if (!user) {
            res.status(500).json({
                success: false,
                message: "Internal server error !"
            });
            return;
        }

        // generate token for the user
        const token = generateTokenFN({ id: user._id });
        const userAgent = req.headers["user-agent"];
        const ipAddress = getIpAddressFN(req);

        // generate new login document
        const login = new loginModel({
            userId: user._id,
            userAgent,
            ipAddress,
            token
        });
        const saveData = await login.save();
        res.status(201).json({
            success: true,
            message: `new user created successfully`,
            token,
            user: {
                id: user._id,
                username: user.username,
                fullName: user.fullName,
                avatar: user.profilePicture
            }
        });

    } catch (error: any) {
        console.log("Signup api error :", error);
        res.status(500).json({
            success: false,
            message: "Internal server error !",
            error: error
        });
    }
});

export default authRouter;