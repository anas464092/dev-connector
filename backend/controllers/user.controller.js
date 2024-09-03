import asyncHanlder from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import User from '../models/User.model.js';
import gravatar from 'gravatar';
import uploadOnCloudinary from '../utils/cloudinary.js';

// Register user
export const registerUser = asyncHanlder(async (req, res) => {
    // Steps
    // Take data from the body.
    // Check for the validation.
    // Check if the user already exist.
    // Bycrypt password
    // Create User
    // Send response

    const { name, email, password } = req.body;
    if (!name) {
        throw new ApiError(400, 'Name required');
    }
    if (!email) {
        throw new ApiError(400, 'Email Required.');
    }
    if (!password) {
        throw new ApiError(400, 'Password Required');
    }
    const avatar = req.file ? req.file.path : null;
    if (!avatar) {
        throw new ApiError(400, 'Avatar Required');
    }
    // Data validation done by the user...

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(409, 'Email already registered.');
    }
    // existed user check done

    const avatarCloudinaryURL = await uploadOnCloudinary(avatar);
    // uploadin to cloudinary done

    const user = {
        name,
        email,
        password,
        avatar:
            avatarCloudinaryURL ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoqWIPKg9kRQhn9r3qgpcRSACAXvg-dbTOWQiDN6b5ahLRZ-AU_ioL_uXv5Un0kNGPNhE&usqp=CAU',
    };

    await User.create(user);
    const userCreated = await User.findOne({ email }).select('-password');
    if (!userCreated) {
        throw new ApiError(500, 'USER CANT REGISTERD TRY LATER.');
    } else {
        const accessToken = userCreated.generateAccessToken();
        const option = {
            httpOnly: true,
            secure: true,
        };
        res.status(200)
            .cookie('accessToken', accessToken, option)
            .set('Authorization', `Bearer ${accessToken}`)
            .json(
                new ApiResponse(200, 'User registered and login Successfully', {
                    _id: userCreated._id,
                    name: userCreated.name,
                    email: userCreated.email,
                    avatar: userCreated.avatar,
                })
            );
    }
});

export const loginUser = asyncHanlder(async (req, res) => {
    // Steps
    // Take data from the req.body
    // Check for the validation
    // Check if the usr existed
    // Check is the password
    // Generate Tokens
    // send Token in cookies
    // send response
    const { email, password } = req.body;
    if (!email) {
        throw new ApiError(400, 'Email Required.');
    }
    if (!password) {
        throw new ApiError(400, 'Password Required');
    }
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
        throw new ApiError(400, 'User not found');
    }
    const passwordChecker = await checkUser.isPasswordCorrect(password);
    if (!passwordChecker) {
        throw new ApiError(400, 'Invalid credentials');
    }
    const accessToken = checkUser.generateAccessToken();
    const option = {
        httpOnly: true,
        secure: true,
    };
    res.status(200)
        .cookie('accessToken', accessToken, option)
        .set('Authorization', `Bearer ${accessToken}`)
        .json(
            new ApiResponse(200, 'User login Successfully', {
                _id: checkUser._id,
                name: checkUser.name,
                email: checkUser.email,
                avatar: checkUser.avatar,
            })
        );
});

// Get current user...
export const getCurrentUser = asyncHanlder(async (req, res) => {
    const { _id } = req.user;
    const currentUser = await User.findById(_id).select('-password');
    if (!currentUser) {
        throw new ApiError(400, 'User not found.');
    }
    res.status(200).json(
        new ApiResponse(200, 'Current user found.', currentUser)
    );
});

// Logout User....
export const logoutUser = asyncHanlder(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id).select('-password');
    if (!user) {
        throw new ApiError(400, 'User not found.');
    }
    const option = {
        httpOnly: true,
        secure: true,
    };
    res.status(200)
        .clearCookie('accessToken', option)
        .json(
            new ApiResponse(200, 'User logged out successfuly', {
                email: user.email,
            })
        );
});
