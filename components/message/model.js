const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'users'
    },
    message: {
        type: String,
        required: true,
    },
    date: Date
});

const model = mongoose.model('messages', mySchema);

module.exports = model;