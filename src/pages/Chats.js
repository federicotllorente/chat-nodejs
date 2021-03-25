import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useGetData from '../hooks/useGetData';
import ChatListItem from '../components/ChatListItem';

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
    if (loading) {
        return (
            <h2>Loading...</h2>
        );
    }
    return (
        <div className="chats">
            <h1>Chat App <span>by <a href="https://github.com/federicotllorente" target="_blank" rel="noreferrer">Federico Tejedor Llorente</a></span></h1>
            <h2>Chats</h2>
            <p>Your conversations</p>
            <div className="chats__list">
                {data && data.map(el => (
                    <ChatListItem key={el._id} el={el} userId={userId} />
                ))}
            </div>
        </div>
    );
};

export default hot(Chats);