const store = require('./store');

const createChat = users => {
    return new Promise((resolve, reject) => {
        if (!users) {
            console.error('[chatController] There are no users in the request');
            return reject('Invalid data');
        } else if (users.length < 2) {
            console.error('[chatController] There are no enough users in the request to create a new chat');
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

const getChats = userId => {
    return new Promise((resolve, reject) => {
        return resolve(store.list(userId));
    });
};

module.exports = {
    createChat,
    getChats
};