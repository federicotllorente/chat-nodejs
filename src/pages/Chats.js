import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useGetData from '../hooks/useGetData';

const api = `${process.env.HOST}:${process.env.PORT}/chat`;

const Chats = () => {
    const currentPath = useParams();
    const userId = currentPath.userId;
    const {
        loading,
        data,
        error,
        fetchData
    } = useGetData();
    useEffect(() => {
        fetchData(`${api}/${userId}`);
    }, []);
    console.log(data);
    if (loading) {
        return (
            <h2>Loading...</h2>
        );
    }
    return (
        <div className="chats">
            <h1>Chat App <span>by <a href="https://github.com/federicotllorente" target="_blank" rel="noreferrer">Federico Tejedor Llorente</a></span></h1>
            <h2>Chats</h2>
            <p>Your conversations</p>
            <div className="chats__list">
                {data && data.map(el => (
                    <div key={el._id} className="chats__list__item">
                        <Link to={`/${userId}/${el._id}`}>
                            <h3>{el.users.length > 2 ? (
                                <span>Group with {el.users.map(user => {
                                    if (user._id !== userId) {
                                        return (<span key={user._id}>{user.name}, </span>);
                                    }
                                })}</span>
                            ) : (el.users.map(user => {
                                if (user._id !== userId) {
                                    return (<span key={user._id}>{user.name}</span>);
                                }
                            }))}</h3>
                            <span>Created on {
                                `${el.created.split('T')[0].split('-')[1]}/${el.created.split('T')[0].split('-')[2]}/${el.created.split('T')[0].split('-')[0]} at ${el.created.split('T')[1].split(':')[0]}:${el.created.split('T')[1].split(':')[1]}`
                            }</span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default hot(Chats);