import express from 'express';
import verifyJWT from '../../middleware/auth.middleware.js';
import upload from '../../middleware/multer.middleware.js';
import {
    addComment,
    createPost,
    deleteComment,
    deletePost,
    getAllPosts,
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
postsRoute.delete('/comment/:id', verifyJWT, deleteComment);

export default postsRoute;
