import bcrypt from "bcrypt";

// function to encrypt the password
const passwordHashingFN = async (password: string): Promise<string> => {

    try {
        const salt = await bcrypt.genSalt(10);
        const hashcode = await bcrypt.hash(password, salt);
        return hashcode;

    } catch (error: any) {
        console.log("Password hashing function error :", error.message || error);
        return error;
    }
}

// function to verify the password
const passwordVerificationFN = async (password: string, hashcode: string): Promise<boolean> => {

    try {
        const verification = await bcrypt.compare(password, hashcode);
        return verification;

    } catch (error: any) {
        console.log("Password Verification function error :", error.message || error);
        return error;
    }
}

// interface to define the return types for the password validation function
interface ValidationReturn {
    isValid: boolean;
    message: string
}

// function to encrypt the password
const passwordValidationFN = (password: string): ValidationReturn => {

    try {
        if (password.length < 8) {
            return {
                isValid: false,
                message: "Password length should be greater then 6 !"
            }
        }

        if (!/[a-zA-Z]/.test(password)) {
            return {
                isValid: false,
                message: "Password must contain one character and one numaric value"
            }
        }

        if (!/[0-9]/.test(password)) {
            return {
                isValid: false,
                message: "Password must contain one character and one numaric value"
            }
        }

        return {
            isValid: true,
            message: "Password is valid."
        }

    } catch (error: any) {
        console.log("Password Verification function error :", error.message || error);
        return {
            isValid: false,
            message: "Internal server error !"
        };
    }
}

export { passwordHashingFN, passwordValidationFN, passwordVerificationFN }