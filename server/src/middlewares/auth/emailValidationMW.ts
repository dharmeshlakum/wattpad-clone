import { Request, Response, NextFunction } from "express";
import userModel, { IUsers } from "../../models/users/userCollection";

// interface to implement the user inside request
interface CustomRequest extends Request {
    user?: IUsers
}

// middleware to handle the activation of account
const emailValidationMW = async (req: CustomRequest, res: Response, next: NextFunction) => {

    try {
        const { emailAddress } = req.cookies; // get email from the cookie

        if (!emailAddress) {
            res.status(404).json({
                success: false,
                message: "Can't find the cookie... try again later !"
            });
            return;
        }

        // check if the email address is registred or not before activate the account
        const emailData = await userModel.findOne({ emailAddress, isEmailVerified: false });
        if (!emailData) {
            res.status(400).json({
                success: false,
                message: "Email address is not registred or account is already activate !"
            });
            return;
        }

        req.user = emailData;
        next() // move to the next middleware

    } catch (error: any) {
        console.log("Email validation middleware error: ", error);
        res.status(500).json({
            success: false,
            message: "Internal server error !"
        });
    }
}

export default emailValidationMW;