import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import useGetData from '../hooks/useGetData';
import useGetMessages from '../hooks/useGetMessages';

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
    useEffect(() => {
        fetchData(`${api_chat}/${userId}`); // Get chat info
        fetchMessages(`${api_messages}${chatId}`); // Get messages
    }, []);
    if (loading || loadingMessages) (<h2>Loading...</h2>);
    if (data) {
        const currentChatData = data.find(el => el._id === chatId);
        return (
            <div className="chat">
                <h1>Chat App <span>by <a href="https://github.com/federicotllorente" target="_blank" rel="noreferrer">Federico Tejedor Llorente</a></span></h1>
                <h3><Link to={`/${userId}`}>Back to Chats</Link></h3>
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
                <div className="chat__messages">
                    {messages && messages.map(el => {
                        if (el.user._id == userId) {
                            return (
                                <div key={el._id} className="chat__messages__message chat__messages__message--own_message">
                                    <p>{el.message}</p>
                                    <span>
                                        {`${el.date.split('T')[0].split('-')[1]}/${el.date.split('T')[0].split('-')[2]}/${el.date.split('T')[0].split('-')[0]} at ${el.date.split('T')[1].split(':')[0]}:${el.date.split('T')[1].split(':')[1]}`}
                                    </span>
                                </div>
                            );
                        } else {
                            return (
                                <div key={el._id} className="chat__messages__message">
                                    <p>{el.message}</p>
                                    <span>
                                        {`${el.date.split('T')[0].split('-')[1]}/${el.date.split('T')[0].split('-')[2]}/${el.date.split('T')[0].split('-')[0]} at ${el.date.split('T')[1].split(':')[0]}:${el.date.split('T')[1].split(':')[1]}`}
                                    </span>
                                </div>
                            );
                        }
                    })}
                </div>
                <div className="chat__inputs">
                    <form action="">
                        <input type="text" name="new_message" id="new_message" placeholder="Write something..." />
                        <button>Send</button>
                    </form>
                </div>
            </div>
        );
    }
    return null;
};

export default hot(Chat);