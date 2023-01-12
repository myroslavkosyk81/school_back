import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
            // unique: true,
        },
        subj: {
            type: Array,
            default: [],
        },
        grade: {
            type: String,
            required: true,
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            unique: true,
        },
        imageUrl: {
            type: String,
        },
    },
    {
        timestamps: true
    },
    );
 export default mongoose.model('Post', PostSchema);