import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import useGetData from '../hooks/useGetData';
import ChatListItem from '../components/ChatListItem';
import SkeletonLoader from '../components/SkeletonLoader';

const api = `${process.env.HOST}:${process.env.PORT}/chat`;

const Chats = () => {
    const currentPath = useParams();
    const userId = currentPath.userId;
    const {
        loading,
        data,
        error,
        fetchData
    } = useGetData();
    useEffect(() => {
        fetchData(`${api}/${userId}`);
    }, []);
    if (loading) (<SkeletonLoader />);
    return (
        <div className="chats">
            <div className="chats__title">
                <h1>Chat App</h1>
                <span>by <a href="https://github.com/federicotllorente" target="_blank" rel="noreferrer">Federico Tejedor Llorente</a></span>
            </div>
            <div className="chats__back_button">
                <h3>👈 <Link to="/">Back to Users</Link></h3>
            </div>
            <div className="chats__subtitle">
                <div className="chats__subtitle__text">
                    <h2>Chats</h2>
                    <p>Your conversations</p>
                </div>
                <div className="chats__subtitle__add_chat">
                    <Link to="/add-chat">Add a new chat</Link>
                </div>
            </div>
            <div className="chats__list">
                {data && data.map(el => (
                    <ChatListItem key={el._id} el={el} userId={userId} />
                ))}
                {(!data && error) && (
                    <h3>Oh! It seems that you don't have any chat yet!</h3>
                )}
            </div>
        </div>
    );
};

export default hot(Chats);