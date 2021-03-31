import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import useGetData from '../hooks/useGetData';
import useGetChats from '../hooks/useGetChats';
import useFindNewChats from '../hooks/useFindNewChats';
import usePostChat from '../hooks/usePostChat';
import useFetchNewChat from '../hooks/useFetchNewChat';
import SkeletonLoader from '../components/SkeletonLoader';
import AddChatViews from './AddChatViews';

const api_users = `${process.env.HOST}:${process.env.PORT}/user`;
const api_chats = `${process.env.HOST}:${process.env.PORT}/chat`;

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
        <AddChatViews userId={userId} foundUsers={foundUsers} handleAddChat={handleAddChat} />
    );
};

export default hot(AddChat);