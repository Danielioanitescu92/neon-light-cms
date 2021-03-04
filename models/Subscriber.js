const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SubscriberSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    ToDeletePasswordToken: {
        type: String
    },
    ToDeletePasswordExpires: {
        type: Date
    },
    register_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = Subscriber = mongoose.model('subscriber', SubscriberSchema);