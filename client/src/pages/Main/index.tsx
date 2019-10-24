import React, {useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect
} from "react-router-dom";
import {isEmpty} from 'lodash';
import { Dashboard, Profile} from '../';
import {getCookie} from "../../helpers/getCookie";
import {MainConnectedProps, mainConnector} from "./connector";
import {AuthContainer, UserContainer} from './components';


const MainContainer: React.FC<MainConnectedProps> = (props: MainConnectedProps) => {
    useEffect(() => {
        if (getCookie('usertoken', document.cookie))
            props.checkUserRequest();
    }, []);

    return props.loading || isEmpty(props.user) || !getCookie('usertoken', document.cookie) ? (
        <AuthContainer />
    ) : (
        <UserContainer />
    );
};

export const MainContainerConnected = mainConnector(MainContainer);