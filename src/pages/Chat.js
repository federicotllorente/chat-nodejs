import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import useGetData from '../hooks/useGetData';
import useGetMessages from '../hooks/useGetMessages';
import useHandleChat from '../hooks/useHandleChat';
import ChatMessages from '../components/ChatMessages';

// New socket connection
import io from 'socket.io-client';
const socket = io('/');

const api_chat = `${process.env.HOST}:${process.env.PORT}/chat`;
const api_messages = `${process.env.HOST}:${process.env.PORT}/message?chat=`;

const Chat = () => {
    const currentPath = useParams();
    const userId = currentPath.userId;
    const chatId = currentPath.chatId;

    const {
        loading,
        data,
        error,
        fetchData
    } = useGetData();
    const {
        loadingMessages,
        messages,
        messagesError,
        fetchMessages
    } = useGetMessages();
    const {
        newMessages,
        setNewMessages,
        newMessage,
        handleChange,
        handleSubmit
    } = useHandleChat(userId, chatId, socket);

    useEffect(() => {
        fetchData(`${api_chat}/${userId}`); // Get chat info
        fetchMessages(`${api_messages}${chatId}`); // Get messages
    }, []);
    useEffect(() => {
        socket.on('receive message', data => {
            if (newMessages) {
                setNewMessages([newMessages, data].flat());
            } else {
                setNewMessages([data]);
            }
        });
    });
    useEffect(() => {
        return () => {
            socket.disconnect(socket => {
                console.log(`Socket disconnected manually: ${socket.id}`);
                if (newMessages) {
                    setNewMessages(undefined);
                }
            });
        };
    }, []);

    if (loading || loadingMessages) (<h2>Loading...</h2>);
    if (data) {
        const currentChatData = data.find(el => el._id === chatId);
        return (
            <div className="chat">
                <div className="chat__title">
                    <div className="chat__title__logo">
                        <h3>👈 <Link to={`/${userId}`}>Back to Chats</Link></h3>
                        <h1>Chat App</h1>
                    </div>
                    <div className="chat__title__subtitle">
                        <h2>{currentChatData.users.length > 2 ? (
                            <span>{currentChatData.users.filter(user => user._id !== userId).map((user, index, array) => {
                                if (index >= 2) {
                                    return (<span key={user._id}> and {array.length - 2} more</span>);
                                } else if (index == 1) {
                                    return (<span key={user._id}>{user.name}</span>);
                                } else if (index == 0) {
                                    return (<span key={user._id}>{user.name}, </span>);
                                }
                            })}</span>
                        ) : (currentChatData.users.map(user => {
                            if (user._id !== userId) {
                                return (<span key={user._id}>{user.name}</span>);
                            }
                        }))}</h2>
                    </div>
                </div>
                <ChatMessages newMessages={newMessages} messages={messages} userId={userId} />
                <div className="chat__inputs">
                    <form action="" onSubmit={handleSubmit}>
                        <input onChange={handleChange} value={newMessage} type="text" name="new_message" id="new_message" placeholder="Write something..." />
                        <button>Send</button>
                    </form>
                </div>
            </div>
        );
    }
    return null;
};

export default hot(Chat);