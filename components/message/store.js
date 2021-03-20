require('dotenv').config();
const db = require('mongoose');
const Model = require('./model');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

db.Promise = global.Promise;
db.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`[db] Database successfully connected`))
    .catch(error => console.error(`[db] ${error}`));

// Post to the DB the message
const addMessage = message => {
    const myMessage = new Model(message);
    myMessage.save();
};

// Get from the DB all the messages
const getMessages = async filterUser => {
    let filter = {};
    if (filterUser) {
        // This regular expresion allows to filter the user
        // no matter if it's typed with or without uppercases
        filter = { user: new RegExp(filterUser, 'i') };
    }
    const messages = await Model.find(filter);
    return messages;
};

// Patch the message content from the DB
const updateMessage = async (id, message) => {
    const foundMessage = await Model.findById(id);
    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
};

module.exports = {
    add: addMessage,
    list: getMessages,
    update: updateMessage
    // get
    // delete
};