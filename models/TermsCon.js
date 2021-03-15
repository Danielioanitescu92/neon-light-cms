const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TermsConSchema = new Schema({
    _id: {
        type: String,
        required: true,
        default: "1"
    },
    text: {
        blocks: [
            {
                type: {
                    type: String,
                    required: true
                },
                data: {
                    alignment: {
                        type: String
                    },
                    caption: {
                        type: String
                    },
                    text: {
                        type: String
                    },
                    level: {
                        type: Number
                    },
                    link: {
                        type: String
                    },
                    meta: {
                        type: Object
                    },
                    message: {
                        type: String
                    },
                    title: {
                        type: String
                    },
                    style: {
                        type: String
                    },
                    items: [
                        {
                            type: String
                        }
                    ]
                }
            },
        ]
    }
});

module.exports = TermsCon = mongoose.model('termscon', TermsConSchema);