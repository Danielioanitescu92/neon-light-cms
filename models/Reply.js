const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ReplySchema = new Schema({
    likes: [
        {
            replyId: {
                type: String,
                required: true
            },
            userId: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    forWich: {
        type: String,
        required: true
    },
    parentComm: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Reply = mongoose.model('reply', ReplySchema);