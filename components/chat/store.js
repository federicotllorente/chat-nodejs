const Model = require('./model');

const createChat = chat => {
    const myChat = new Model(chat);
    myChat.save();
};

const getChats = filterUser => {
    return new Promise((resolve, reject) => {
        const filter = { users: { _id: filterUser } };
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

// Check if the chat already exists, so it can be deleted
const checkExistency = async id => {
    const result = await Model.exists({
        _id: id
    });
    return result;
};

const removeChatById = async id => {
    const existsAlready = await checkExistency(id);
    if (existsAlready) {
        return Model.deleteOne({
            _id: id
        });
    } else {
        console.error('[db] This chat does not exist anymore');
        return null;
    }
};

// Check if the chat already exists, so it can be deleted (by its user ID)
const checkExistencyByUserId = async userId => {
    const result = await Model.exists({
        users: {
            _id: userId
        }
    });
    return result;
};

const removeChatByUserId = async userId => {
    const existsAlready = await checkExistencyByUserId(userId);
    if (existsAlready) {
        return Model.deleteMany({
            users: {
                _id: userId
            }
        });
    } else {
        console.error('[db] These chats do not exist anymore');
        return null;
    }
};

module.exports = {
    add: createChat,
    list: getChats,
    removeById: removeChatById,
    removeByUser: removeChatByUserId
};