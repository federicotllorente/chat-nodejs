const store = require('./store');
const { socket } = require('../../socket');

const appUrl = 'localhost:3000/app';

const addMessage = (user, chat, message, file) => {
    return new Promise((resolve, reject) => {
        if (!user || !chat || !message) {
            console.error('[messageController] There is no user, chat or message in the request');
            return reject('Invalid data');
        }
        let fileUrl = '';
        if (file) {
            fileUrl = `${appUrl}/files/${file.filename}`;
        }
        const fullMessage = {
            user,
            chat,
            message,
            date: new Date(),
            file: fileUrl
        };
        store.add(fullMessage);
        socket.io.emit('message', fullMessage);
        return resolve(fullMessage);
    });
};

const getMessages = (filterChat) => {
    return new Promise((resolve, reject) => {
        return resolve(store.list(filterChat));
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