import mongoose, { Schema, Document, model } from "mongoose";

// interfac to define the schema type
interface IChapter extends Document {
    title: string;
    userId: mongoose.Schema.Types.ObjectId;
    storyId: mongoose.Schema.Types.ObjectId;
    contentBlock: Array<{
        type: "text" | "image";
        content: string
    }>
    chapterOrder:number;
    isDeleted: boolean;
    isDraft: boolean;
    views: number;
    likes: mongoose.Schema.Types.ObjectId[];
    comments: mongoose.Schema.Types.ObjectId[];
    lastUpdate: Date;
    createdAt: Date;
}

const chapterCollectionSchema = new Schema<IChapter>({

    title: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },

    storyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stories",
        required: true
    },

    contentBlock: [{
        type: {
            type: String,
            enum: ["text", "image"],
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }],

    chapterOrder: {
        type: Number,
        required: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    isDraft: {
        type: Boolean,
        default: true
    },

    views: {
        type: Number,
        default: 0
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Likes"
    }],

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }],

    lastUpdate: {
        type: Date,
        default: Date.now
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const chapterModel = model("Chapters", chapterCollectionSchema);
export default chapterModel;