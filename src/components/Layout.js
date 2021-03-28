import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Users from '../pages/Users';
import AddUser from '../pages/AddUser';
import Chats from '../pages/Chats';
import AddChat from '../pages/AddChat';
import Chat from '../pages/Chat';
import NotFound from '../pages/NotFound';

const Layout = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Users} />
                <Route exact path="/add-user" component={AddUser} />
                <Route exact path="/add-chat" component={AddChat} />
                <Route exact path="/:userId" component={Chats} />
                <Route exact path="/:userId/:chatId" component={Chat} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default hot(Layout);