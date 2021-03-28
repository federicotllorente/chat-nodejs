const store = require('./store');

const addUser = (name, status) => {
    if (!name) {
        console.error('[userController] There is no name in the request');
        return Promise.reject('Invalid data');
    }
    const user = { name, status: status || 'Available' };
    return store.add(user);
};

const getUsers = filterUser => {
    return new Promise((resolve, reject) => {
        return resolve(store.list(filterUser));
    });
};

// const updateUser = (id, name) => { };

const deleteUser = id => {
    return new Promise((resolve, reject) => {
        if (!id) {
            console.error('[userController] There is no user ID in the request');
            return reject('Invalid data');
        }
        resolve(store.remove(id))
            .then(() => {
                resolve();
            })
            .catch(error => {
                console.error('[userController] Internal error');
                reject(error);
            });
    });
};

module.exports = {
    addUser,
    getUsers,
    // updateUser,
    deleteUser
};