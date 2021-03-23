import { hot } from 'react-hot-loader/root';
import React from 'react';
// import getUsers from '../utils/getUsers';

const Users = () => {
    // getUsers();
    return (
        <React.Fragment>
            <h1>Users</h1>
            <p>Who are you?</p>
        </React.Fragment>
    );
};

export default hot(Users);