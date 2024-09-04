import express from 'express';
import verifyJWT from '../../middleware/auth.middleware.js';
import upload from '../../middleware/multer.middleware.js';
import {
    addComment,
    createPost,
    deleteComment,
    deletePost,
    getAllPosts,
    getLikedPosts,
    getMyPosts,
    getPost,
    likeAndUnlikePost,
} from '../../controllers/post.controller.js';

const postsRoute = express.Router();
postsRoute.post(
    '/',
    verifyJWT,
    upload.fields([{ name: 'postImage', maxCount: 1 }]),
    createPost
);
postsRoute.get('/', getAllPosts);
postsRoute.get('/:id', getPost);
postsRoute.delete('/:id', verifyJWT, deletePost);
postsRoute.post('/:id', verifyJWT, likeAndUnlikePost);
postsRoute.post('/comment/:id', verifyJWT, addComment);
postsRoute.delete('/comment/:postId/:commentId', verifyJWT, deleteComment);
postsRoute.get('/user/posts', verifyJWT, getMyPosts);
postsRoute.get('/user/liked', verifyJWT, getLikedPosts);


export default postsRoute;
