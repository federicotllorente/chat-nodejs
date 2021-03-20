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
    // list.push(message);
    const myMessage = new Model(message);
    myMessage.save();
};

// Get from the DB all the messages
const getMessages = async () => {
    // return list;
    const messages = await Model.find();
    return messages;
};

module.exports = {
    add: addMessage,
    list: getMessages,
    // get
    // update?
    // delete
};