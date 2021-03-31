import React from 'react';
import { Link } from 'react-router-dom';

const AddChatViews = props => {
    const userId = props.userId;
    const foundUsers = props.foundUsers;
    const handleAddChat = props.handleAddChat;
    return (
        <div className="add_chat">
            <div className="add_chat__title">
                <h1>Chat App</h1>
                <span>by <a href="https://github.com/federicotllorente" target="_blank" rel="noreferrer">Federico Tejedor Llorente</a></span>
            </div>
            <div className="add_chat__back_button">
                <h3>👈 <Link to={`/${userId}`}>Back to Chats</Link></h3>
            </div>
            <div className="add_chat__subtitle">
                <h2>Add a new chat</h2>
                <p>Start a new conversation!</p>
            </div>
            <div className="add_chat__list">
                {foundUsers && foundUsers.map(el => (
                    <button onClick={e => handleAddChat(el._id)} key={el._id} className="add_chat__list__item">
                        <h3>{el.name}</h3>
                        <p><span>Status:</span> {el.status}</p>
                    </button>
                ))}
                {(foundUsers && foundUsers.length == 0) && (
                    <React.Fragment>
                        <h3>Oh! It seems that you already have a chat with every user in the App!</h3>
                        {/* <h3>Maybe you would like to <Link to={`/${userId}/add-group`}>create a new group</Link> 👥</h3>
                        <Link className="add_chat__create_group" to={`/${userId}/add-group`}>Create a new group</Link> */}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default AddChatViews;