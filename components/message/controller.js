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

const getMessages = () => {
    return new Promise((resolve, reject) => {
        return resolve(store.list());
    });
};

module.exports = {
    addMessage,
    getMessages
};