import React from 'react';
import { Link } from 'react-router-dom';

import ChatMessages from '../components/ChatMessages';

const ChatViews = props => {
    const messages = props.messages;
    const newMessages = props.newMessages;
    const newMessage = props.newMessage;
    const currentChatData = props.currentChatData;
    const userId = props.userId;
    const handleChange = props.handleChange;
    const handleSubmit = props.handleSubmit;
    const chatBottom = props.chatBottom;
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
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChange} value={newMessage} type="text" name="new_message" id="new_message" placeholder="Write something..." />
                    <button>Send</button>
                </form>
            </div>
            <div ref={chatBottom}></div>
        </div>
    );
};

export default ChatViews;