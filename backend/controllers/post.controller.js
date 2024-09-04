import Post from '../models/Post.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import uploadOnCloudinary from '../utils/cloudinary.js';
import User from '../models/User.model.js';

// Create posts....
export const createPost = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { content } = req.body;
    if (!content) {
        throw new ApiError(400, 'Content is required for the post.');
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
    const post = await Post.create({
        author: _id,
        content,
        postImage: postImageURL || '',
    });
    if (!post) {
        throw new ApiError(500, 'Error occur while creating post.');
    }
    res.status(201).json(new ApiResponse(201, 'Post created', post));
});

// Get all post....
export const getAllPosts = asyncHandler(async (req, res) => {
    const allPosts = await Post.find().populate('author', 'name avatar');
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
    const post = await Post.findById(id).populate('author', 'name avatar _id');
    await post.populate('comments.user', 'avatar _id name');
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

// Like and unlike post 👍
export const likeAndUnlikePost = asyncHandler(async (req, res) => {
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
        // Unlike post
        post.likes.splice(userIndex, 1);
        await post.save({ validateBeforeSave: false });
        await post.populate('author', 'name avatar _id'); // Populate after save
        await post.populate('comments.user', 'avatar _id name');
        const allPosts = await Post.find().populate(
            'author',
            'name avatar _id'
        );
        return res
            .status(200)
            .json(new ApiResponse(200, 'Post Unliked', { post, allPosts }));
    }

    // Like post
    post.likes.unshift({ user: _id });
    await post.save({ validateBeforeSave: false });
    await post.populate('author', 'name avatar _id'); // Populate after save
    await post.populate('comments.user', 'avatar _id name');
    const allPosts = await Post.find().populate('author', 'name avatar _id');
    return res
        .status(200)
        .json(new ApiResponse(200, 'Post liked', { post, allPosts }));
});

// Add comment 💬
export const addComment = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;
    const { text } = req.body;
    if (!text) {
        throw new ApiError(400, 'Content is required for comment.');
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
    };
    post.comments.unshift(comment);
    await post.save({ validateBeforeSave: false });
    const updatePost = await Post.findById({ _id: id }).populate(
        'comments.user',
        'avatar name _id'
    );
    await updatePost.populate('author', 'avatar name _id');
    res.status(200).json(new ApiResponse(200, 'Comment added', updatePost));
});

// Delete comment....
export const deleteComment = asyncHandler(async (req, res) => {
    console.log(req.prams);

    const { _id } = req.user; // User ID
    const { postId, commentId } = req.params; // Post and Comment IDs
    if (!postId) {
        throw new ApiError(400, 'ID is required for the post');
    }
    if (!commentId) {
        throw new ApiError(400, 'ID is required for the comment');
    }
    const post = await Post.findById(postId); // Find post by ID
    if (!post) {
        throw new ApiError(404, 'Post not found.');
    }
    // Find the index of the comment with the given commentId and userId
    const commentIndex = post.comments.findIndex(
        (comment) =>
            comment._id.toString() === commentId &&
            comment.user.toString() === _id.toString()
    );
    if (commentIndex !== -1) {
        // Remove the comment from the comments array
        post.comments.splice(commentIndex, 1);
        await post.save({ validateBeforeSave: false });
        await post.populate('author', 'avatar name _id');
        await post.populate('comments.user', 'avatar name _id');
        return res
            .status(200)
            .json(new ApiResponse(200, 'Comment deleted', post));
    }
    // If no comment was found for deletion
    throw new ApiError(404, 'Comment not found or not authorized to delete.');
});
