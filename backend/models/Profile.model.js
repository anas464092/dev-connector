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
    website: {
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
    githubUsername: {
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
            location: {
                type: String,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: {
                type: String,
            },
        },
    ],
    education: [
        {
            institute: {
                type: String,
                required: true,
            },
            degree: {
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
            current: {
                type: Boolean,
                default: false,
            },
            description: {
                type: String,
            },
        },
    ],
    social: {
        youtube: String,
        instagram: String,
        linkedin: String,
        github: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
