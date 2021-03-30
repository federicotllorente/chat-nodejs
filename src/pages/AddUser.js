import { hot } from 'react-hot-loader/root';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import usePostUser from '../hooks/usePostUser';
import SkeletonLoader from '../components/SkeletonLoader';

const api = `${process.env.HOST}:${process.env.PORT}/user`;

const AddUser = () => {
    const {
        name, setName,
        status, setStatus,
        loading, setLoading,
        error, setError,
        postUser
    } = usePostUser();
    const handleChangeName = e => setName(e.target.value);
    const handleChangeStatus = e => setStatus(e.target.value);
    const handleSubmitNewUser = e => {
        e.preventDefault();
        const userData = { name, status };
        postUser(api, userData)
            .then(data => setLoading(false))
            .catch(error => setError(error));
    };
    useEffect(() => {
        return () => {
            setName('');
            setStatus('');
            setLoading(false);
            setError(null);
        };
    }, []);
    if (loading) (<SkeletonLoader />);
    return (
        <div className="add_user">
            <div className="add_user__title">
                <h1>Chat App</h1>
                <span>by <a href="https://github.com/federicotllorente" target="_blank" rel="noreferrer">Federico Tejedor Llorente</a></span>
            </div>
            <div className="add_user__back_button">
                <h3>👈 <Link to="/">Back to Users</Link></h3>
            </div>
            <div className="add_user__subtitle">
                <h2>Create a new user</h2>
                <p>Start chatting with other users!</p>
                <div className="add_user__subtitle__inputs">
                    <form onSubmit={handleSubmitNewUser}>
                        <input
                            type="text"
                            name="new_user_name"
                            id="new_user_name"
                            onChange={handleChangeName}
                            value={name}
                            required
                            placeholder="Your name"
                        />
                        <input
                            type="text"
                            name="new_user_status"
                            id="new_user_status"
                            onChange={handleChangeStatus}
                            value={status}
                            placeholder="Your status (optional)"
                        />
                        <div className="add_user__subtitle__inputs__buttons">
                            <button id="add">Create user</button>
                            <Link to="/">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default hot(AddUser);