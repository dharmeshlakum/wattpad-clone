import jwt, { JwtPayload, Secret } from "jsonwebtoken";

// function to generate the token
const generateTokenFN = (payload: object): string => {

    try {
        const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY as Secret, {
            expiresIn: "7d"
        });
        return token;

    } catch (error: any) {
        console.log("Generate token function error :", error);
        return error;
    }
}

// return typs for the token verification function
interface ITokenVerification {
    isValid: boolean;
    payload?: JwtPayload;
    error?: string;
}

// function to verify token
const tokenVerificationFN = (token: string): ITokenVerification => {

    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY as Secret)
        return {
            isValid: true,
            payload: payload as JwtPayload
        };

    } catch (error: any) {
        console.log("Generate token function error :", error);
        return {
            isValid: false,
            error
        };
    }
}

export { generateTokenFN, tokenVerificationFN }