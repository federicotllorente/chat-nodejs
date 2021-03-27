import { hot } from 'react-hot-loader/root';
import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import useGetData from '../hooks/useGetData';
import useGetMessages from '../hooks/useGetMessages';
import useHandleChat from '../hooks/useHandleChat';
import SkeletonLoader from '../components/SkeletonLoader';
import ChatViews from './ChatViews';

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
            socket.removeAllListeners('receive message'); // Prevents an app memory leak
            socket.disconnect(socket => {
                console.log(`Socket disconnected manually: ${socket.id}`);
            });
            if (newMessages) {
                setNewMessages(undefined);
            }
            socket.connect();
        };
    }, []);

    const currentChatData = useMemo(() => data && data.find(el => el._id === chatId), [data]);
    if (loading || loadingMessages) (<SkeletonLoader />);
    if (data) {
        return (
            <ChatViews
                messages={messages}
                newMessages={newMessages}
                newMessage={newMessage}
                currentChatData={currentChatData}
                userId={userId}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        );
    }
    return null;
};

export default hot(Chat);