import mongoose, { Schema, Document, model } from "mongoose";

// interface to define the types of the login collection
export interface ILogin extends Document {

    userId: mongoose.Schema.Types.ObjectId;
    token: string;
    userAgent: string;
    ipAddress: string;
    loginAt: Date;
}

// login collection schema
const loginCollectionSchema = new Schema<ILogin>({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },

    token: {
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

    loginAt: {
        type: Date,
        default: () => Date.now()
    }
});

// model
const loginModel = model<ILogin>("Logins", loginCollectionSchema);

export { loginModel }