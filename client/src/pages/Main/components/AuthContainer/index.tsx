import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect
} from "react-router-dom";
import {Login, Signup} from '../../../index';


export const AuthContainer: React.FC<{}> = () => {
    return (
        <Router>
            <Switch>
                <Redirect from='/profile' to='/' />
                <Route
                    exact
                    path='/'
                    component={Login}
                />
                <Route
                    path="/login"
                    component={Login}
                />
                <Route
                    path="/register"
                    component={Signup}
                />
            </Switch>
        </Router>
    )
};