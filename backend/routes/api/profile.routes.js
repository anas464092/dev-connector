import express from 'express';
import verifyJWT from '../../middleware/auth.middleware.js';
import {
    addEducation,
    addExperience,
    createUserProfile,
    currentUserProfile,
    deleteEducation,
    deleteExperience,
    deleteProfileUser,
    getAllProfiles,
    profileByHandle,
    profileByUserid,
} from '../../controllers/profile.controller.js';

const profileRoute = express.Router();

profileRoute.get('/', verifyJWT, currentUserProfile);
profileRoute.post('/', verifyJWT, createUserProfile);
profileRoute.delete('/', verifyJWT, deleteProfileUser);
profileRoute.get('/handle/:handle', profileByHandle);
profileRoute.get('/user/:_id', profileByUserid);
profileRoute.get('/all', getAllProfiles);
profileRoute.post('/experience', verifyJWT, addExperience);
profileRoute.delete('/experience/:id', verifyJWT, deleteExperience);
profileRoute.post('/education', verifyJWT, addEducation);
profileRoute.delete('/education/:id', verifyJWT, deleteEducation);

export default profileRoute;
