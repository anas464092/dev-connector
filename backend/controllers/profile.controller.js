import Profile from '../models/Profile.model.js';
import User from '../models/User.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

// Current User Profile....
export const currentUserProfile = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const currentProfile = await Profile.findOne({ user: _id }).populate(
        'user',
        ['name', 'avatar']
    );
    if (!currentProfile) {
        throw new ApiResponse(404, 'No profile for this user.');
    }
    res.status(200).json(new ApiResponse(200, 'Profile found', currentProfile));
});

// creating and updating user profile
export const createUserProfile = asyncHandler(async (req, res) => {
    const userProfile = {};
    userProfile.user = req.user._id;

    // Validation
    if (!req.body.handle || req.body.handle.trim() === '') {
        throw new ApiError(400, 'Handle required.');
    }
    userProfile.handle = req.body.handle;

    if (req.body.company && req.body.company.trim() !== '') {
        userProfile.company = req.body.company;
    }

    if (req.body.website && req.body.website.trim() !== '') {
        userProfile.website = req.body.website;
    }

    if (req.body.location && req.body.location.trim() !== '') {
        userProfile.location = req.body.location;
    }

    if (!req.body.status || req.body.status.trim() === '') {
        throw new ApiError(400, 'Status required.');
    }
    userProfile.status = req.body.status;

    if (typeof req.body.skills !== 'undefined') {
        userProfile.skills = req.body.skills
            .split(',')
            .map((skill) => skill.trim());
    }

    if (req.body.bio) userProfile.bio = req.body.bio;
    if (req.body.githubUsername)
        userProfile.githubUsername = req.body.githubUsername;

    // Social fields
    userProfile.social = {};
    if (req.body.github) userProfile.social.github = req.body.github;
    if (req.body.instagram) userProfile.social.instagram = req.body.instagram;
    if (req.body.linkedin) userProfile.social.linkedin = req.body.linkedin;
    if (req.body.twitter) userProfile.social.twitter = req.body.twitter;
    if (req.body.website) userProfile.social.website = req.body.website;

    const profileChecker = await Profile.findOne({ user: userProfile.user });

    if (profileChecker) {
        // Update the profile with all fields including social fields
        console.log(userProfile);
        const profile = await Profile.findOneAndUpdate(
            { user: userProfile.user },
            { $set: { ...userProfile } }, // Spread all fields, including social
            { new: true }
        ).populate('user', ['name', 'avatar']);

        return res
            .status(200)
            .json(new ApiResponse(200, 'User profile updated.', profile));
    } else {
        // Create the profile with all fields including social fields
        console.log(userProfile);

        await Profile.create(userProfile);

        const profile = await Profile.findOne({
            user: userProfile.user,
        }).populate('user', ['name', 'avatar']);

        return res
            .status(200)
            .json(new ApiResponse(200, 'User profile created.', profile));
    }
});

// getting user profile by handle/username
export const profileByHandle = asyncHandler(async (req, res) => {
    const handle = req.params.handle;
    if (!handle) {
        throw new ApiError(400, 'handle is required.');
    }
    const profile = await Profile.findOne({ handle }).populate('user', [
        'name',
        'avatar',
    ]);
    if (!profile) {
        throw new ApiError(404, 'No user found.');
    }
    res.status(200).json(
        new ApiResponse(200, 'User profile found by handle.', profile)
    );
});

// getting profile by user id....
export const profileByUserid = asyncHandler(async (req, res) => {
    const _id = req.params._id;
    if (!_id) {
        throw new ApiError(400, '_id is required.');
    }
    const profile = await Profile.findOne({ user: _id }).populate('user', [
        'name',
        'avatar',
    ]);
    if (!profile) {
        throw new ApiError(404, 'No profile found.');
    }
    res.status(200).json(
        new ApiResponse(200, 'User profile found by _id.', profile)
    );
});

