import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect
} from "react-router-dom";
import { Dashboard, Profile} from '../../..';
import {MenuAppBar} from '../';
import {User} from "../../../../store/types";
import {socketInstance} from "../../../../services/socket";
import {UserContainerConnectedProps, userContainerConnector} from "./connector";

const UserContainerComponent: React.FC<UserContainerConnectedProps> = (props: UserContainerConnectedProps) => {
    const [loaded, setLoaded] = useState(!!socketInstance.socket);
    useEffect(() => {
        socketInstance.connect();

        setLoaded(!!socketInstance.socket);

        socketInstance.socket.on('connected', ({parsedUsers}: {parsedUsers: User[]}) => {
            if (parsedUsers.length) {
                props.userFetched(parsedUsers);
            }
        });

        socketInstance.socket.on('user_connected', ({parsedUsers}: {parsedUsers: User[]}) => {
            if (parsedUsers.length) {
                props.userFetched(parsedUsers);
            }
        });

        socketInstance.socket.on('user_disconnected', ({email}: {email: string}) => {
            props.userDisconnected(email);
        });
    }, []);


    return loaded ? (
        <Router>
            <MenuAppBar currentUser={props.user.email} />

            <Switch>
                <Redirect from='/login' to='/' />
                <Redirect from='/register' to='/' />
                <Route
                    path='/'
                    exact
                    component={Dashboard}
                />
                <Route
                    path='/profile'
                    component={Profile}
                />
            </Switch>
        </Router>
    ) : <div>loading</div>;
};

export const UserContainer = userContainerConnector(UserContainerComponent);
