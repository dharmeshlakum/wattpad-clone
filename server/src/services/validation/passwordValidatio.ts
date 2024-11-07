// interface to define the return types
interface ReturnTypes {
    isValid: boolean;
    message: string;
}
// function to validate the password
const passwordValidationFN = (password: string): ReturnTypes => {

    if (password.length < 8) {
        return {
            isValid: false,
            message: "Password length should be greater then 8 characters !"
        }
    }

    if (!/[a-zA-Z]/.test(password)) {
        return {
            isValid: false,
            message: "Password must contain one character and one numerical value !"
        }
    }

    if (!/[0-9]/.test(password)) {
        return {
            isValid: false,
            message: "Password must contain one character and one numerical value !"
        }
    }

    return {
        isValid: true,
        message: "Password is valid !"
    }
}

export default passwordValidationFN