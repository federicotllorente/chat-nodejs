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

const deleteMessage = id => {
    return new Promise((resolve, reject) => {
        if (!id) {
            console.error('[messageController] There is no message ID in the request');
            return reject('Invalid data');
        }
        resolve(store.remove(id))
            .then(() => {
                resolve();
            })
            .catch(error => {
                console.error('[messageController] Internal error');
                reject(error);
            });
    });
};

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
};