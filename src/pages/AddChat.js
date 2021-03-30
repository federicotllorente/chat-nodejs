import { hot } from 'react-hot-loader/root';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import useGetData from '../hooks/useGetData';
import useGetChats from '../hooks/useGetChats';
import useFindNewChats from '../hooks/useFindNewChats';
import SkeletonLoader from '../components/SkeletonLoader';

const api_users = `${process.env.HOST}:${process.env.PORT}/user`;
const api_chats = `${process.env.HOST}:${process.env.PORT}/chat`;

const usePostChat = () => {
    const [loadingNewChat, setLoadingNewChat] = useState(false);
    const [newChatError, setNewChatError] = useState(null);
    const postChat = async (api_url, data) => {
        setLoadingNewChat(true);
        const result = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return result.json();
    };
    return {
        loadingNewChat, setLoadingNewChat,
        newChatError, setNewChatError,
        postChat
    };
};

const useFetchNewChat = () => {
    const [loadingFetchNewChat, setLoadingFetchNewChat] = useState(false);
    const [errorFetchNewChat, setErrorFetchNewChat] = useState(null);
    const fetchNewChat = async api_url => {
        setLoadingFetchNewChat(true);
        const result = await fetch(api_url);
        return result.json();
    };
    return {
        loadingFetchNewChat, setLoadingFetchNewChat,
        errorFetchNewChat, setErrorFetchNewChat,
        fetchNewChat
    };
};

const AddChat = () => {
    const currentPath = useParams();
    const history = useHistory();
    const userId = currentPath.userId;
    const { loading, data, error, fetchData } = useGetData();
    const { loadingChats, chatList, chatListError, fetchChats } = useGetChats();
    const { foundUsers, findNewChats } = useFindNewChats(userId);
    const {
        loadingNewChat, setLoadingNewChat,
        newChatError, setNewChatError,
        postChat
    } = usePostChat();
    const {
        loadingFetchNewChat, setLoadingFetchNewChat,
        errorFetchNewChat, setErrorFetchNewChat,
        fetchNewChat
    } = useFetchNewChat();
    useEffect(() => {
        fetchData(api_users);
        fetchChats(`${api_chats}/${userId}`);
    }, []);
    useEffect(() => {
        if (!data || !chatList) return;
        findNewChats(data, chatList);
    }, [data, chatList]);
    const handleAddChat = user => {
        const newChat = { users: [userId, user] };
        postChat(api_chats, newChat)
            .then(() => {
                setLoadingNewChat(false);
                fetchNewChat(`${api_chats}/${userId}`)
                    .then(data => {
                        setLoadingFetchNewChat(false);
                        const foundNewChat = data.body.find(el => el.users.find(u => u._id === user));
                        const newPath = `/${userId}/${foundNewChat._id}`;
                        history.push(newPath);
                    })
                    .catch(error => setErrorFetchNewChat(error));
            })
            .catch(error => setNewChatError(error));
    };
    useEffect(() => {
        return () => {
            setLoadingNewChat(false);
            setNewChatError(null);
        };
    }, []);
    if (loading || loadingChats || loadingFetchNewChat) (<SkeletonLoader />);
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

export default hot(AddChat);