// Get all profiles....
export const getAllProfiles = asyncHandler(async (req, res) => {
    const allProfiles = await Profile.find().populate('user', [
        'name',
        'avatar',
    ]);
    if (!allProfiles || !allProfiles.length === 0) {
        throw new ApiError(404, 'No user profile founds.');
    }
    res.status(200).json(
        new ApiResponse(200, 'All profiles found', {
            noOfProfiles: allProfiles.length,
            allProfiles,
        })
    );
});

// Adding experience
export const addExperience = asyncHandler(async (req, res) => {
    const { _id } = req.user._id;
    const { title, company, from, to } = req.body;
    if (!title) throw new ApiError(400, 'Title required.');
    if (!company) throw new ApiError(400, 'company required.');
    if (!from) throw new ApiError(400, 'from required.');
    if (!to) throw new ApiError(400, 'to required.');
    const experience = {
        title,
        company,
        from,
        to,
    };
    const userProfile = await Profile.findOne({ user: _id });
    userProfile.experience.unshift(experience);
    await userProfile.save({ validateBeforeSave: false });
    const updatedProfile = await Profile.findOne({ user: _id }).populate(
        'user',
        ['user', 'avatar']
    );
    res.status(200).json(
        new ApiResponse(200, 'experience added.', updatedProfile)
    );
});

// Adding education
export const addEducation = asyncHandler(async (req, res) => {
    const { _id } = req.user._id;
    const { institute, degree, from, to } = req.body;
    if (!institute) throw new ApiError(400, 'institute required.');
    if (!degree) throw new ApiError(400, 'degree required.');
    if (!from) throw new ApiError(400, 'from required.');
    if (!to) throw new ApiError(400, 'to required.');
    const education = {
        institute,
        degree,
        from,
        to,
    };
    const userProfile = await Profile.findOne({ user: _id });
    userProfile.education.unshift(education);
    await userProfile.save({ validateBeforeSave: false });
    const updateProfile = await Profile.findOne({ user: _id }).populate(
        'user',
        ['user', 'avatar']
    );
    res.status(200).json(
        new ApiResponse(200, 'Education added.', updateProfile)
    );
});

// Deleting experience....
export const deleteExperience = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;
    if (!id) throw new ApiError(400, 'ID of the experience required.');
    const userProfile = await Profile.findOne({ user: _id });
    const removeIndex = userProfile.experience
        .map((item) => item.id.toString())
        .indexOf(id);
    if (removeIndex === -1) {
        throw new ApiError(404, 'Experience not found.');
    }
    userProfile.experience.splice(removeIndex, 1); // Correct usage of splice
    await userProfile.save({ validateBeforeSave: false });
    const updateProfile = await Profile.findOne({ user: _id }).populate(
        'user',
        ['name', 'avatar']
    );
    res.status(200).json(
        new ApiResponse(200, 'Experience deleted', updateProfile)
    );
});

// Deleting education
export const deleteEducation = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;
    if (!id) throw new ApiError(400, 'ID of the education required.');
    const userProfile = await Profile.findOne({ user: _id });
    const removeIndex = userProfile.education
        .map((item) => item.id.toString())
        .indexOf(id);
    if (removeIndex === -1) {
        throw new ApiError(404, 'Experience not found.');
    }
    userProfile.education.splice(removeIndex, 1); // Correct usage of splice
    await userProfile.save({ validateBeforeSave: false });
    const updateProfile = await Profile.findOne({ user: _id }).populate(
        'user',
        ['name', 'avatar']
    );
    res.status(200).json(
        new ApiResponse(200, 'Education deleted', updateProfile)
    );
});

// Deleting profile and user
export const deleteProfileUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const userProfile = await Profile.findOne({ user: _id });
    if (!userProfile) {
        throw new ApiError(400, 'Profile for that user does not exist');
    }
    const deleteProfile = await Profile.findOneAndDelete({ user: _id });
    if (!deleteProfile) {
        throw new ApiError(500, 'Fialed to delete user profile.');
    }
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
        throw new ApiError(500, 'Profile deleted but  fialed to delete user.');
    }
    res.status(200).json(new ApiResponse(200, 'User delete successfuly', null));
});
