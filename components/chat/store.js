require('dotenv').config();
const connect = require('../../db');
const Model = require('./model');

// Connecting to the DB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
connect(uri);

const createChat = chat => {
    const myChat = new Model(chat);
    myChat.save();
};

const getChats = filterUser => {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterUser) {
            filter = { users: filterUser };
        }
        return resolve(Model.find(filter)
            .populate('users')
            .populate('messages')
            // .exec((error, populated) => {
            //     if (error) {
            //         console.error('[db] There was an error in the DB trying to list the chats');
            //         return reject(error);
            //     }
            //     return resolve(populated);
            // })
            .catch(error => reject(error))
        );
    });
};

module.exports = {
    add: createChat,
    list: getChats
};