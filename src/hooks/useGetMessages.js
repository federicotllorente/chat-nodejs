import { useState } from 'react';

const useGetMessages = () => {
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [messages, setMessages] = useState(undefined);
    const [messagesError, setMessagesError] = useState(null);
    const fetchMessages = async api_url => {
        setLoadingMessages(true);
        const result = await fetch(api_url);
        const data = await result.json();
        try {
            setLoadingMessages(false);
            setMessages(data.body);
        } catch (error) {
            console.error(error);
            setLoadingMessages(false);
            setMessagesError(error);
        }
    };
    return {
        loadingMessages,
        messages,
        messagesError,
        fetchMessages
    };
};

export default useGetMessages;