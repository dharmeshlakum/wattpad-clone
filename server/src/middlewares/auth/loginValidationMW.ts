import { Request, Response, NextFunction } from "express";
import loginModel from "../../models/logins/loginCollection";
import userModel, { IUsers } from "../../models/users/userCollection";
import getIPaddress from "../../services/request/ipAddress";
import { generateTokenFN } from "../../services/token/tokenServices";

// interface to implement user data into request
interface CustomRequest extends Request {
    user?: IUsers
}

// login validation middleware
const loginValidationMW = async (req: CustomRequest, res: Response, next: NextFunction) => {

    try {
        const { emailAddress, password } = req.body;

        // check if all the data is comming from the client side
        if (!emailAddress || !password) {
            res.status(400).json({
                success: false,
                message: "All fields are required !"
            });
            return;
        }

        // check if email address is register or not
        const user = await userModel.findOne({
            emailAddress,
            isDeleted: false,
        });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "Email address is not registred !"
            });
            return;
        }

        // check if th email address is verified or not
        if (!user?.isEmailVerified) {
            res.status(401).json({
                success: false,
                message: "Email verification is required !"
            });
            return;
        }

        // check if the user is already login on other device
        const loginData = await loginModel.findOne({ userId: user._id });
        const userAgent = req.headers["user-agent"];
        const ipAddress = getIPaddress(req);

        if (loginData) {
            if (loginData.ipAddress === ipAddress && loginData.userAgent === userAgent) {
                const token = generateTokenFN({ id: user._id });
                await loginData.updateOne({ _id: loginData._id }, {
                    $set: {
                        token,
                        loginAt: Date.now
                    }
                });

                res.status(200).json({
                    success: true,
                    message: "User login successfully !",
                    userId: user._id,
                    token
                });

            } else {
                res.status(409).json({
                    success: false,
                    message: "User is already login on other device !"
                });
                return;
            }

        } else {
            req.user = user;
            next(); // move to nect middleware
        }

    } catch (error: any) {
        console.log("Login validation middleware error :", error);
        res.status(500).json({
            success: false,
            message: "Internal server error !"
        });
    }
}

export default loginValidationMW;