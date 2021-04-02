import { useState } from 'react';

const useHandleChat = (userId, chatId, socket) => {
    const [newMessages, setNewMessages] = useState(undefined);
    const [newMessage, setNewMessage] = useState('');
    const handleChange = e => {
        setNewMessage(e.target.value);
    };
    const sendMessage = async message => {
        const currentURL = window.location.origin;
        const api = process.env.NODE_ENV === 'development' ?
            `${process.env.HOST}:${process.env.PORT}/message` :
            `${currentURL}/message`;
        const result = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(message)
        });
        return result.json();
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
            sendMessage(fullMessage); // Post the message in the DB
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