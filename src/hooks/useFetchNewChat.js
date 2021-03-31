import { useState } from 'react';

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

export default useFetchNewChat;