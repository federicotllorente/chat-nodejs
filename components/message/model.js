const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'users'
    },
    chat: {
        type: Schema.ObjectId,
        ref: 'chats'
    },
    message: {
        type: String,
        required: true,
    },
    date: Date,
    file: String
});

const model = mongoose.model('messages', mySchema);

module.exports = model;