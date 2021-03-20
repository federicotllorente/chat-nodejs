const store = require('./store');

const addMessage = (user, message) => {
    return new Promise((resolve, reject) => {
        if (!user || !message) {
            console.error('[messageController] There is no user or message in the request');
            return reject('Invalid data');
        }
        const fullMessage = {
            user: user,
            message: message,
            date: new Date()
        };
        store.add(fullMessage);
        console.log('[messageController] Message sent!');
        return resolve(fullMessage);
    });
};

const getMessages = filterUser => {
    return new Promise((resolve, reject) => {
        return resolve(store.list(filterUser));
    });
};

const updateMessage = (id, message) => {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            console.error('[messageController] There is no message ID or content in the request');
            return reject('Invalid data');
        }
        const result = await store.update(id, message);
        return resolve(result);
    });
};

module.exports = {
    addMessage,
    getMessages,
    updateMessage
};