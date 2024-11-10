import mongoose, { Schema, Document, model } from "mongoose";

// interface to define the schema types
interface IStories extends Document {
    title: string;
    author: mongoose.Schema.Types.ObjectId;
    coverPicture: string;
    description: string;
    chapters: mongoose.Schema.Types.ObjectId[]
    category: string;
    copyright: string;
    status: string;
    views: number;
    tags: string[];
    chaptersPublished: Number;
    totalChapters: Number;
    contentWarnings: string;
    likes: mongoose.Schema.Types.ObjectId[];
    language: string;
    isDeleted: boolean;
    isDraft: boolean;
    isMature: boolean;
    lastUpdated: Date;
    createdAt: Date;
}

const storyCollectionSchema = new Schema<IStories>({

    title: {
        type: String,
        default: "Default title - write your own"
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },

    coverPicture: {
        type: String,
        default: "default-cover-picture.jpg"
    },

    description: {
        type: String,
        maxlength: 250,
        default: ""
    },

    chapters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapters"
    }],

    category: {
        type: String,
        enum: ["adventure", "fantasy", "romance", "mystery", "thriller", "science fiction", "historical fiction", "horror", "paranormal", "young adult", "teen fiction", "action", "drama", "comedy", "chicklit", "fanfiction", "new adult", "lgbtq+", "poetry", "non-fiction", "short story", "urban", "vampire", "werewolf", "spiritual", "general"],
        default: "general"
    },

    copyright: {
        type: String,
        enum: [
            "All Rights Reserved",
            "Public Domain",
            "Creative Commons - Attribution",
            "Creative Commons - Attribution-NonCommercial",
            "Creative Commons - Attribution-NonCommercial-NoDerivatives",
            "Creative Commons - Attribution-ShareAlike",
            "Creative Commons - Attribution-NonCommercial-ShareAlike",
            "No Copyright - Free to Use",
            "Educational Use Only",
            "Fanfiction - Non-Commercial"
        ],
        default: "All Rights Reserved"
    },

    status: {
        type: String,
        enum: ["ongoing", "completed"],
        default: "ongoing"
    },

    views: {
        type: Number,
        default: 0
    },

    tags: [{
        type: String,
        default: []
    }],

    chaptersPublished: {
        type: Number,
        default: 0
    },

    totalChapters: {
        type: Number,
        default: 0
    },

    contentWarnings: [{
        type: String,
        enum: ["violence", "explicit_language", "sexual_content", "drug_use", "mental_health"]
    }],

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Likes"
    }],

    language: {
        type: String,
        enum: ["English", "Spanish", "Mandarin Chinese", "Hindi", "Arabic", "Portuguese", "Bengali", "Russian", "Japanese", "Punjabi", "German", "French", "Turkish", "Korean", "Italian", "Vietnamese", "Urdu", "Persian", "Polish", "Dutch", "Indonesian", "Thai", "Swedish", "Greek", "Czech"],
        default: "English"
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    isDraft: {
        type: Boolean,
        default: false
    },

    isMature: {
        type: Boolean,
        default: false
    },

    lastUpdated: {
        type: Date,
        default: Date.now
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const storyModel = model("Stories", storyCollectionSchema);
export default storyModel;