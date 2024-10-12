import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { tokenVerificationFN } from "../../services/token/tokenServices";

// interface to handle the custom request
interface ITokenRequest extends Request {
    token?: JwtPayload
}

// middleware to check if the token is valid or not
const tokenValidationMW = (req: ITokenRequest, res: Response, next: NextFunction) => {

    try {
        const token = req.header("auth-token");
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Token is required !"
            });
            return;
        }

        const tokenVerification = tokenVerificationFN(token);
        if (!tokenVerification.isValid) {
            res.status(401).json({
                success: false,
                message: "Token is invalid | expired !"
            });
            return;
        }

        req.token = tokenVerification.payload;
        next();

    } catch (error: any) {
        console.log("token validation middleware error :", error);
        res.status(500).json({
            success: false,
            message: "Internal server error !",
            error: error
        });
    }
}

export { tokenValidationMW }