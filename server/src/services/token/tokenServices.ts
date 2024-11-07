import jwt, { JwtPayload, Secret } from "jsonwebtoken";

// function to generate the token
const generateTokenFN = (payload: object): string => {

    try {
        const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY as Secret, { expiresIn: "7d" });
        return token;

    } catch (error: any) {
        console.log("token generate function error :", error);
        return error;
    }
}

// interafce to define the return type
interface ReturnTypes {
    isValid: boolean;
    token: JwtPayload
}

// function to validate the token
const tokenVerificationFN = (token: string): ReturnTypes => {

    try {
        const verification = jwt.verify(token, process.env.TOKEN_SECRET_KEY as Secret);
        return {
            isValid: true,
            token: verification as JwtPayload
        }

    } catch (error: any) {
        console.log("Token verification function error :", error);
        return error;
    }
}

export { generateTokenFN, tokenVerificationFN }