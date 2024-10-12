import mongoose, { Document, Schema, model } from "mongoose";
import { passwordHashingFN } from "../../services/password/passwordServices";
import { generateDefaultImg } from "../../services/defaultImages/defaultUserProfilePicture";

// Interface to describe the types of the user collection
export interface IUser extends Document {
    username: string;
    fullName: string;
    password: string;
    emailAddress: string;
    about: string;
    profilePicture: string;
    coverPicture: string;
    myStories: mongoose.Schema.Types.ObjectId[];
    favoriteStories: mongoose.Schema.Types.ObjectId[];
    conversation: mongoose.Schema.Types.ObjectId[];
    followers: mongoose.Schema.Types.ObjectId[];
    followings: mongoose.Schema.Types.ObjectId[];
    likes: mongoose.Schema.Types.ObjectId[];
    lastViewedStories: mongoose.Schema.Types.ObjectId[];
    blockedUsers?: mongoose.Schema.Types.ObjectId[];
    emailNotifications: boolean;
    isDeleted: boolean;
    languagePreference: string;
    type: string;
    contentPreferences: IContentPreference
    joinedDate: Date;
}

// interface for the types of the content
interface IContentPreference {
    matureStories: boolean
}

// user collection shcema
const userCollectionSchema = new Schema<IUser>({

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    fullName: {
        type: String,
        required: true,
    },

    emailAddress: {
        type: String,
        required: true,
    },

    about: {
        type: String,
        default: "",
    },

    profilePicture: {
        type: String,
        default: ""
    },

    coverPicture: {
        type: String,
        default: ""
    },

    myStories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stories"
    }],

    favoriteStories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stories"
    }],

    conversation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    }],

    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],

    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stories"
    }],

    lastViewedStories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stories"
    }],

    blockedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],

    emailNotifications: {
        type: Boolean,
        default: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    languagePreference: {
        type: String,
        enum: ["en", "gu", "hi"],
        default: "en"
    },

    type: {
        type: String,
        enum: ["user", "premium-user", "admin", "super-admin"],
        default: "user"
    },

    contentPreferences: {
        matureStories: {
            type: Boolean,
            default: true
        }
    },

    joinedDate: {
        type: Date,
        default: () => Date.now()
    }
});

// pre middleware to encrypt the password & generate default image for the user before save
userCollectionSchema.pre<IUser>("save", async function (next) {

    try {
        if (this.password) {
            const hashcode = await passwordHashingFN(this.password);
            this.password = hashcode;
        }
        const imgName = generateDefaultImg(this.username);
        this.profilePicture = imgName;
        next();

    } catch (error: any) {
        console.log("User collection pre middleware error :", error.message || error);
        next(error);
    }
});

// model
const userModel = model<IUser>("Users", userCollectionSchema);
export { userModel }