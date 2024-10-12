import { Request, Response, NextFunction } from "express";
import { IUser, userModel } from "../../models/users/userCollection";
import { passwordVerificationFN } from "../../services/password/passwordServices";
import { loginModel } from "../../models/login/loginCollection";
import { getIpAddressFN } from "../../services/request/IPaddressFetching";
import { generateTokenFN } from "../../services/token/tokenServices";

// custom request interface
interface ILoginRequest extends Request {
    user?: IUser
}

// middleware to handle login
const loginValidationMW = async (req: ILoginRequest, res: Response, next: NextFunction) => {

    try {

        const emailAddress = req.body.emailAddress;
        const password = req.body.password;

        // check if all data is comming or not
        if (!emailAddress || !password) {
            res.status(400).json({
                success: false,
                message: "All fields are required !"
            });
            return;
        }

        // check if the email address is registred or not
        const user = await userModel.findOne({ emailAddress, isDeleted: false });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "Email address is not registred !"
            });
            return;
        }

        // check if password is correct or not
        const verification = await passwordVerificationFN(password, user.password);
        if (!verification) {
            res.status(401).json({
                success: false,
                message: "Invalid password !"
            });
            return;
        }

        // check if user is alredy login or not
        const loginData = await loginModel.findOne({ userId: user._id });
        if (loginData) {
            const ipAddress = getIpAddressFN(req);
            const userAgent = req.headers["user-agent"];

            // check if the current user's IP address is same as the registred
            if (loginData.userAgent === userAgent && loginData.ipAddress === ipAddress) {
                const token = generateTokenFN({ id: user._id });
                await loginModel.updateOne({ _id: loginData._id }, {
                    $set: {
                        token,
                        loginAt: Date.now()
                    }
                });

                res.status(200).json({
                    success: true,
                    message: `${user.username} login successfully !`,
                    token,
                    user: {
                        id: user._id,
                        username: user.username,
                        fullName: user.fullName,
                        avatar: user.profilePicture
                    }
                });
                return;

            } else {
                res.status(409).json({
                    success: false,
                    message: "user is already login on the other device !"
                });
                return;
            }

        } else {
            req.user = user;
            next();
        }

    } catch (error: any) {
        console.log("Login validation middleware error :", error);
        res.status(500).json({
            success: false,
            message: "Internal server error !",
            error: error
        });
    }
}

export default loginValidationMW;