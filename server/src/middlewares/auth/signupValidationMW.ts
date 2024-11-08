import { Request, Response, NextFunction } from "express";
import userModel from "../../models/users/userCollection";
import passwordValidationFN from "../../services/validation/passwordValidatio";

// signup validation middleware
const signupValidationMW = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { username, password, emailAddress, fullName } = req.body;
        const regax = /@gmail\.com/;

        // check if all data is comming from the client side
        if (!username || !password || !emailAddress || !fullName) {
            res.status(400).json({
                success: false,
                message: "All fields are required !"
            });
            return;
        }

        // check if the email address is valid
        if (!regax.test(emailAddress)) {
            res.status(400).json({
                success: false,
                message: "Invalid email address !"
            });
            return;
        }

        // check if the password is valid
        const passwordValid = passwordValidationFN(password);
        if (!passwordValid.isValid) {
            res.status(400).json({
                success: false,
                message: passwordValid.message
            });
            return;
        }

        // check if the username is awailable or not
        const usernameData = await userModel.findOne({ username });
        if (usernameData) {
            res.status(409).json({
                success: false,
                message: "Username is not awailable !"
            });
            return;
        }

        // check if email address is already registred or not
        const emailData = await userModel.findOne({ emailAddress, isDeleted: false });
        if (emailData) {
            res.status(409).json({
                success: false,
                message: "Email address is already registred !"
            });
            return;
        }

        next(); // move to the next middleware

    } catch (error: any) {
        console.log("Signup validation middleware error :", error);
        res.status(500).json({
            success: false,
            message: "Internal server error !"
        });
    }
}

export default signupValidationMW;