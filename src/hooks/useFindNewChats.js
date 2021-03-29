import { useState } from 'react';

const useFindNewChats = userId => {
    const [foundChats, setFoundChats] = useState(undefined);
    const findNewChats = (allUsers, allChats) => {
        let currentUsersWithChat = [];
        let currentUsersWithoutChat = [];
        allChats.map(chat => {
            chat.users.map(user => {
                // The current user can't be the selected one neither an existent user ID in the array
                if (user._id !== userId && !currentUsersWithChat.some(el => el === user._id)) {
                    currentUsersWithChat.push(user._id);
                }
            });
        });
        allUsers.map(user => {
            // The current user can't correspond with the selected user neither already exist in the array nor have already a chat with the selected user
            if (user._id !== userId && !currentUsersWithoutChat.some(el => el._id === user._id) && !currentUsersWithChat.some(el => el === user._id)) {
                currentUsersWithoutChat.push(user);
            }
        });
        setFoundChats(currentUsersWithoutChat);
    };
    return { foundChats, findNewChats };
};

export default useFindNewChats;