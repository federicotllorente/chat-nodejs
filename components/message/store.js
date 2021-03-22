require('dotenv').config();
const connect = require('../../db');
const Model = require('./model');

// Connecting to the DB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
connect(uri);

// Post to the DB the message
const addMessage = message => {
    const myMessage = new Model(message);
    myMessage.save();
};

// Get from the DB all the messages
const getMessages = (filterChat) => {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterChat) {
            filter = { chat: filterChat };
        }
        return resolve(Model.find(filter)
            .populate('user')
            // .exec((error, populated) => {
            //     if (error) {
            //         console.error('[db] The user was not found in the database');
            //         return reject(error);
            //     }
            //     return resolve(populated);
            // })
            .catch(error => reject(error))
        );
    });
}

// Patch the message content from the DB
const updateMessage = async (id, message) => {
    const foundMessage = await Model.findById(id);
    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
};

// Check if the message already exists, so it can be deleted
const checkExistency = async id => {
    const result = await Model.exists({
        _id: id
    });
    return result;
};

// Delete a message from the DB
const removeMessage = async id => {
    const existsAlready = await checkExistency(id);
    if (existsAlready) {
        return Model.deleteOne({
            _id: id
        });
    } else {
        console.error('[db] This message does not exist anymore');
        return null;
    }
};

module.exports = {
    add: addMessage,
    list: getMessages,
    update: updateMessage,
    remove: removeMessage
    // get
};