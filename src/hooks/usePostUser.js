import { useState } from 'react';

const usePostUser = () => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const postUser = async (api_url, data) => {
        setLoading(true);
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
        name, setName,
        status, setStatus,
        loading, setLoading,
        error, setError,
        postUser
    };
};

export default usePostUser;