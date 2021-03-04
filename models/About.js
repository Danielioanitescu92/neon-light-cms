const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AboutSchema = new Schema({
    _id: {
        type: String,
        required: true,
        default: "1"
    },
    text: {
        type: String,
        required: true,
        default: "Lorem Ipsum"
    }
});

module.exports = About = mongoose.model('aboutus', AboutSchema);