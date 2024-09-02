import mongoose, { Schema } from 'mongoose';

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    handle: {
        type: String,
        required: true,
        unique: [true, 'username already used try different one.'],
        max: 40,
    },
    company: {
        type: String,
    },
    location: {
        type: String,
    },
    status: {
        type: String,
        required: [true, 'Status is required.'],
    },
    skills: {
        type: [String],
    },
    bio: {
        type: String,
    },
    experience: [
        {
            title: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
        },
    ],
    education: [
        {
            institute: {
                type: String,
                required: true,
            },
            fieldOfStudy: {
                type: String,
                required: true,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
        },
    ],
    social: {
        github: String,
        instagram: String,
        linkedin: String,
        twitter: String,
        website: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
