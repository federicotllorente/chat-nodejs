import { useState } from 'react';

const useHandleChat = (userId, chatId, socket) => {
    const [newMessages, setNewMessages] = useState(undefined);
    const [newMessage, setNewMessage] = useState('');
    const handleChange = e => {
        setNewMessage(e.target.value);
    };
    const handleSubmit = e => {
        e.preventDefault();
        const fullMessage = {
            user: userId,
            chat: chatId,
            message: newMessage,
            date: new Date(),
            file: '' // Add the file uploading functionality later
        };
        if (newMessage) {
            socket.emit('new message', fullMessage);
            setNewMessage('');
        }
    };
    return {
        newMessages,
        setNewMessages,
        newMessage,
        handleChange,
        handleSubmit
    };
}

export default useHandleChat;