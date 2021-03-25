import { useState } from 'react';

const useGetData = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(undefined);
    const [error, setError] = useState(null);
    const fetchData = async api_url => {
        setLoading(true);
        const result = await fetch(api_url);
        const data = await result.json();
        try {
            // return data;
            setLoading(false);
            setData(data.body);
        } catch (error) {
            console.error(error);
            // return null;
            setLoading(false);
            setError(error);
        }
    };
    return {
        loading,
        data,
        error,
        fetchData
    };
};

export default useGetData;