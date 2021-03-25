import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Link } from 'react-router-dom';

const ChatListItem = props => {
    const el = props.el;
    const userId = props.userId;
    return (
        <div className="chats__list__item">
            <Link to={`/${userId}/${el._id}`}>
                <h3>{el.users.length > 2 ? (
                    <span>Group with {el.users.filter(user => user._id !== userId).map((user, index, array) => {
                        if (index == array.length - 1) {
                            return (<span key={user._id}>{user.name}</span>);
                        } else if (index == array.length - 2) {
                            return (<span key={user._id}>{user.name} and </span>);
                        } else {
                            return (<span key={user._id}>{user.name}, </span>);
                        }
                    })}</span>
                ) : (el.users.map(user => {
                    if (user._id !== userId) {
                        return (<span key={user._id}>{user.name}</span>);
                    }
                }))}</h3>
                <span>Created on {
                    `${el.created.split('T')[0].split('-')[1]}/${el.created.split('T')[0].split('-')[2]}/${el.created.split('T')[0].split('-')[0]} at ${el.created.split('T')[1].split(':')[0]}:${el.created.split('T')[1].split(':')[1]}`
                }</span>
            </Link>
        </div>
    );
};

export default hot(ChatListItem);