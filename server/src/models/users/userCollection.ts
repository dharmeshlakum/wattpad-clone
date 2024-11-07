import mongoose, { Document, Schema, model } from "mongoose";
import { dataHashingFN } from "../../services/hashing/dataHashing";
import { generateDefaultImg } from "../../services/images/defaultUserImage";

// interface to define the types of the schema
export interface IUsers extends Document {
    username: string;
    fullName: string;
    emailAddress: string;
    password: string;
    profilePicture: string;
    coverPicture: string;
    about: string;
    myStories: mongoose.Schema.Types.ObjectId[];
    followers: mongoose.Schema.Types.ObjectId[];
    followings: mongoose.Schema.Types.ObjectId[];
    likes: mongoose.Schema.Types.ObjectId[];
    conversation: mongoose.Schema.Types.ObjectId[];
    lastView: mongoose.Schema.Types.ObjectId[];
    blockedUsers: mongoose.Schema.Types.ObjectId[];
    emailNotifications: boolean;
    isEmailVerified: boolean
    isDeleted: Boolean;
    languagePreference: string;
    type: string;
    subscriptionStatus: string;
    contentPreferences: IContentPreference;
    joinedDate: Date;
}

// interface to define the content types
interface IContentPreference {
    matureContent: boolean
}

const userCollectionShema = new Schema<IUsers>({

    username: {
        type: String,
        required: true,
        unique: true
    },

    fullName: {
        type: String,
        required: true
    },

    emailAddress: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    profilePicture: {
        type: String
    },

    coverPicture: {
        type: String,
        default: "deafult_cover_picture.jpg"
    },

    about: {
        type: String,
        default: ""
    },

    myStories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stroies"
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
        ref: "Likes"
    }],

    conversation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Converstaion"
    }],

    lastView: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stories"
    }],

    blockedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],

    isEmailVerified: {
        type: Boolean,
        default: false
    },

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
        enum: ["English", "Spanish", "Mandarin Chinese", "Hindi", "Arabic", "Portuguese", "Bengali", "Russian", "Japanese", "Punjabi", "German", "French", "Turkish", "Korean", "Italian", "Vietnamese", "Urdu", "Persian", "Polish", "Dutch", "Indonesian", "Thai", "Swedish", "Greek", "Czech"],
        default: "English"
    },

    type: {
        type: String,
        enum: ["user", "admin", "super-admin"],
        default: "user"
    },

    subscriptionStatus: {
        type: String,
        enum: ["free", "premium"],
        default: "free"
    },

    contentPreferences: {
        matureContent: {
            type: Boolean,
            default: false
        }
    },

    joinedDate: {
        type: Date,
        default: Date.now
    }
});

//pre middleware
userCollectionShema.pre<IUsers>("save", async function (next) {

    // encrypt the password before saving data
    if (this.password) {
        const hashcode = await dataHashingFN(this.password);
        this.password = hashcode;
    }
    this.profilePicture = generateDefaultImg(this.fullName);
    next();
});

const userModel = model("Users", userCollectionShema);
export default userModel;