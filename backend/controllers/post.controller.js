import Post from '../models/Post.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import uploadOnCloudinary from '../utils/cloudinary.js';
import User from '../models/User.model.js';

// Create posts....
export const createPost = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { content, name, avatar } = req.body;
    if (!content) {
        throw new ApiError(400, 'Content is required for the post.');
    }
    let postVideoPath;
    if (
        req.files &&
        Array.isArray(req.files.postVideo) &&
        req.files.postVideo.length > 0
    ) {
        postVideoPath = req.files.postVideo[0].path;
    }
    let postImagePath;
    if (
        req.files &&
        Array.isArray(req.files.postImage) &&
        req.files.postImage.length > 0
    ) {
        postImagePath = req.files.postImage[0].path;
    }
    const postImageURL = await uploadOnCloudinary(postImagePath);
    const postVideoURL = await uploadOnCloudinary(postVideoPath);
    const post = await Post.create({
        author: _id,
        content,
        postImage: postImageURL || '',
        postVideo: postVideoURL || '',
    });
    if (!post) {
        throw new ApiError(500, 'Error occur while creating post.');
    }
    res.status(201).json(new ApiResponse(201, 'Post created', post));
});

// Get all post....
export const getAllPosts = asyncHandler(async (req, res) => {
    const allPosts = await Post.find();
    if (!allPosts) {
        throw new ApiError(404, 'No post found.');
    }
    res.status(200).json(new ApiResponse(200, 'All post', allPosts));
});

// Get post by id....
export const getPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, 'Id is required for finding specific post.');
    }
    const post = await Post.findById(id);
    if (!post) {
        throw new ApiError(404, 'Post not found with this id.');
    }
    res.status(200).json(new ApiResponse(200, 'Post found.', post));
});

// Delete post... ❌
export const deletePost = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
        throw new ApiError(404, 'Post not found.');
    }
    const user = await User.findById(_id);
    if (!user) {
        throw new ApiError(404, 'User not found.');
    }
    if (post.author.toString() !== _id.toString()) {
        throw new ApiError(401, 'Unauthorized request.');
    }
    const deleted = await Post.deleteOne({ _id: id });
    if (!deleted) {
        throw new ApiError(500, 'Error while deleting post');
    }
    res.status(200).json(
        new ApiResponse(200, 'Post deleted successfuly.', deleted)
    );
});

// Like and like post 👍
export const likeAndUnlikePost = asyncHandler(async (req, res) => {
    // Steps
    // Only login user cant like post
    // Take login user id from cookies
    // Take the id of the post from req.params;
    // Check if the post exist
    // Check if the user already exist in the likes array
    // If not add in it ----> like👍
    // If yes remove it -----> dislike👎
    const { _id } = req.user;
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, 'ID is required for the post');
    }
    const post = await Post.findById(id);
    if (!post) {
        throw new ApiError(404, 'Post not found.');
    }
    const userIndex = post.likes.findIndex(
        (like) => like.user && like.user.toString() === _id.toString()
    );
    if (userIndex !== -1) {
        post.likes.splice(userIndex, 1);
        await post.save({ validateBeforeSave: false });
        return res.status(200).json(new ApiResponse(200, 'Post unliked', post));
    }
    post.likes.unshift({ user: _id });
    await post.save({ validateBeforeSave: false });
    res.status(200).json(new ApiResponse(200, 'Post liked', post));
});

// Add comment 💬
export const addComment = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;
    const { text, name, avatar, date } = req.body;
    if (!text) {
        throw new ApiError(400, 'Text is required for comment.');
    }
    if (!id) {
        throw new ApiError(400, 'ID is required for the post');
    }
    const post = await Post.findById({ _id: id });
    if (!post) {
        throw new ApiError(404, 'Post not found.');
    }
    const comment = {
        user: _id,
        text: text,
        name,
        avatar,
        date,
    };
    post.comments.unshift(comment);
    await post.save({ validateBeforeSave: false });
    const updatePost = await Post.findById({ _id: id });
    res.status(200).json(
        new ApiError(200, 'Comment added successfuly', updatePost)
    );
});

// Delete post....
export const deleteComment = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, 'ID is required for the post');
    }
    const post = await Post.findById({ _id: id });
    if (!post) {
        throw new ApiError(404, 'Post not found.');
    }
    const userIndex = post.comments.findIndex(
        (comment) => comment.user && comment.user.toString() === _id.toString()
    );
    if (userIndex !== -1) {
        post.comments.splice(userIndex, 1);
        await post.save({ validateBeforeSave: false });
        return res
            .status(200)
            .json(new ApiResponse(200, 'Comment deleted', post));
    }
    res.status(200).json(
        new ApiResponse(200, 'You have not add any comment yet.', post)
    );
});
