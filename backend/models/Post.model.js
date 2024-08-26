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
        name: {
            type: String,
        },
        avatar: {
            type: String,
        },
        postImage: {
            type: String,
        },
        postVideo: {
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
                name: {
                    type: String,
                },
                avatar: {
                    type: String,
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
