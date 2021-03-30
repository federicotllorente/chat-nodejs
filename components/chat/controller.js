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

const deleteChat = id => {
    return new Promise((resolve, reject) => {
        if (!id) {
            console.error('[chatController] There is no chat ID in the request');
            return reject('Invalid data');
        }
        resolve(store.removeById(id))
            .then(() => {
                resolve();
            })
            .catch(error => {
                console.error('[chatController] Internal error');
                reject(error);
            });
    });
};

const deleteChatByUser = userId => {
    return new Promise((resolve, reject) => {
        if (!userId) {
            console.error('[chatController] There is no user ID in the request');
            return reject('Invalid data');
        }
        resolve(store.removeByUser(userId))
            .then(() => {
                resolve();
            })
            .catch(error => {
                console.error('[chatController] Internal error');
                reject(error);
            });
    });
};

module.exports = {
    createChat,
    getChats,
    deleteChat,
    deleteChatByUser
};