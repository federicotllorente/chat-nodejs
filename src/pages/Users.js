import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useGetData from '../hooks/useGetData';

const api = `${process.env.HOST}:${process.env.PORT}/user`;

const Users = () => {
    const {
        loading,
        data,
        error,
        fetchData
    } = useGetData();
    useEffect(() => {
        fetchData(api);
    }, []);
    if (loading) {
        return (
            <h2>Loading...</h2>
        );
    }
    return (
        <div className="users">
            <h1>Chat App <span>by <a href="https://github.com/federicotllorente" target="_blank" rel="noreferrer">Federico Tejedor Llorente</a></span></h1>
            <h2>Users</h2>
            <p>Who are you?</p>
            <div className="users__list">
                {data && data.map(el => (
                    <div key={el._id} className="users__list__item">
                        <Link to={`/${el._id}`}>
                            <h3>{el.name}</h3>
                            <p><span>Status:</span> {el.status}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default hot(Users);