import { Request, Response, NextFunction } from "express";
import { tokenVerificationFN } from "../../services/token/tokenServices";

// interface to implement the token in request
interface CustomRequest extends Request {
    userId: string
}

// token validation middleware
const tokenValidationMW = (req: CustomRequest, res: Response, next: NextFunction) => {

    try {
        const token = req.header("auth-token");
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Token is required !"
            });
            return
        }

        // verify the token
        const verification = tokenVerificationFN(token);
        if (verification.isValid && verification.token?.exp && verification.token.exp * 1000 > Date.now()) {
            req.userId = verification.token.id;
            next(); // move to the next middleware

        } else {
            res.status(401).json({
                success: false,
                message: "Token is not awailbe or expired !"
            });
            return
        }

    } catch (error: any) {
        console.log("Token validation middleware error :", error);
        res.status(500).json({
            success: false,
            message: "Internal server error !"
        });
    }
}

export default tokenValidationMW;