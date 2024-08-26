import asyncHanlder from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import User from '../models/User.model.js';
import gravatar from 'gravatar';

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
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(409, 'Email already registered.');
    }
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'identicon',
    });
    const user = {
        name,
        email,
        password,
        avatar,
    };
    await User.create(user);
    const userCreated = await User.findOne({ email }).select('-password');
    if (!userCreated) {
        throw new ApiError(500, 'USER CANT REGISTERD TRY LATER.');
    }
    res.status(201).json(
        new ApiResponse(201, 'User created successfuly', userCreated)
    );
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
                email,
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
