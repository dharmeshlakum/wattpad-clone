import bcrypt from "bcrypt";

// function to encrypt the data
const dataHashingFN = async (data: string): Promise<string> => {

    try {
        const salt = await bcrypt.genSalt(10);
        const hashcode = await bcrypt.hash(data, salt);
        return hashcode;

    } catch (error: any) {
        console.log("Data hashing function error :", error);
        return error;
    }
}

// function to compare the data with encrypted data
const dataVerificationFN = async (data: string, hashcode: string): Promise<boolean> => {

    try {
        const verification = await bcrypt.compare(data, hashcode);
        return verification;

    } catch (error: any) {
        console.log("Data verification function error :", error);
        return error;
    }
}

export { dataHashingFN, dataVerificationFN }