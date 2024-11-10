import mongoose, { Document, Schema, model } from "mongoose";

// interface to define the schema type
interface ILogin extends Document {
    userId: mongoose.Schema.Types.ObjectId,
    userAgent: string;
    ipAddress: string;
    token: string;
    loginAt: Date
}

const loginCollectionSchema = new Schema<ILogin>({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
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

    token: {
        type: String,
        required: true
    },

    loginAt: {
        type: Date,
        default: Date.now,
        index: {
            expireAfterSeconds: 60 * 60 * 24 * 7
        }
    }
});

const loginModel = model("Logins", loginCollectionSchema);
export default loginModel;