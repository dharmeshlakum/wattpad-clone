import mongoose, { Document, Schema, model } from "mongoose";
import { dataHashingFN } from "../../services/hashing/dataHashing";

// interface to define the schema types
interface IOtp {
    emailAddress: string;
    otp: string;
    userAgent: string;
    ipAddress: string;
    time: Date
}

const otpCollectionSchema = new Schema<IOtp>({

    emailAddress: {
        type: String,
        required: true
    },

    otp: {
        type: String,
        required: true
    },

    userAgent: {
        type: String,
        required: true
    },

    ipAddress: {
        type: String,
        required: true
    },

    time: {
        type: Date,
        default: Date.now,
        index: {
            expireAfterSeconds: 60 * 10
        }
    }
});

// pre middleware
otpCollectionSchema.pre<IOtp>("save", async function (next) {
    if (this.otp) {
        const hashcode = await dataHashingFN(this.otp);
        this.otp = hashcode;
    }
    next();
});

const otpModel = model("Otps", otpCollectionSchema);
export default otpModel;