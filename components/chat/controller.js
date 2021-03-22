const store = require('./store');

const createChat = users => {
    return new Promise((resolve, reject) => {
        if (!users) {
            console.error('[chatController] There are no users in the request');
            return reject('Invalid data');
        }
        const newChat = {
            users,
            messages: [],
            created: new Date()
        };
        store.add(newChat);
        return resolve(newChat);
    });
};

const getChats = () => {
    return new Promise((resolve, reject) => {
        return resolve(store.list());
    });
};

module.exports = {
    createChat,
    getChats
};