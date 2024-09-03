import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        content: {
            type: String,
            required: true,
            minlength: [20, 'Content is too short.'],
        },
        postImage: {
            type: String,
        },
        likes: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
            },
        ],
        comments: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
                text: {
                    type: String,
                    required: [true, 'Comment cant be empty.'],
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
