import { useState } from 'react';

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

export default usePostChat;