import express from 'express';
import {
    deleteUser,
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser,
} from '../../controllers/user.controller.js';
import verifyJWT from '../../middleware/auth.middleware.js';
import upload from '../../middleware/multer.middleware.js';

const userRoute = express.Router();

// REGISTER USER -----> PUBLIC -------> USUNG MULTER
userRoute.post('/register', upload.single('avatar'), registerUser); // public
userRoute.post('/login', loginUser); // public

userRoute.get('/current', verifyJWT, getCurrentUser); // private
userRoute.get('/logout', verifyJWT, logoutUser); // private
userRoute.delete('/delete', verifyJWT, deleteUser); // private

export default userRoute;
