require('dotenv').config();
const connect = require('../../db');
const Model = require('./model');

// Connecting to the DB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
connect(uri);

// Post to the DB the user
const addUser = user => {
    const myUser = new Model(user);
    return myUser.save();
};

// Get from the DB all the users
const getUsers = async filterUser => {
    let filter = {};
    if (filterUser) {
        // This regular expresion allows to filter the user
        // no matter if it's typed with or without uppercases
        filter = { name: new RegExp(filterUser, 'i') };
    }
    const users = await Model.find(filter);
    return users;
};

// Patch the user data from the DB
// const updateUser = async (id, name) => {
//     const foundUser = await Model.findById(id);
//     foundUser.name = name;
//     const newUserData = await foundUser.save();
//     return newUserData;
// };

// Check if the user already exists, so it can be deleted
const checkExistency = async id => {
    const result = await Model.exists({
        _id: id
    });
    return result;
};

// Delete a user from the DB
const removeUser = async id => {
    const existsAlready = await checkExistency(id);
    if (existsAlready) {
        return Model.deleteOne({
            _id: id
        });
    } else {
        console.error('[db] This user does not exist anymore');
        return null;
    }
};

module.exports = {
    add: addUser,
    list: getUsers,
    // update: updateUser,
    remove: removeUser
    // get
};