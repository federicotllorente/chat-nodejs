import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Link } from 'react-router-dom';

// import SkeletonLoader from '../components/SkeletonLoader';

const AddUser = () => {
    // if (loading) (<SkeletonLoader />);
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
                    <input
                        type="text"
                        name="new_user_name"
                        id="new_user_name"
                        required
                        placeholder="Your name"
                    />
                    <input
                        type="text"
                        name="new_user_status"
                        id="new_user_status"
                        placeholder="Your status (optional)"
                    />
                    <div className="add_user__subtitle__inputs__buttons">
                        <button id="add">Create user</button>
                        <button id="cancel">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default hot(AddUser);