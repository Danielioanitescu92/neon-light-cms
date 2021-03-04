const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OtherSchema = new Schema({
    way: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    screenSize: {
        type: Number
    },
    unique: {
        type: String
    }
})

module.exports = Other = mongoose.model('other', OtherSchema);
