import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import useGetData from '../hooks/useGetData';
import useGetChats from '../hooks/useGetChats';
import useFindNewChats from '../hooks/useFindNewChats';
import SkeletonLoader from '../components/SkeletonLoader';

const api_users = `${process.env.HOST}:${process.env.PORT}/user`;
const api_chats = `${process.env.HOST}:${process.env.PORT}/chat`;

const AddChat = () => {
    const currentPath = useParams();
    const userId = currentPath.userId;
    const { loading, data, error, fetchData } = useGetData();
    const { loadingChats, chatList, chatListError, fetchChats } = useGetChats();
    const { foundChats, findNewChats } = useFindNewChats(userId);
    useEffect(() => {
        fetchData(api_users);
        fetchChats(`${api_chats}/${userId}`);
    }, []);
    useEffect(() => {
        if (!data || !chatList) return;
        findNewChats(data, chatList);
    }, [data, chatList]);
    if (loading || loadingChats) (<SkeletonLoader />);
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
                {foundChats && foundChats.map(el => (
                    <div key={el._id} className="users__list__item">
                        <Link to={`/${el._id}`}>
                            <h3>{el.name}</h3>
                            <p><span>Status:</span> {el.status}</p>
                        </Link>
                    </div>
                ))}
                {(!foundChats) && (
                    <React.Fragment>
                        <h3>Oh! It seems that you already have a chat with every user in the App!</h3>
                        <h3>Maybe you would like to <Link to={`/${userId}/add-group`}>create a new group</Link> 👥</h3>
                        <Link className="add_chat__create_group" to={`/${userId}/add-group`}>Create a new group</Link>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default hot(AddChat);