import express from 'express';
import {
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser,
} from '../../controllers/user.controller.js';
import verifyJWT from '../../middleware/auth.middleware.js';

const userRoute = express.Router();
userRoute.post('/register', registerUser); // public
userRoute.post('/login', loginUser); // public
userRoute.get('/current', verifyJWT, getCurrentUser); // private
userRoute.get('/logout', verifyJWT, logoutUser); // private

export default userRoute;
