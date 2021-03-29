import { useState } from 'react';

const useGetChats = () => {
    const [loadingChats, setLoadingChats] = useState(false);
    const [chatList, setChatList] = useState(undefined);
    const [chatListError, setChatListError] = useState(null);
    const fetchChats = async api_url => {
        setLoadingChats(true);
        const result = await fetch(api_url);
        const chatList = await result.json();
        try {
            setLoadingChats(false);
            setChatList(chatList.body);
        } catch (error) {
            console.error(error);
            setLoadingChats(false);
            setChatListError(error);
        }
    };
    return {
        loadingChats,
        chatList,
        chatListError,
        fetchChats
    };
};

export default useGetChats;