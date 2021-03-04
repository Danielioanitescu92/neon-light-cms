const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PrivPolSchema = new Schema({
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

module.exports = PrivPol = mongoose.model('privpol', PrivPolSchema);