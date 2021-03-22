const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    users: [
        {
            type: Schema.ObjectId,
            ref: 'users'
        }
    ],
    messages: [
        {
            type: Schema.ObjectId,
            ref: 'messages'
        }
    ],
    created: Date
});

const model = mongoose.model('chats', mySchema);

module.exports = model;