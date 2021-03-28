import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Link } from 'react-router-dom';

// import SkeletonLoader from '../components/SkeletonLoader';

const AddChat = () => {
    // if (loading) (<SkeletonLoader />);
    return (
        <div className="add_chat">
            <h1>Hello, here you can add a new chat</h1>
        </div>
    );
};

export default hot(AddChat);