import { Request, Response, NextFunction } from "express";
import { userModel } from "../../models/users/userCollection";
import { passwordValidationFN } from "../../services/password/passwordServices";

// middleware to handle singup
const signupValidationMW = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const username = req.body.username;
        const emailAddress = req.body.emailAddress;
        const fullName = req.body.fullName;
        const password = req.body.password;

        // check if the all details come or not
        if (!username || !emailAddress || !fullName || !password) {
            res.status(400).json({
                success: false,
                message: "All fields are required !"
            });
            return;
        }

        // check if emailAddress is valid or not
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const gmailValidation = gmailRegex.test(emailAddress);
        if (!gmailValidation) {
            res.status(400).json({
                success: false,
                message: "Invalid email address !"
            });
            return;
        }

        // check if the password is valid or not
        const passwordValidation = passwordValidationFN(password);
        if (!passwordValidation.isValid) {
            res.status(400).json({
                success: false,
                message: passwordValidation.message
            });
            return;
        }

        // check if username is awailable or not
        const usernameData = await userModel.findOne({ username });
        if (usernameData) {
            res.status(409).json({
                success: false,
                message: "Username is already taken !"
            });
            return;
        }

        // check if email address is awailable or not
        const emailData = await userModel.findOne({ emailAddress });
        if (emailData) {
            res.status(409).json({
                success: false,
                message: "Email Address is already registred !"
            });
            return;
        }

        next();

    } catch (error: any) {
        console.log("Signup validation middleware error :", error);
        res.status(500).json({
            success: false,
            message: "Internal server error !",
            error: error
        });
    }
}

export { signupValidationMW }