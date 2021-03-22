const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    avatar: {
        type: String,
        default: 'unknown.png'
    },
    name: {
        type: String,
        required: true
    },
    aboutme: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String,
        default: ''
    },
    resetPasswordExpires: {
        type: Date,
        default: ''
    },

    loginAttempts: {
        type: Number,
        default: 0
    },
    safetyLock: {
        type: Date,
        default: ''
    },

    role: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    facebook: {
        type: String,
        default: ''
    },
    instagram: {
        type: String,
        default: ''
    },
    twitter: {
        type: String,
        default: ''
    },
    youtube: {
        type: String,
        default: ''
    }
});

module.exports = User = mongoose.model('user', UserSchema);