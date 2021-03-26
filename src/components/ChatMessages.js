import { hot } from 'react-hot-loader/root';
import React from 'react';

const ChatMessages = props => {
    const messages = props.messages;
    const newMessages = props.newMessages;
    const userId = props.userId;
    return (
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
            {newMessages && newMessages.map((el, index) => {
                if (el.user == userId) {
                    return (
                        <div key={index} className="chat__messages__message chat__messages__message--own_message">
                            <p>{el.message}</p>
                            <span>
                                {`${el.date.split('T')[0].split('-')[1]}/${el.date.split('T')[0].split('-')[2]}/${el.date.split('T')[0].split('-')[0]} at ${el.date.split('T')[1].split(':')[0]}:${el.date.split('T')[1].split(':')[1]}`}
                            </span>
                        </div>
                    );
                } else {
                    return (
                        <div key={index} className="chat__messages__message">
                            <p>{el.message}</p>
                            <span>
                                {`${el.date.split('T')[0].split('-')[1]}/${el.date.split('T')[0].split('-')[2]}/${el.date.split('T')[0].split('-')[0]} at ${el.date.split('T')[1].split(':')[0]}:${el.date.split('T')[1].split(':')[1]}`}
                            </span>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default hot(ChatMessages);